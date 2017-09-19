import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

export default class TaskItem extends Component {
    render() {
        let { 
            name,
            onPress
        } = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

TaskItem.propTypes = {
    name: PropTypes.string,
    isComplete: PropTypes.bool,
    onPress: PropTypes.func,
};

TaskItem.defaultProps = {
    name: 'Task Name',
    isComplete: false,
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12, 
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee'
    },
    name: {
        fontWeight: 'bold',
        color: '#555',
        fontSize: 16
    },
    task: {
        color: '#ccc'
    }
});