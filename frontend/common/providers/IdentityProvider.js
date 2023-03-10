import React from 'react';
import FeatureListStore from 'common/stores/feature-list-store';
import IdentityStore from 'common/stores/identity-store';

const IdentityProvider = class extends React.Component {
    static displayName = 'IdentityProvider'

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            identity: IdentityStore.model,
            environmentFlags: FeatureListStore.getEnvironmentFlags(),
            projectFlags: FeatureListStore.getProjectFlags(),
            identityFlags: IdentityStore.getIdentityFlags(),
        };
        ES6Component(this);
    }

    componentDidMount() {
        this.listenTo(IdentityStore, 'change', () => {
            this.setState({
                isSaving: IdentityStore.isSaving,
                isLoading: IdentityStore.isLoading || FeatureListStore.isLoading,
                identity: IdentityStore.model,
                identityFlags: IdentityStore.getIdentityFlags(),
                traits: IdentityStore.getTraits(),
            });
        });
        this.listenTo(FeatureListStore, 'change', () => {
            this.setState({
                isLoading: IdentityStore.isLoading || FeatureListStore.isLoading,
                environmentFlags: FeatureListStore.getEnvironmentFlags(),
                projectFlags: FeatureListStore.getProjectFlags(),
            });
        });

        this.listenTo(IdentityStore, 'saved', () => {
            this.props.onSave && this.props.onSave();
        });
    }

    toggleFlag = ({ identity, projectFlag, environmentFlag, identityFlag, environmentId }) => {
        AppActions.toggleUserFlag({ identity, projectFlag, environmentFlag, identityFlag, environmentId });
    };

    editFeatureValue = ({ identity, projectFlag, environmentFlag, identityFlag, environmentId }) => {
        AppActions.editUserFlag({ identity, projectFlag, environmentFlag, identityFlag, environmentId });
    };

    editTrait = ({ trait, identity, environmentId }) => {
        AppActions.editTrait({ trait, identity, environmentId });
    };

    createTrait = ({ trait, identity, environmentId, isCreate }) => {
        AppActions.editTrait({ trait, identity, environmentId, isCreate });
    };

    removeFlag = ({ environmentId, identity, identityFlag }) => {
        AppActions.removeUserFlag({ environmentId, identity, identityFlag });
    };

    changeUserFlag = ({ identity, identityFlag, environmentId, payload }) => {
        AppActions.changeUserFlag({ identity, identityFlag, environmentId, payload });
    };

    render() {
        const { toggleFlag, editFeatureValue, removeFlag, editTrait, changeUserFlag, createTrait } = this;
        return (
            this.props.children({ ...this.state }, { toggleFlag, editFeatureValue, createTrait, removeFlag, editTrait, changeUserFlag })
        );
    }
};

IdentityProvider.propTypes = {
    onSave: OptionalFunc,
    children: OptionalFunc,
};

module.exports = IdentityProvider;
