import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

export default class ProjectList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
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
        backgroundColor: 'white'
    }
});