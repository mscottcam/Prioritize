import fetch from 'isomorphic-fetch';

export const FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST";
export const fetchTasksRequest = () => ({ type: FETCH_TASKS_REQUEST });


export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const fetchTasksSuccess = tasks => ({ type: FETCH_TASKS_SUCCESS, tasks });

export function fetchTasks() {
  const opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
      // "Access-Control-Allow-Origin": "*"
    },
    method: "GET"
  };

  return function (dispatch) {
      dispatch(fetchTasksRequest());

      return fetch("http://localhost:8080/api/tasks", opts)
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
          console.error('Error ', err);
        })
  }
}
