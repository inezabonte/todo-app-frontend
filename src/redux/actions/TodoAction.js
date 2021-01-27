import axios from 'axios'

export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS'
export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR'

export const CREATE_TASK_PENDING = 'CREATE_TASK_PENDING'
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS'
export const CREATE_TASK_ERROR = 'CREATE_TASK_ERROR'

export const CLEAR_SNACKBAR = 'CLEAR_SNACKBAR'

export const DELETE_TASK_PENDING = 'DELETE_TASK_PENDING'
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS'
export const DELETE_TASK_ERROR = 'DELETE_TASK_ERROR'

export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS'
export const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR'
export const UPDATE_TASK_PENDING = 'UPDATE_TASK_PENDING'

const token = window.localStorage.getItem('loginToken')


export const fetchTasks = () => dispatch => {
    return axios.get('https://todo-app-ineza.herokuapp.com/api/v1/todo', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {
        dispatch({
            type: FETCH_TASKS_SUCCESS,
            payload: res.data.todos
        })
    })
    .catch(err => {
        dispatch({
            type: FETCH_TASKS_ERROR,
            error: err.response ? err.response.data.error : err.message
        })
    })
}

export const createTask = (payload) => dispatch => {
    dispatch({
        type: CREATE_TASK_PENDING
    })

    return axios.post('https://todo-app-ineza.herokuapp.com/api/v1/todo', payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        dispatch({
            type: CREATE_TASK_SUCCESS,
            payload: res.data.task
        })
    })
    .catch((err) => {
        dispatch({
            type: CREATE_TASK_ERROR,
            error: err.response ? err.response.data.error : err.message
        })
    })
}

export const deleteTask = (id, index) => dispatch => {
    dispatch({
        type: DELETE_TASK_PENDING
    })
    return axios.delete('https://todo-app-ineza.herokuapp.com/api/v1/todo',{
        headers: {
            Authorization: `Bearer ${token}`
        },
        params:{id}
    })
    .then(() => {
        dispatch({
            type: DELETE_TASK_SUCCESS,
            index
        })
    })
    .catch(err => {
        dispatch({
            type: DELETE_TASK_ERROR,
            err: err.response ? err.response.data.error : err.message
        })
    })
}

export const updateTask = (id, payload, index) => dispatch => {
    dispatch({
        type: UPDATE_TASK_PENDING
    })
    return axios.patch('https://todo-app-ineza.herokuapp.com/api/v1/todo', payload, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params:{id}
    })
    .then(() => {
        payload.id = id
        dispatch({
            type: UPDATE_TASK_SUCCESS,
            index,
            payload
        })
    })
    .catch((err) => {
        dispatch({
            type: UPDATE_TASK_ERROR,
            error: err.response ? err.response.data.error : err.message
        })
    })
}

export const clearSnackBar = () => dispatch => {
    dispatch({
        type: CLEAR_SNACKBAR
    })
}