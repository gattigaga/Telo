import React from 'react';
import {
    AppRegistry,
    Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import ProjectList from '../views/ProjectList';

const Router = StackNavigator({
    ProjectList: { 
        screen: ProjectList 
    },
});

export default Router;