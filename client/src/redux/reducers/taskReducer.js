import * as actions from '../actions'

const initialState = {
  currentUser: null, 
  userId: null,
  currentMission: null,
  roles:[],
  goals: [],
  projects: [],
  tasks: []
};

const taskReducer = (state=initialState, action) => {
  switch (action.type) {
    // case 'USER_LOGIN_SUCCESS':{
    //   return Object.assign ({}, state, {data})
    // }
    case 'FETCH_USER_DATA_SUCCESS': {
      return {
        ...state,
        currentUser: action.userData.currentUser,
        roles: action.userData.roles,
        goals: action.userData.goals,
        projects: action.userData.projects,
        tasks: action.userData.tasks
      }
    }
    case 'POST_TASK_SUCCESS': {
      return {
        ...state,
         tasks: [...state.tasks, action.task]
      };
    }
    case 'UPDATE_TASK_SUCCESS': {
      const findTask = (arr) => arr.taskId === action.task.taskId;
      
      let taskToUpdate = state.tasks.find(findTask);
      taskToUpdate.task = action.task.task;
      return {
        ...state,
        tasks: [...state.tasks, taskToUpdate]
      }
    }
    default:
    return state;
  }
}

export default taskReducer