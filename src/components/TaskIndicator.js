import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated,
} from 'react-native';
import PropTypes from 'prop-types';

export default class TaskIndicator extends Component {
    constructor(props) {
        super(props);

        this.barWidth = new Animated.Value(0);
    }

    componentDidMount() {
        this.handleBarWidth();
    }

    handleBarWidth() {
        let { completedTasks, totalTasks } = this.props;
        const width = completedTasks / totalTasks * 100;

        Animated.timing(this.barWidth, {
            toValue: width,
            delay: 250,
            duration: 800,
        }).start();
    }

    render() {
        let {
            completedTasks,
            totalTasks,
        } = this.props;

        let width = this.barWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
        });

        let fillBarStyle = { width };

        return (
            <View style={styles.container}>
                <Text style={styles.totalTask}>{completedTasks} / {totalTasks} Tasks</Text>
                <View style={styles.roadBar}>
                    <Animated.View style={[styles.fillBar, fillBarStyle]} />
                </View>
            </View>
        );
    }
}

TaskIndicator.propTypes = {
    completedTasks: PropTypes.number.isRequired,
    totalTasks: PropTypes.number.isRequired, 
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 16,
    },
    totalTask: {
        marginBottom: 8,
        textAlign: 'right',
    },
    roadBar: {
        backgroundColor: '#eee',
        height: 16,
        width: '100%',
        position: 'relative',
        borderRadius: 4,
    },
    fillBar: {
        backgroundColor: '#81bf42',
        height: 16,
        borderRadius: 4,
    }
});