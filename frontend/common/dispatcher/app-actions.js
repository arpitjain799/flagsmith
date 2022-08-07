const AppActions = Object.assign({}, require('./base/_app-actions'), {
    getOrganisation(organisationId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_ORGANISATION,
            id: organisationId,
        });
    },
    oauthLogin(oauthType, data) {
        Dispatcher.handleViewAction({
            actionType: Actions.OAUTH,
            oauthType,
            data,
        });
    },
    refreshFeatures(projectId, environmentId) {
        Dispatcher.handleViewAction({
            actionType: Actions.REFRESH_FEATURES,
            projectId,
            environmentId,
        });
    },
    getFeatures(projectId, environmentId, force, search, sort, page, filter) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_FLAGS,
            projectId,
            environmentId,
            force,
            search,
            sort,
            page,
            filter,
        });
    },
    searchFeatures(projectId, environmentId, force, search, sort, page, filter) {
        Dispatcher.handleViewAction({
            actionType: Actions.SEARCH_FLAGS,
            projectId,
            environmentId,
            force,
            search,
            sort,
            page,
            filter,
        });
    },
    createProject(name) {
        Dispatcher.handleViewAction({
            actionType: Actions.CREATE_PROJECT,
            name,
        });
    },

    getGroupsPage(orgId, page) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_GROUPS_PAGE,
            orgId,
            page,
        });
    },

    getTags(projectId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_TAGS,
            projectId,
        });
    },

    updateTag(projectId, data, onComplete) {
        Dispatcher.handleViewAction({
            actionType: Actions.UPDATE_TAG,
            projectId,
            data,
            onComplete,
        });
    },

    createTag(projectId, data, onComplete) {
        Dispatcher.handleViewAction({
            actionType: Actions.CREATE_TAG,
            projectId,
            data,
            onComplete,
        });
    },

    migrateProject(projectId) {
        Dispatcher.handleViewAction({
            actionType: Actions.MIGRATE_PROJECT,
            projectId
        });
    },

    deleteTag(projectId, data, onComplete) {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_TAG,
            projectId,
            data,
            onComplete,
        });
    },

    getGroups(orgId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_GROUPS,
            orgId,
        });
    },
    createGroup(orgId, data) {
        Dispatcher.handleViewAction({
            actionType: Actions.CREATE_GROUP,
            data,
            orgId,
        });
    },
    deleteGroup(orgId, data) {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_GROUP,
            data,
            orgId,
        });
    },
    updateGroup(orgId, data) {
        Dispatcher.handleViewAction({
            actionType: Actions.UPDATE_GROUP,
            data,
            orgId,
        });
    },
    getPermissions(id, level) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_PERMISSIONS,
            id,
            level,
        });
    },
    getAvailablePermissions() {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_AVAILABLE_PERMISSIONS,
        });
    },
    getProject(projectId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_PROJECT,
            projectId,
        });
    },
    getConfig(projectId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_CONFIG,
            projectId,
        });
    },
    resetPassword(data) {
        Dispatcher.handleViewAction({
            actionType: Actions.RESET_PASSWORD,
            ...data,
        });
    },
    createEnv(name, projectId, cloneId) {
        Dispatcher.handleViewAction({
            actionType: Actions.CREATE_ENV,
            name,
            projectId,
            cloneId,
        });
    },
    editEnv(env) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_ENVIRONMENT,
            env,
        });
    },
    deleteEnv(env) {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_ENVIRONMENT,
            env,
        });
    },
    refreshOrganisation() {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_ORGANISATION,
            force: true,
        });
    },
    getFlagInfluxData(projectId, environmentId, flag, period) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_FLAG_INFLUX_DATA,
            projectId,
            environmentId,
            flag,
            period,
        });
    },
    createFlag(projectId, environmentId, flag, segmentOverrides) {
        Dispatcher.handleViewAction({
            actionType: Actions.CREATE_FLAG,
            projectId,
            environmentId,
            flag,
            segmentOverrides,
        });
    },
    editEnvironmentFlag(projectId, environmentId, flag, projectFlag, environmentFlag, segmentOverrides, mode,onComplete) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_ENVIRONMENT_FLAG,
            projectId,
            environmentId,
            flag,
            projectFlag,
            environmentFlag,
            segmentOverrides,
            mode,
            onComplete
        });
    },
    editEnvironmentFlagChangeRequest(projectId, environmentId, flag, projectFlag, environmentFlag, segmentOverrides, changeRequest, commit) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_ENVIRONMENT_FLAG_CHANGE_REQUEST,
            projectId,
            environmentId,
            flag,
            projectFlag,
            environmentFlag,
            changeRequest,
            segmentOverrides,
            commit,
        });
    },

    editFlag(projectId, flag, onComplete) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_FLAG,
            projectId,
            flag,
            onComplete,
        });
    },
    editProject(id, project) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_PROJECT,
            id,
            project,
        });
    },
    removeUserFlag({ environmentId, identity, identityFlag }) {
        Dispatcher.handleViewAction({
            actionType: Actions.REMOVE_USER_FLAG,
            environmentId,
            identity,
            identityFlag,
        });
    },
    acceptInvite(id) {
        Dispatcher.handleViewAction({
            actionType: Actions.ACCEPT_INVITE,
            id,
        });
    },
    deleteProject(id) {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_PROJECT,
            id,
        });
    },
    saveEnv(name) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_ENVIRONMENT,
            name,
        });
    },
    toggleFlag(index, environments, comment, environmentFlags, projectFlags) {
        Dispatcher.handleViewAction({
            actionType: Actions.TOGGLE_FLAG,
            index,
            environments,
            comment,
            environmentFlags,
            projectFlags,
        });
    },
    editUserFlag(params) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_USER_FLAG,
            ...params,
        });
    },
    editTrait(params) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_TRAIT,
            ...params,
        });
    },
    toggleUserFlag(params) {
        Dispatcher.handleViewAction({
            actionType: Actions.TOGGLE_USER_FLAG,
            ...params,
        });
    },
    changeUserFlag(identity) {
        Dispatcher.handleViewAction({
            actionType: Actions.CHANGE_USER_FLAG,
            identity,
        });
    },
    selectOrganisation(id) {
        Dispatcher.handleViewAction({
            actionType: Actions.SELECT_ORGANISATION,
            id,
        });
    },
    enableTwoFactor() {
        Dispatcher.handleViewAction({
            actionType: Actions.ENABLE_TWO_FACTOR,
        });
    },
    disableTwoFactor() {
        Dispatcher.handleViewAction({
            actionType: Actions.DISABLE_TWO_FACTOR,
        });
    },
    confirmTwoFactor(pin, onError) {
        Dispatcher.handleViewAction({
            actionType: Actions.CONFIRM_TWO_FACTOR,
            pin,
            onError,
        });
    },
    twoFactorLogin(pin, onError) {
        Dispatcher.handleViewAction({
            actionType: Actions.TWO_FACTOR_LOGIN,
            pin,
            onError,
        });
    },
    getIdentities(envId, pageSize) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_IDENTITIES,
            envId,
            pageSize,
        });
    },
    getIdentitiesPage(envId, page,pageType) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_IDENTITIES_PAGE,
            envId,
            page,
            pageType
        });
    },
    getIdentity(envId, id) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_IDENTITY,
            envId,
            id,
        });
    },
    getIdentitySegments(projectId, id) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_IDENTITY_SEGMENTS,
            projectId,
            id,
        });
    },
    getIdentitySegmentsPage(page) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_IDENTITY_SEGMENTS_PAGE,
            page,
        });
    },
    saveIdentity(id, identity) {
        Dispatcher.handleViewAction({
            actionType: Actions.SAVE_IDENTITY,
            id,
            identity,
        });
    },
    createOrganisation(name) {
        Dispatcher.handleViewAction({
            actionType: Actions.CREATE_ORGANISATION,
            name,
        });
    },
    editOrganisation(org) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_ORGANISATION,
            org,
        });
    },
    removeFlag(projectId, flag) {
        Dispatcher.handleViewAction({
            actionType: Actions.REMOVE_FLAG,
            projectId,
            flag,
        });
    },
    deleteOrganisation() {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_ORGANISATION,
        });
    },
    // Invites todo: organise actions
    inviteUsers(invites) {
        Dispatcher.handleViewAction({
            actionType: Actions.INVITE_USERS,
            invites,
        });
    },
    deleteInvite(id) {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_INVITE,
            id,
        });
    },
    deleteUser(id) {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_USER,
            id,
        });
    },
    resendInvite(id) {
        Dispatcher.handleViewAction({
            actionType: Actions.RESEND_INVITE,
            id,
        });
    },
    // Segments
    selectEnvironment(data) {
        Dispatcher.handleViewAction({
            actionType: Actions.SELECT_ENVIRONMENT,
            data,
        });
    },
    getSegments(projectId, environmentId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_SEGMENTS,
            projectId,
            environmentId,
        });
    },
    createSegment(projectId, segment) {
        Dispatcher.handleViewAction({
            actionType: Actions.CREATE_SEGMENT,
            projectId,
            data: segment,
        });
    },
    editSegment(projectId, segment) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_SEGMENT,
            projectId,
            data: segment,
        });
    },
    removeSegment(projectId, id) {
        Dispatcher.handleViewAction({
            actionType: Actions.REMOVE_SEGMENT,
            projectId,
            id,
        });
    },
    searchIdentities(envId, search, pageSize) {
        Dispatcher.handleViewAction({
            actionType: Actions.SEARCH_IDENTITIES,
            envId,
            search,
            pageSize,
        });
    },
    getAuditLog(projectId, search, environmentId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_AUDIT_LOG,
            projectId,
            environmentId,
            search,
        });
    },
    getAuditLogPage(projectId, page, environmentId) {
        Dispatcher.handleViewAction({
            projectId,
            actionType: Actions.GET_AUDIT_LOG_PAGE,
            page,
            environmentId,
        });
    },
    searchAuditLog(search, projectId, environmentId) {
        Dispatcher.handleViewAction({
            actionType: Actions.SEARCH_AUDIT_LOG,
            projectId,
            search,
            environmentId,
        });
    },
    deleteIdentity(envId, id) {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_IDENTITY,
            envId,
            id,
        });
    },
    deleteIdentityTrait(envId, identity, id) {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_IDENTITY_TRAIT,
            envId,
            identity,
            id,
        });
    },
    updateUserRole(id, role) {
        Dispatcher.handleViewAction({
            actionType: Actions.UPDATE_USER_ROLE,
            id,
            role,
        });
    },
    updateSubscription(hostedPageId) {
        Dispatcher.handleViewAction({
            actionType: Actions.UPDATE_SUBSCRIPTION,
            hostedPageId,
        });
    },
    getInfluxData(organisationId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_INFLUX_DATA,
            id: organisationId,
        });
    },
    getChangeRequests(environment, data, page) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_CHANGE_REQUESTS,
            environment,
            committed: data.committed,
            live_from_after: data.live_from_after,
            page,
        });
    },
    getChangeRequest(id, projectId, environmentId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_CHANGE_REQUEST,
            id,
            projectId,
            environmentId,
        });
    },
    updateChangeRequest(changeRequest) {
        Dispatcher.handleViewAction({
            actionType: Actions.UPDATE_CHANGE_REQUEST,
            changeRequest,
        });
    },

    deleteChangeRequest(id, cb) {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_CHANGE_REQUEST,
            id,
            cb,
        });
    },
    actionChangeRequest(id, action, cb) {
        Dispatcher.handleViewAction({
            actionType: Actions.ACTION_CHANGE_REQUEST,
            id,
            action,
            cb,
        });
    },
});

module.exports = AppActions;
window.AppActions = AppActions;
