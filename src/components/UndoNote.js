import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class UndoNote extends Component {
    render() {
        let {
            children,
            onPressUndo,
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.message}>{children}</Text>
                </View>
                <View style={{ marginLeft: 32 }}>
                    <Icon
                        size={24}
                        name="undo"
                        onPress={onPressUndo} />
                </View>
            </View>
        );
    }
}

UndoNote.propTypes = {
    children: PropTypes.string.isRequired,
    onPressUndo: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#eee',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    message: {
        fontWeight: 'bold',
        fontSize: 18,
    }
});