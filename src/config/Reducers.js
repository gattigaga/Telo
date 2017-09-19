import { combineReducers } from 'redux';
import {
    ADD_PROJECT_BATCH,
    ADD_PROJECT,
    REMOVE_PROJECT,
    ADD_TASK_BATCH,
    ADD_TASK,
    REMOVE_TASK,
} from './Actions';

function projects(state = [], action) {
    switch (action.type) {
        case ADD_PROJECT_BATCH:
            return [ ...action.projects ];
        case ADD_PROJECT:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name
                }
            ];
        case REMOVE_PROJECT:
            return state.filter((project) => {
                return project.id != action.id;
            });
        default:
            return state;
    }
}

function tasks(state = [], action) {
    switch (action.type) {
        case ADD_TASK_BATCH:
            return [ ...action.tasks ];
        case ADD_TASK:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    projectID: action.projectID,
                }
            ];
        case REMOVE_TASK:
            return state.filter((task) => {
                return task.id != action.id;
            });
        default:
            return state;
    }
}

const Reducers = combineReducers({
    projects,
    tasks
});

export default Reducers;