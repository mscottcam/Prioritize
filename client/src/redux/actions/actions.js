export const FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST";
export const fetchTasksRequest = () => ({ type: FETCH_TASKS_REQUEST });


export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const fetchTasksSuccess = tasks => ({ type: FETCH_TASKS_SUCCESS, tasks });

export const fetchTasks = () => dispatch => {
  const opts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "GET"
  };
    dispatch(fetchTasksRequest());
    return fetch("/api/tasks")
      .then(res => {
        console.log('This dont work', res);
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        console.log('Was dis: ', data);
        return dispatch(fetchTasksSuccess(data));
      })
      .catch(err => {
        console.error('Error ', err);
      })
}