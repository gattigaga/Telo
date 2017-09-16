import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

export default class ButtonPlus extends Component {
    render() {
        let {
            onPress,
            size
        } = this.props;

        let containerStyle = {
            width: size,
            height: size,
        };

        let textStyle = {
            marginBottom: size / 8,
            fontSize: size * 0.75
        };

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.container, containerStyle]}>
                    <Text style={[styles.text, textStyle]}>
                        +
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

ButtonPlus.propTypes = {
    size: PropTypes.number,
    onPress: PropTypes.func,
};

ButtonPlus.defaultProps = {
    size: 48,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    text: {
        color: '#ccc',
    }
});