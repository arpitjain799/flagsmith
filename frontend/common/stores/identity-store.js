import Constants from 'common/constants';
const Dispatcher = require('../dispatcher/dispatcher');
const BaseStore = require('./base/_store');
const data = require('../data/base/_data');


const controller = {

    getIdentity: (envId, id) => {
        store.loading();
        return data.get(`${Project.api}environments/${envId}/${Utils.getIdentitiesEndpoint()}/${id}/`)
            .then(identity => Promise.all([
                data.get(Utils.getTraitEndpoint(envId, id)),
                Promise.resolve(identity),
                data.get(`${Project.api}environments/${envId}/${Utils.getIdentitiesEndpoint()}/${id}/${Utils.getFeatureStatesEndpoint()}/`),
            ]))
            .then(([res, identity, flags]) => {
                const features = (flags && flags.results) || flags;
                const traits = Utils.getIsEdge() ? res : res && res.results && res.results.map(v => ({
                    id: v.id,
                    trait_value: Utils.featureStateToValue(v),
                    trait_key: v.trait_key,
                }));
                store.model = store.model || {};
                store.model.features = features && _.keyBy(features, f => f.feature);
                store.model.traits = traits;
                store.model.identity = identity;
                store.loaded();
            })
            .catch(e => API.ajaxHandler(store, e));
    },
    toggleUserFlag({ identity, projectFlag, environmentFlag, identityFlag, environmentId }) {
        store.saving();
        API.trackEvent(Constants.events.TOGGLE_USER_FEATURE);
        const prom = identityFlag.identity || identityFlag.identity_uuid
            ? data.put(`${Project.api}environments/${environmentId}/${Utils.getIdentitiesEndpoint()}/${identity}/${Utils.getFeatureStatesEndpoint()}/${identityFlag.id || identityFlag.featurestate_uuid}/`, Object.assign({}, {
                id: identityFlag.id || identityFlag.featurestate_uuid,
                enabled: !identityFlag.enabled,
                feature: projectFlag.id,
                feature_state_value: identityFlag ? identityFlag.feature_state_value : environmentFlag && environmentFlag.feature_state_value,
            }))
            : data.post(`${Project.api}environments/${environmentId}/${Utils.getIdentitiesEndpoint()}/${identity}/${Utils.getFeatureStatesEndpoint()}/`, {
                feature: projectFlag.id,
                enabled: !environmentFlag || !environmentFlag.enabled,
                feature_state_value: environmentFlag ? environmentFlag.feature_state_value : undefined,
            });

        prom.then((res) => {
            store.model.features[res.feature] = res;
            store.saved();
        });
    },
    changeUserFlag({ identity, identityFlag, environmentId, payload, onSuccess }) {
        store.saving();
        API.trackEvent(Constants.events.TOGGLE_USER_FEATURE);

        const prom = data.put(`${Project.api}environments/${environmentId}/${Utils.getIdentitiesEndpoint()}/${identity}/${Utils.getFeatureStatesEndpoint()}/${identityFlag}/`, Object.assign({}, payload));
        prom.then(() => {
            if (onSuccess) onSuccess();
            store.saved();
        });
    },
    editTrait({ identity, environmentId, trait }) {
        const { trait_key, trait_value, id } = trait;
        store.saving();
        data[Utils.getTraitEndpointMethod(id)](Utils.getUpdateTraitEndpoint(environmentId, identity, id),
            {
                identity: Utils.getShouldSendIdentityToTraits() ? { identifier: store.model && store.model.identity.identifier } : undefined,
                trait_key,
                ...(Utils.getIsEdge() ? { trait_value } : Utils.valueToTrait(trait_value)),
            })
            .then(() => controller.getIdentity(environmentId, identity)
                .then(() => store.saved()))
            .catch(e => API.ajaxHandler(store, e));
    },
    editUserFlag({ identity, projectFlag, identityFlag, environmentId }) {
        store.saving();
        API.trackEvent(Constants.events.EDIT_USER_FEATURE);
        const prom = identityFlag.identity || identityFlag.identity_uuid
            ? data.put(`${Project.api}environments/${environmentId}/${Utils.getIdentitiesEndpoint()}/${identity}/${Utils.getFeatureStatesEndpoint()}/${identityFlag.id || identityFlag.featurestate_uuid}/`, Object.assign({}, {
                id: identityFlag.id || identityFlag.featurestate_uuid,
                enabled: identityFlag.enabled,
                feature: projectFlag.id,
                multivariate_feature_state_values: identityFlag.multivariate_options,
                feature_state_value: identityFlag.feature_state_value,
            }))
            : data.post(`${Project.api}environments/${environmentId}/${Utils.getIdentitiesEndpoint()}/${identity}/${Utils.getFeatureStatesEndpoint()}/`, {
                feature: projectFlag.id,
                enabled: identityFlag.enabled,
                multivariate_feature_state_values: identityFlag.multivariate_options,
                feature_state_value: identityFlag.feature_state_value,
            });

        prom.then(() => controller.getIdentity(environmentId, identity)
            .then(() => store.saved()));
    },
    removeUserFlag(identity, identityFlag, environmentId) {
        store.saving();
        API.trackEvent(Constants.events.REMOVE_USER_FEATURE);
        data.delete(`${Project.api}environments/${environmentId}/${Utils.getIdentitiesEndpoint()}/${identity}/${Utils.getFeatureStatesEndpoint()}/${identityFlag.id || identityFlag.featurestate_uuid}/`)
            .then(() => controller.getIdentity(environmentId, identity)
                .then(() => store.saved()));
    },
    deleteIdentityTrait(envId, identity, id) {
        store.saving();
        if (Utils.getShouldUpdateTraitOnDelete()) {
            controller.editTrait({
                identity,
                environmentId: envId,
                trait: {
                    trait_key: id,
                    trait_value: null,
                },
            });
            return;
        }
        data.delete(`${Project.api}environments/${envId}/${Utils.getIdentitiesEndpoint()}/${identity}/traits/${id}/`)
            .then(() => {
                const index = _.findIndex(store.model.traits, trait => trait.id === id);
                if (index !== -1) {
                    store.model.traits.splice(index, 1);
                }
                store.saved();
            })
            .catch(e => API.ajaxHandler(store, e));
    },
};


const store = Object.assign({}, BaseStore, {
    id: 'identity',
    getIdentityForEditing() {
        return store.model && _.cloneDeep(store.model); // immutable
    },
    getIdentityFlags() {
        return store.model && store.model.features;
    },
    getTraits() {
        return store.model && store.model.traits;
    },
});


store.dispatcherIndex = Dispatcher.register(store, (payload) => {
    const action = payload.action; // this is our action from handleViewAction
    const {
        identity, projectFlag, environmentFlag, identityFlag, environmentId, trait,
    } = action;
    switch (action.actionType) {
        case Actions.GET_IDENTITY:
            controller.getIdentity(action.envId, action.id);
            break;
        case Actions.TOGGLE_USER_FLAG:
            controller.toggleUserFlag({ identity, projectFlag, environmentFlag, identityFlag, environmentId });
            break;
        case Actions.EDIT_USER_FLAG:
            controller.editUserFlag({ identity, projectFlag, environmentFlag, identityFlag, environmentId });
            break;
        case Actions.EDIT_TRAIT:
            controller.editTrait({ identity, environmentId, trait });
            break;
        case Actions.REMOVE_USER_FLAG:
            controller.removeUserFlag(identity, identityFlag, environmentId);
            break;
        case Actions.DELETE_IDENTITY_TRAIT:
            controller.deleteIdentityTrait(action.envId, action.identity, action.id);
            break;
        case Actions.CHANGE_USER_FLAG:
            controller.changeUserFlag(action.identity);
            break;
        default:
    }
});
controller.store = store;
module.exports = controller.store;
