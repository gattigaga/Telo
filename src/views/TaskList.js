import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

export default class TaskList extends Component {
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

TaskList.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});