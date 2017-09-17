import { combineReducers } from 'redux';
import {
    ADD_PROJECT_BATCH,
    ADD_PROJECT,
    REMOVE_PROJECT
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

const Reducers = combineReducers({
    projects
});

export default Reducers;