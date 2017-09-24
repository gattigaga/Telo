export const ADD_PROJECT_BATCH = 'ADD_PROJECT_BATCH';
export const ADD_PROJECT = 'ADD_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';

export const ADD_TASK_BATCH = 'ADD_TASK_BATCH';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK_BATCH = 'REMOVE_TASK_BATCH';
export const REMOVE_TASK = 'REMOVE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';

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

export function addTaskBatch(tasks) {
    return {
        type: ADD_TASK_BATCH,
        tasks
    }
}

export function addTask(id, name, projectID) {
    return {
        type: ADD_TASK,
        id,
        name,
        projectID
    }
}

export function removeTaskBatch(projectID) {
    return {
        type: REMOVE_TASK_BATCH,
        projectID,
    }
}

export function removeTask(id, projectID) {
    return {
        type: REMOVE_TASK,
        id,
        projectID,
    }
}

export function toggleTask(id, projectID) {
    return {
        type: TOGGLE_TASK,
        id,
        projectID,
    }
}

