import * as actions from '../actions'

const initialState = {
  currentUser: null, //name
  userId: null,
  currentMission: null,
  roles:[],
  goals: [],
  projects: [],
  tasks: []
};

// what does actions.action look like
const taskReducer = (state=initialState, action) => {
  switch (action.type) {
    // case 'USER_LOGIN_SUCCESS':{
    //   return Object.assign ({}, state, {data})
    // }
    case 'FETCH_USER_DATA_SUCCESS': {
      return {
        ...state,
        // userId:action.userDATA.userId,
        // roles: action.userDATA.roles,
        // goals: action.userDATA.goals,
        // projects: action.userDATA.projects,
        tasks: action.tasks
      }
    }
    case 'POST_TASK_SUCCESS': {}
    case 'UPDATE_TASK_SUCCESS': {}

  }

  return state;
}

export default taskReducer