import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Animated,
    Easing,
} from 'react-native';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

export default class TaskItem extends Component {
    constructor(props) {
        super(props);

        this.nameColor = new Animated.Value(1);
    }

    componentDidMount() {
        this.handleOpacity(400);
    }

    componentDidUpdate() {
        this.handleOpacity();
    }

    handleOpacity(delay = 0) {
        let { 
            size,
            isComplete, 
        } = this.props;

        Animated.timing(this.nameColor, {
            delay,
            toValue: isComplete ? 0.2 : 1,
            duration: 250,
            easing: Easing.ease,
        }).start();
    }
    render() {
        let { 
            name,
            onPress,
            onPressCheck,
            isComplete,
        } = this.props;

        let nameStyle = {
            opacity: this.nameColor,
        };

        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <Animated.Text style={[styles.name, nameStyle]}>{name}</Animated.Text>
                    </View>
                    <View style={{ marginLeft: 32 }}>
                        <Checkbox 
                            isChecked={isComplete}
                            onPress={onPressCheck} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

TaskItem.propTypes = {
    name: PropTypes.string,
    isComplete: PropTypes.bool,
    onPress: PropTypes.func,
    onPressCheck: PropTypes.func,
};

TaskItem.defaultProps = {
    name: 'Task Name',
    isComplete: false,
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12, 
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
        flexDirection: 'row'
    },
    name: {
        color: '#555',
        fontSize: 16
    },
    task: {
        color: '#ccc'
    }
});