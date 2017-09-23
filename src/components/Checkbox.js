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
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.checkedSize = new Animated.Value(0);
    }

    componentDidMount() {
        this.handleCheck(400);
    }

    componentDidUpdate() {
        this.handleCheck();
    }
    
    handleCheck(delay = 0) {
        let { 
            size,
            isChecked, 
        } = this.props;

        Animated.timing(this.checkedSize, {
            delay,
            toValue: isChecked ? size : 0,
            duration: 250,
            easing: Easing.ease,
        }).start();
    }

    render() {
        let {
            size,
            style,
            onPress,
        } = this.props;

        let containerStyle = {
            width: size,
            height: size,
        };

        let checkedStyle = {
            width: this.checkedSize,
            height: this.checkedSize,
            top: size / 2 - this.checkedSize / 2,
            left: size / 2 - this.checkedSize / 2,
        };

        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[styles.container, containerStyle]}>
                    <Animated.View style={[styles.checked, checkedStyle]} />
                    <Icon 
                        size={size - 14} 
                        name="check" 
                        color="white" />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

Checkbox.propTypes = {
    size: PropTypes.number,
    isChecked: PropTypes.bool,
    onPress: PropTypes.func,
};

Checkbox.defaultProps = {
    size: 32,
    isChecked: false,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#eee',
        position: 'relative',
    },
    checked: {
        borderRadius: 100,
        backgroundColor: '#81bf42',
        position: 'absolute',
    }
});