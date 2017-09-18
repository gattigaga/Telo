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
            title,
            children
        } = this.props;

        return (
            <Text style={styles.title}>{title}</Text>
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
    title: {
        width: '75%',
        fontSize: 48,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 48
    },
});