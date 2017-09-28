import fetch from 'isomorphic-fetch';

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const fetchTasksRequest = () => ({ type: FETCH_TASKS_REQUEST });

export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const fetchTasksSuccess = tasks => ({ type: FETCH_TASKS_SUCCESS, tasks });

export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';
export const fetchTasksError = error => ({type: FETCH_TASKS_ERROR, error});
// --------------------------------------------------------------------------------
export const POST_TASK_REQUEST = 'POST_TASK_REQUEST';
export const postTaskRequest = () => ({ type: POST_TASK_REQUEST });

export const POST_TASK_SUCCESS = 'POST_TASK_SUCCESS';
export const postTaskSuccess = task => ({ type: POST_TASK_SUCCESS, task });

export const POST_TASK_ERROR = 'POST_TASK_ERROR';
export const postTaskError = error => ({type: POST_TASK_ERROR, error});
// --------------------------------------------------------------------------------
export const FETCH_MISSION_REQUEST = 'FETCH_MISSION_REQUEST';
export const fetchMissionRequest = () => ({type: FETCH_MISSION_REQUEST})

export const FETCH_MISSION_SUCCESS = 'FETCH_MISSION_SUCCESS';
export const fetchMissionSuccess = mission => ({ type: FETCH_MISSION_SUCCESS, mission })

export const FETCH_MISSION_ERROR = 'FETCH_MISSION_ERROR';
export const fetchMissionError = error => ({type: FETCH_MISSION_ERROR, error})
// --------------------------------------------------------------------------------
export const fetchTasks = () => dispatch => {
  const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    method: 'GET'
  };
  dispatch(fetchTasksRequest());
  return fetch('http://localhost:8080/api/tasks', opts)
    .then(res => {
      // console.log('Do we have our res: ', res);
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      return dispatch(fetchTasksSuccess(data));
    })
    .catch(err => {
      return dispatch(fetchTasksError(err));
    })
}

export const postTask = (data) => dispatch => {
  const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    method: 'POST',
    body: JSON.stringify(data)
  };
  dispatch(postTaskRequest());
  return fetch('http://localhost:8080/api/tasks', opts)
  .then(res => {
    if(!res.ok) {
      console.log('Do we have our res: ', res);
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(data => {
    console.log('In data', data)
    return dispatch(postTaskSuccess(data));
  })
  .catch(err => {
    console.log('ERROR!#$#!@#')
    dispatch(postTaskError(err));
  })
}

export const fetchMission = () => dispatch => {
  const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    method: 'GET'
  };
  dispatch(fetchMissionRequest());
  return fetch('http://localhost:8080/api/mission', opts)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText)
      }
      return res.json()
    })
    .then(data => {
      return dispatch(fetchMissionSuccess(data))
    })
    .catch(error => {
      return dispatch(fetchMissionError(error))
    })
};