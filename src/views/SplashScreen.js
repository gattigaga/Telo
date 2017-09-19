import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

import {
    addProjectBatch,
    addTaskBatch,
} from '../config/Actions';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { getProjects } = this.props;

        getProjects(() => {
            this.navigate('ProjectList');
        });
    }

    navigate(view) {
        let { navigate } = this.props.navigation;
        navigate(view);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Telo</Text>
            </View>
        );
    }
}

SplashScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#d12121',
        fontWeight: 'bold',
        fontSize: 64
    }
});

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getProjects: async (callback) => {
            try {
                let projects = await AsyncStorage.getItem('projects');
                let tasks = await AsyncStorage.getItem('tasks');
                
                if (projects !== null){
                    projects = JSON.parse(projects);
                    dispatch(addProjectBatch(projects));
                } else {
                    await AsyncStorage.setItem('projects', JSON.stringify([]));
                }

                if (tasks !== null){
                    tasks = JSON.parse(tasks);
                    dispatch(addTaskBatch(tasks));
                } else {
                    await AsyncStorage.setItem('tasks', JSON.stringify([]));
                }

                callback();
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(SplashScreen);