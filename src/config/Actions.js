export const ADD_PROJECT_BATCH = 'ADD_PROJECT_BATCH';
export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';

export function addProjectBatch(projects) {
    return {
        type: ADD_PROJECT_BATCH,
        projects
    }
}

export function addProject(id, name) {
    return {
        type: ADD_PROJECT,
        id,
        name
    }
}

export function removeProject(id) {
    return {
        type: REMOVE_PROJECT,
        id
    }
}

