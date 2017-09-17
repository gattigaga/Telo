import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

import {
    addProjectBatch
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
                
                if (projects !== null){
                    dispatch(addProjectBatch(projects));
                } else {
                    await AsyncStorage.setItem('projects', []);
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