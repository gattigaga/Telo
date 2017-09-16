/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Router from './src/config/Router';
import Reducers from './src/config/Reducers';

let store = createStore(Reducers);

export default class Telo extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Telo', () => Telo);
