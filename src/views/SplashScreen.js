import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.navigate('ProjectList');
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