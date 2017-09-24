import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ProjectItem extends Component {
    constructor(props) {
        super(props);

        this.projectPosition = new Animated.ValueXY();
    }

    componentWillMount() {
        this.initPanResponder();
    }

    initPanResponder() {
        let { onDragRelease } = this.props;

        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this.projectPosition.setValue({ x: 0 });
            },
            onPanResponderMove: Animated.event([
                null, { dx: this.projectPosition.x, dy: 0 },
            ]),
            onPanResponderRelease: (e, gestureState) => {
                const width = Dimensions.get('screen').width;

                Animated.spring(this.projectPosition.x,{ 
                    toValue: 0, 
                    friction: 5
                }).start();

                if (onDragRelease && gestureState.dx > width / 2) {
                    onDragRelease();
                }
            }
        });
    }

    render() {
        let { 
            name,
            completedTasks,
            totalTasks,
            onPress
        } = this.props;

        let translateX = this.projectPosition.x;
        let containerStyle = { transform: [{ translateX }] };

        return (
            <Animated.View 
                {...this.panResponder.panHandlers}
                style={[styles.container, containerStyle]}>
                <TouchableWithoutFeedback onPress={onPress}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.task}>{completedTasks} / {totalTasks} Tasks</Text>
                </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    }
}

ProjectItem.propTypes = {
    name: PropTypes.string,
    completedTasks: PropTypes.number,
    totalTasks: PropTypes.number,
    onPress: PropTypes.func,
    onDragRelease: PropTypes.func,
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