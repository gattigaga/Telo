import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

import ButtonPlus from './ButtonPlus';

export default class EmptyCaption extends Component {
    render() {
        let {
            children,
            onPress
        } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {children}
                </Text>

                <ButtonPlus 
                    size={64}
                    onPress={onPress} />
            </View>
        );
    }
}

EmptyCaption.propTypes = {
    children: PropTypes.string,
    onPress: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        width: '75%',
        fontSize: 16,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 32
    }
});