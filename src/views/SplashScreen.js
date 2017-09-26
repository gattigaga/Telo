import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    AsyncStorage,
    Image,
    Animated,
    StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import {
    addProjectBatch,
    addTaskBatch,
} from '../config/Actions';

class SplashScreen extends Component {
    constructor(props) {
        super(props);

        this.itemOpacity = new Animated.Value(0);
        this.toProjectList = this.toProjectList.bind(this);
    }

    componentDidMount() {
        let { getProjects, navigation } = this.props;

        StatusBar.setHidden(true);

        getProjects(() => {
            this.handleLogo(this.toProjectList);
        });
    }

    handleLogo(callback) {
        Animated.timing(this.itemOpacity, {
            toValue: 1,
            duration: 800,
        }).start(() => {
            setTimeout(() => {
                Animated.timing(this.itemOpacity, {
                    toValue: 0,
                    duration: 800,
                }).start(callback);
            }, 1000);
        });
    }

    toProjectList() {
        let { navigation } = this.props;        

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'ProjectList' })
            ]
        });

        navigation.dispatch(resetAction);
    }

    render() {
        let itemStyle = { opacity: this.itemOpacity };

        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <Animated.Image
                    source={require('../../res/logo.png')}
                    style={[styles.logo, itemStyle]} />
                <Animated.Text style={[styles.text, itemStyle]}>
                    telo
                </Animated.Text>
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
        color: '#6e311e',
        fontWeight: 'bold',
        fontSize: 48,
        marginTop: -16,
    },
    logo: {
        width: 192, 
        height: 192,
        resizeMode: 'contain',
    }
});

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getProjects: async (callback) => {
            try {
                let projects = await AsyncStorage.getItem('projects');
                let tasks = await AsyncStorage.getItem('tasks');

                if (projects !== null) {
                    projects = JSON.parse(projects);
                    dispatch(addProjectBatch(projects));
                } else {
                    await AsyncStorage.setItem('projects', JSON.stringify([]));
                }

                if (tasks !== null) {
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