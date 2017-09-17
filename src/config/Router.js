import React from 'react';
import {
    AppRegistry,
    Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import SplashScreen from '../views/SplashScreen';
import ProjectList from '../views/ProjectList';
import TaskList from '../views/TaskList';

const Router = StackNavigator({
    SplashScreen: { 
        screen: SplashScreen 
    },
    ProjectList: { 
        screen: ProjectList 
    },
    TaskList: { 
        screen: TaskList 
    },
});

export default Router;