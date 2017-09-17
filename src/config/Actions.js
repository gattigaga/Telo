export const ADD_PROJECT_BATCH = 'ADD_PROJECT_BATCH';
export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';

let projectID = 1;

export function addProjectBatch(projects) {
    return {
        type: ADD_PROJECT_BATCH,
        projects
    }
}

export function addProject(name) {
    return {
        type: ADD_PROJECT,
        id: projectID++,
        name
    }
}

export function removeProject(id) {
    return {
        type: REMOVE_PROJECT,
        id
    }
}

