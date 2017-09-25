import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    AsyncStorage,
    Animated,
    StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import Header from '../components/Header';
import TaskItem from '../components/TaskItem';
import ModalCreate from '../components/ModalCreate';
import ButtonPlus from '../components/ButtonPlus';
import TaskIndicator from '../components/TaskIndicator';

import {
    addTask,
    toggleTask,
    removeTask,
} from '../config/Actions';

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            newTask: '',
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.inputTask = this.inputTask.bind(this);
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

    inputTask(text) {
        this.setState({
            newTask: text
        });
    }

    render() {
        let {
            isModalOpen,
            newTask
        } = this.state;

        let {
            tasks,
            project,
            submit,
            check,
            remove,
        } = this.props;

        let completedTasks = tasks.filter(task => task.isComplete).length;

        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Header title={project.name} />
                <View style={{ position: 'absolute', top: 24, right: 24 }}>
                    <ButtonPlus
                        size={32}
                        onPress={this.openModal} />
                </View>

                <TaskIndicator 
                    completedTasks={completedTasks}
                    totalTasks={tasks.length} />

                {tasks.length > 0 ? (
                    <ScrollView 
                        style={{ flex: 1, marginTop: 32 }}
                        showsVerticalScrollIndicator={false}>
                        {tasks.map((task) => {
                            return (
                                <TaskItem
                                    key={task.id}
                                    name={task.name}
                                    isComplete={task.isComplete}
                                    onPress={() => check(task)}
                                    onDragRelease={() => remove(task)} />
                            );
                        })}
                    </ScrollView>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.empty}>
                            No tasks found, let's create one.
                        </Text>
                    </View>
                )}

                <ModalCreate
                    isOpen={isModalOpen}
                    onPressCancel={this.closeModal}
                    onPressOK={() => submit(newTask, () => {
                        this.closeModal();
                        this.setState({ newTask: '' });
                    })}
                    onChangeText={this.inputTask}
                    value={newTask}
                    title="New Task" />
            </View>
        );
    }
}

TaskList.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 16,
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
    },
});

function mapStateToProps(state) {
    return {
        projects: state.projects,
        tasks: state.tasks,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        submit: (id, name, projectID) => {
            dispatch(addTask(id, name, projectID));
        },
        check: (task) => {
            dispatch(toggleTask(task.id, task.projectID));
        },
        remove: (task) => {
            dispatch(removeTask(task.id, task.projectID));
        },
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const { state } = ownProps.navigation;
    const projectID = state.params.projectID;
    const filteredTasks = stateProps.tasks.filter((task) => task.projectID == projectID);

    return {
        ...ownProps,
        tasks: filteredTasks,
        project: _.find(stateProps.projects, { id: projectID }),
        submit: async (name, callback) => {
            const lastTask = _.maxBy(filteredTasks, 'id');
            const id = lastTask ? lastTask.id + 1 : 1;

            try {
                const task = { id, name, projectID, isComplete: false };
                const tasks = JSON.stringify([...stateProps.tasks, task]);
                await AsyncStorage.setItem('tasks', tasks);

                dispatchProps.submit(id, name, projectID);
                callback();
            } catch (error) {
                console.error(error);
            }
        },
        check: async (task) => {
            try {
                const tasks = JSON.stringify(stateProps.tasks.map((stateTask) => {
                    const isIDValid = task.id == stateTask.id;
                    const isProjectIDValid = task.projectID == stateTask.projectID;

                    if (isIDValid && isProjectIDValid) {
                        return {
                            ...stateTask,
                            isComplete: !stateTask.isComplete
                        };
                    }

                    return stateTask;
                }));

                await AsyncStorage.setItem('tasks', tasks);

                dispatchProps.check(task);
            } catch (error) {
                console.error(error);
            }
        },
        remove: async (task) => {
            try {
                const tasks = JSON.stringify(stateProps.tasks.filter((stateTask) => {
                    const isIDValid = task.id == stateTask.id;
                    const isProjectIDValid = task.projectID == stateTask.projectID;

                    return !(isIDValid && isProjectIDValid);
                }));

                await AsyncStorage.setItem('tasks', tasks);
                dispatchProps.remove(task);
            } catch (error) {
                console.error(error);
            }
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(TaskList);