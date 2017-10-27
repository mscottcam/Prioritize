import * as actions from '../actions';
import sortTasksArray from '../../lib/redux-tasks-sort'

const initialState = {
  currentUser: null, 
  userId: null,
  currentMission: null,
  roles:[],
  goals: [],
  projects: [],
  tasks: [],
  userData: null
};

const taskReducer = (state=initialState, action) => {
  switch (action.type) {
    case actions.FETCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        // currentUser: action.userData.currentUser,
        // roles: action.userData.roles,
        // goals: action.userData.goals,
        // projects: action.userData.projects,
        tasks: action.userData.tasks
        // userData: action.userData
      }
    }
    case actions.POST_TASK_SUCCESS: {
      return {
        ...state,
        tasks: sortTasksArray([...state.tasks, action.taskData])
      };
    }
    case actions.UPDATE_TASK_SUCCESS: {
      const findTask = (arr) => arr.taskId === action.task.taskId;
      let taskToUpdate = state.tasks.find(findTask);
      taskToUpdate.task = action.task.task;
      return {
        ...state,
        tasks: [...state.tasks, taskToUpdate]
      }
    }
    case actions.DELETE_TASK_SUCCESS: {
      const newState = {...state}
      const indexOfTaskToDelete = state.tasks.findIndex(task => {
        return task._id === action.taskId
      })
      newState.tasks.splice(indexOfTaskToDelete, 1);
      return newState;
    }
    default: return state
  }
}

export default taskReducer