import fetch from 'isomorphic-fetch';

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const fetchTasksRequest = () => ({ type: FETCH_TASKS_REQUEST });

export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const fetchTasksSuccess = tasks => ({ type: FETCH_TASKS_SUCCESS, tasks });

export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';
export const fetchTasksError = error => ({type: FETCH_TASKS_ERROR, error});

export const POST_TASK_REQUEST = 'POST_TASK_REQUEST';
export const postTaskRequest = () => ({ type: POST_TASK_REQUEST });

export const POST_TASK_SUCCESS = 'POST_TASK_SUCCESS';
export const postTaskSuccess = task => ({ type: POST_TASK_SUCCESS, task });

export const POST_TASK_ERROR = 'POST_TASK_ERROR';
export const postTaskError = error => ({type: POST_TASK_ERROR, error});

export function fetchTasks() {
  const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    method: 'GET'
  };

  return function (dispatch) {
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
          dispatch(fetchTasksError(err));
        })
  }
}

export const postTask = () => dispatch => {
  dispatch(postTaskRequest());
  const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    method: 'POST'
  };
   fetch('http://localhost:8080/api/tasks', opts)
  .then(res =>{
    if(!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(data => {
    return dispatch(postTaskSuccess(data));
  })
  .catch(err => {
    dispatch(postTaskError(err));
  })
}

// export const fetchCheeses = () => dispatch =>{
//   console.log('cheeses being fetched');
//     dispatch(fetchCheesesRequest());
//   fetch('/api/cheeses',)
//   .then(res => {
//     if (!res.ok) {
//       return Promise.reject(res.statusText)
//     }
//     return res.json();
//   })
//   .then(cheeses => {
//     dispatch(fetchCheesesSuccess(cheeses));
//   }).catch(err => {
//     dispatch(fetchCheesesError(err))
//   })
// };