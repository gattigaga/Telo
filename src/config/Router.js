import React from 'react';
import {
    AppRegistry,
    Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import ProjectList from '../views/ProjectList';
import TaskList from '../views/TaskList';

const Router = StackNavigator({
    ProjectList: { 
        screen: ProjectList 
    },
    TaskList: { 
        screen: TaskList 
    },
});

export default Router;