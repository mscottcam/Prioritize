import fetch from 'isomorphic-fetch';
import * as Cookies from 'js-cookie';

export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const fetchUserDataRequest = () => ({ type: FETCH_USER_DATA_REQUEST });

export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const fetchUserDataSuccess = userData => ({ type: FETCH_USER_DATA_SUCCESS, userData });

export const FETCH_USER_DATA_ERROR = 'FETCH_USER_DATA_ERROR';
export const fetchUserDataError = error => ({type: FETCH_USER_DATA_ERROR, error});

export const fetchUserData = () => dispatch => {
  const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    method: 'GET'
  };
  dispatch(fetchUserDataRequest());
  return fetch('http://localhost:8080/api/userData', opts)
    .then(res => {
      // console.log('Do we have our res: ', res);
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(userData => {
      console.log('USER-DATA ACTION-->', userData)
      return dispatch(fetchUserDataSuccess(userData));
    })
    .catch(err => {
      return dispatch(fetchUserDataError(err));
    })
};
// --------------------------------------------------------------------------------
export const POST_TASK_REQUEST = 'POST_TASK_REQUEST';
export const postTaskRequest = () => ({ type: POST_TASK_REQUEST });

export const POST_TASK_SUCCESS = 'POST_TASK_SUCCESS';
export const postTaskSuccess = task => ({ type: POST_TASK_SUCCESS, task });

export const POST_TASK_ERROR = 'POST_TASK_ERROR';
export const postTaskError = error => ({type: POST_TASK_ERROR, error});

export const postTask = data => dispatch => {
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
};

// --------------------------------------------------------------------------------
export const FETCH_MISSION_REQUEST = 'FETCH_MISSION_REQUEST';
export const fetchMissionRequest = () => ({type: FETCH_MISSION_REQUEST});

export const FETCH_MISSION_SUCCESS = 'FETCH_MISSION_SUCCESS';
export const fetchMissionSuccess = mission => ({ type: FETCH_MISSION_SUCCESS, mission });

export const FETCH_MISSION_ERROR = 'FETCH_MISSION_ERROR';
export const fetchMissionError = error => ({type: FETCH_MISSION_ERROR, error});

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
// --------------------------------------------------------------------------------
export const POST_MISSION_REQUEST = 'POST_MISSION_REQUEST';
export const postMissionRequest = () => ({type: POST_MISSION_REQUEST});

export const POST_MISSION_SUCCESS = 'POST_MISSION_SUCCESS';
export const postMissionSuccess = mission => ({type: POST_MISSION_SUCCESS, mission});

export const POST_MISSION_ERROR = 'POST_MISSION_ERROR';
export const postMissionError = () => ({type: POST_MISSION_ERROR});

export const postMission = data => dispatch => {
  const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    method: 'POST',
    body: JSON.stringify(data)
  };

  dispatch(postMissionRequest());
  return fetch('http://localhost:8080/api/mission', opts)
    .then(res => {
      if(!res.ok) {
        return Promise.reject(res.statusText)
      } 
      return res.json();
    })
    .then(data => {
      return dispatch(postMissionSuccess(data));
    })
    .catch(err => {
      dispatch(postMissionError(err));
    })
};
// --------------------------------------------------------------------------------
export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const updateTaskRequest = () => ({type: UPDATE_TASK_REQUEST});

export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const updateTaskSuccess = task => ({type: UPDATE_TASK_SUCCESS, task});

export const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR';
export const updateTaskError = () => ({type: UPDATE_TASK_ERROR});

export const updateTask = data => dispatch => {
    const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    method: 'PUT',
    body: JSON.stringify(data)
  };

  dispatch(updateTaskRequest());
  return fetch('http://localhost:8080/api/tasks', opts)
    .then(res => {
      if(!res.ok) {
        return Promise.reject(res.statusText)
      } 
      return res.json();
    })
    .then(data => {
      return dispatch(updateTaskSuccess(data));
    })
    .catch(err => {
      dispatch(updateTaskError(err));
    })
};
// --------------------------------------------------------------------------------

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = message => ({
  type: AUTH_ERROR,
  message
});

export const authenticate = () => dispatch => {
  const accessToken = Cookies.get('accessToken');
  // console.log(accessToken);
  if (accessToken) {
    fetch('/api/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => {
        if (!res.ok) {
          if (res.status !== 401) {
            // Unauthorized, clear the cookie and go to the login page
            Cookies.remove('accessToken');
            return;
          }
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(currentUser => {
        return dispatch(authSuccess(currentUser)); 
      });
  }
};





