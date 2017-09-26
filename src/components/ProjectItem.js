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

        this.projectOpacity = new Animated.Value(1);
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

                Animated.timing(this.projectOpacity,{ 
                    toValue: 0.3,
                    duration: 250,
                }).start();
            },
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dx < 0) return;
                this.projectPosition.setValue({ x: gestureState.dx });
            },
            onPanResponderRelease: (e, gestureState) => {
                const width = Dimensions.get('screen').width;

                Animated.parallel([
                    Animated.spring(this.projectPosition.x,{ 
                        toValue: 0, 
                        friction: 6,
                        tension: 0.5,
                    }),
                    Animated.timing(this.projectOpacity,{ 
                        toValue: 1,
                        duration: 250,
                    }),
                ]).start();

                if (onDragRelease && gestureState.dx > width * 0.6) {
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

        let containerStyle = { 
            transform: [{ translateX }],
            opacity: this.projectOpacity,
        };

        return (
            <Animated.View 
                {...this.panResponder.panHandlers}
                style={[styles.container, containerStyle]}>
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.task}>{completedTasks} / {totalTasks} Tasks</Text>
                        </View>
                        <View style={styles.caption}>
                            {(completedTasks == totalTasks && totalTasks > 0) &&
                                <Animated.Text style={styles.complete}>
                                    COMPLETED
                                </Animated.Text>
                            }
                        </View>
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
    },
    caption: {
        marginLeft: 32, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    complete: {
        color: 'white',
        backgroundColor: '#81bf42',
        width: 72,
        paddingVertical: 4,
        textAlign: 'center',
        fontSize: 9,
        borderRadius: 4,
    }
});