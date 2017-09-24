import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    TextInput,
    TouchableNativeFeedback
} from 'react-native';
import PropTypes from 'prop-types';

export default class ModalCreate extends Component {
    render() {
        let { 
            isOpen,
            value,
            title,
            maxChar,
            onPressOK,
            onPressCancel,
            onChangeText
        } = this.props;

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isOpen}
                onRequestClose={onPressCancel}>
                <TouchableNativeFeedback onPress={onPressCancel}>
                    <View style={styles.container}>
                        <View style={styles.modal}>
                            <View style={{ padding: 32 }}>
                                <Text style={styles.title}>
                                    {title}
                                </Text>
                                <TextInput 
                                    onChangeText={onChangeText}
                                    value={value}
                                    autoCapitalize="words"
                                    style={styles.input} 
                                    underlineColorAndroid="#eee"
                                    selectionColor="#eee"
                                    autoCorrect={false}
                                    maxLength={maxChar} />
                            </View>
                            <View style={styles.buttonBottom}>
                                <TouchableNativeFeedback onPress={onPressOK}>
                                    <View style={[styles.button, { borderRightWidth: 1, borderRightColor: '#eee' }]}>
                                        <Text style={styles.buttonText}>OK</Text>
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback onPress={onPressCancel}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </Modal>
        );
    }
}

ModalCreate.propTypes = {
    isOpen: PropTypes.bool,
    value: PropTypes.string,
    title: PropTypes.string,
    maxChar: PropTypes.number,
    onPressOK: PropTypes.func,
    onPressCancel: PropTypes.func,
    onChangeText: PropTypes.func,
};

ModalCreate.defaultProps = {
    isOpen: false,
    maxChar: 64,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: 320,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    input: {
        fontSize: 18,
        marginTop: 24
    },
    buttonBottom: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 48
    },
    buttonText: {
        color: '#555'
    }
});