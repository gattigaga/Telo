import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

export default class Header extends Component {
    render() {
        let { 
            title
        } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string,
};

Header.defaultProps = {
    title: 'Header Title',
};

const styles = StyleSheet.create({
    container: {
        height: 240,
    },
    title: {
        width: '75%',
        fontSize: 48,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 48
    }
});