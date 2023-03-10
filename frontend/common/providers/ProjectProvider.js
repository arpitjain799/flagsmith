import React from 'react';
import ProjectStore from 'common/stores/project-store';
import OrganisationStore from 'common/stores/organisation-store';

const ProjectProvider = class extends React.Component {
    static displayName = 'ProjectProvider'

    constructor(props, context) {
        super(props, context);
        this.state = Object.assign({
            isLoading: !ProjectStore.getEnvs() || ProjectStore.id !== this.props.id,
        }, { project: ProjectStore.model || {} });
        ES6Component(this);
        this.listenTo(ProjectStore, 'saved', () => {
            this.props.onSave && this.props.onSave(ProjectStore.savedEnv);
        });
    }

    componentDidMount() {
        this.listenTo(ProjectStore, 'change', () => {
            this.setState(Object.assign({
                isLoading: ProjectStore.isLoading,
                isSaving: ProjectStore.isSaving,
            }, { project: ProjectStore.model || {} }));
        });
        this.listenTo(ProjectStore, 'removed', () => {
            this.props.onRemoveEnvironment && this.props.onRemoveEnvironment();
        });
        this.listenTo(OrganisationStore, 'removed', () => {
            this.props.onRemove && this.props.onRemove();
        });
    }

    createEnv = (env, projectId, cloneId, description) => {
        AppActions.createEnv(env, projectId, cloneId, description);
    }

    editEnv = (env) => {
        AppActions.editEnv(env);
    }

    deleteEnv = (env) => {
        AppActions.deleteEnv(env);
    }

    editProject = (id, project) => {
        AppActions.editProject(id, project);
    };

    deleteProject = (id) => {
        AppActions.deleteProject(id);
    };

    render() {
        return (
            this.props.children(
                {
                    ...this.state,
                    editProject: this.editProject,
                    createEnv: this.createEnv,
                    editEnv: this.editEnv,
                    deleteEnv: this.deleteEnv,
                    deleteProject: this.deleteProject,
                },
            )
        );
    }
};

ProjectProvider.propTypes = {
    children: OptionalFunc,
    onRemove: RequiredFunc,
    onSave: OptionalFunc,
    id: RequiredString,
    onRemoveEnvironment: RequiredFunc,
};

module.exports = ProjectProvider;
