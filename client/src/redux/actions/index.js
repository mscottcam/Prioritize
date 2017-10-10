import fetch from 'isomorphic-fetch';
import * as Cookies from 'js-cookie';

export const FETCH_USER_DATA_REQUEST = 'FETCH_USER_DATA_REQUEST';
export const fetchUserDataRequest = () => ({ type: FETCH_USER_DATA_REQUEST });

export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const fetchUserDataSuccess = userData => ({ type: FETCH_USER_DATA_SUCCESS, userData });

export const FETCH_USER_DATA_ERROR = 'FETCH_USER_DATA_ERROR';
export const fetchUserDataError = error => ({type: FETCH_USER_DATA_ERROR, error});

export const fetchUserData = currentUserId => dispatch => {
  console.log('What is our id: ',currentUserId)
  const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    method: 'GET'
  };
  // dispatch some action that: looks @ our authreducer.currentUser => send that id for the fetch/api/userData
  dispatch(fetchUserDataRequest());
  // state.authReducer.XX
  return fetch(`http://localhost:8080/api/userData/${currentUserId.currentUserId}`, opts)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(userData => {
      return dispatch(fetchUserDataSuccess(userData));
    })
    .catch(err => {
      console.error(err)
      return dispatch(fetchUserDataError(err));
    })
};
// --------------------------------------------------------------------------------
export const POST_TASK_REQUEST = 'POST_TASK_REQUEST';
export const postTaskRequest = () => ({ type: POST_TASK_REQUEST });

export const POST_TASK_SUCCESS = 'POST_TASK_SUCCESS';
export const postTaskSuccess = taskData => ({ type: POST_TASK_SUCCESS, taskData });

export const POST_TASK_ERROR = 'POST_TASK_ERROR';
export const postTaskError = error => ({type: POST_TASK_ERROR, error});

export const postTask = taskObj => dispatch => {
  const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    method: 'POST',
    body: JSON.stringify(taskObj)
  };
  dispatch(postTaskRequest());
  return fetch('http://localhost:8080/api/userTask', opts)
  .then(res => {
    if(!res.ok) {
      return Promise.reject(res.statusText)
    }
    return res.json();
  })
  .then(taskData => {
    console.log('returned task object ------->', taskData);
    return dispatch(postTaskSuccess(taskData));
  })
  .catch(err => {
    console.error(err)
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

export const fetchMission = currentUserId => dispatch => {
  console.log('User id in fetchMission: ', currentUserId)
  const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    method: 'GET'
  };
  dispatch(fetchMissionRequest());
  return fetch(`http://localhost:8080/api/mission/${currentUserId.currentUserId}`, opts)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText)
      }
      return res.json()
    })
    .then(mission => {
      return dispatch(fetchMissionSuccess(mission.mission))
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

export const postMission = newMission => dispatch => {
  const opts = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': '*'
    },
    method: 'PUT',
    body: JSON.stringify(newMission)
  };
  dispatch(postMissionRequest());
  return fetch('http://localhost:8080/api/userMission', opts)
    .then(res => {
      if(!res.ok) {
        return Promise.reject(res.statusText)
      } 
      return res.json();
    })
    .then(data => {
      return dispatch(postMissionSuccess(data.mission));
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
        console.log("You are currently logged in as: ", currentUser)
        return dispatch(authSuccess(currentUser)); 
      })
      .catch(err => console.error(err))
  }
};





