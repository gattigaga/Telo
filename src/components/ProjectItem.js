import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

export default class ProjectItem extends Component {
    render() {
        let { 
            name,
            completedTasks,
            totalTasks,
            onPress
        } = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.task}>{completedTasks} / {totalTasks} Tasks</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

ProjectItem.propTypes = {
    name: PropTypes.string,
    completedTasks: PropTypes.number,
    totalTasks: PropTypes.number,
    onPress: PropTypes.func,
};

ProjectItem.defaultProps = {
    name: 'Project Name',
    completedTasks: 0,
    totalTasks: 0,
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