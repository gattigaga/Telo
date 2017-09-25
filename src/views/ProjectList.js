import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import Header from '../components/Header';
import ProjectItem from '../components/ProjectItem';
import ModalCreate from '../components/ModalCreate';
import ButtonPlus from '../components/ButtonPlus';

import {
    addProject,
    removeProject,
    removeTaskBatch,
} from '../config/Actions';

class ProjectList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            newProject: '',
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.inputProject = this.inputProject.bind(this);
        this.toTaskList = this.toTaskList.bind(this);
    }

    openModal() {
        this.setState({
            isModalOpen: true
        });
    }

    closeModal() {
        this.setState({
            isModalOpen: false
        });
    }

    inputProject(text) {
        this.setState({
            newProject: text
        });
    }

    toTaskList(projectID) {
        let { navigate } = this.props.navigation;
        navigate('TaskList', { projectID });
    }

    render() {
        let {
            isModalOpen,
            newProject
        } = this.state;

        let {
            projects,
            tasks,
            submit,
            remove,
        } = this.props;

        return (
            <View style={styles.container}>
                <Header title="My Projects" />
                <View style={{ position: 'absolute', top: 24, right: 24 }}>
                    <ButtonPlus 
                        size={32}
                        onPress={this.openModal} />
                </View>

                {projects.length > 0 ? (
                    <ScrollView 
                        style={{ flex: 1, marginTop: 32 }}
                        showsVerticalScrollIndicator={false}>
                        {projects.map((project) => {
                            const completedTasks = tasks.filter((task) => {
                                return task.projectID == project.id && task.isComplete;
                            }).length;

                            const totalTasks = tasks.filter((task) => {
                                return task.projectID == project.id;
                            }).length;

                            return (
                                <ProjectItem
                                    key={project.id}
                                    name={project.name}
                                    completedTasks={completedTasks}
                                    totalTasks={totalTasks}
                                    onPress={() => this.toTaskList(project.id)}
                                    onDragRelease={() => remove(project.id)} />
                            );
                        })}
                    </ScrollView>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.empty}>
                            No projects found, let's create one.
                        </Text>
                    </View>
                )}

                <ModalCreate
                    isOpen={isModalOpen}
                    onPressCancel={this.closeModal}
                    onPressOK={() => submit(newProject, () => {
                        this.closeModal();
                        this.setState({ newProject: '' });
                    })}
                    onChangeText={this.inputProject}
                    value={newProject}
                    title="New Project"
                    maxChar={24} />
            </View>
        );
    }
}

ProjectList.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        position: 'relative'
    },
    buttonPlus: {
        position: 'absolute',
        top: 32,
        right: 32,
    },
    empty: {
        width: '75%',
        fontSize: 16,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 32
    }
});

function mapStateToProps(state) {
    return {
        projects: state.projects,
        tasks: state.tasks,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        submit: (id, name) => {
            dispatch(addProject(id, name));
        },
        remove: (projectID) => {
            dispatch(removeProject(projectID));
            dispatch(removeTaskBatch(projectID));
        },
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        ...ownProps,
        ...stateProps,
        submit: async (name, callback) => {
            const lastProject = _.maxBy(stateProps.projects, 'id');
            const id = lastProject ? lastProject.id + 1 : 1;

            try {
                const project = { id, name };
                const projects = JSON.stringify([...stateProps.projects, project]);
                await AsyncStorage.setItem('projects', projects);

                dispatchProps.submit(id, name);
                callback();
            } catch (error) {
                console.error(error);
            }
        },
        remove: async (projectID) => {
            try {
                const projects = JSON.stringify(stateProps.projects.filter((project) => {
                    return project.id != projectID;
                }));

                const tasks = JSON.stringify(stateProps.tasks.filter((task) => {
                    return task.projectID != projectID;
                }));

                await AsyncStorage.setItem('projects', projects);
                await AsyncStorage.setItem('tasks', tasks);

                dispatchProps.remove(projectID);
            } catch (error) {
                console.error(error);
            }
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(ProjectList);