import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

import Header from '../components/Header';

export default class ProjectList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title="My Projects" />
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
        padding: 16
    },
});