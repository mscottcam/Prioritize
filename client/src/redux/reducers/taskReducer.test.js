import thunk from 'redux-thunk';
import * as actions from '../actions'
import taskReducer from './taskReducer'
import missionReducer from './missionReducer'

const initialState = {
  currentUser: null, 
  userId: null,
  currentMission: null,
  roles:[],
  goals: [],
  projects: [],
  tasks: []
};
const userData = {
  currentUser: 'lewi',
  userId: 61518,
  roles:[
    {role:'uncle'}
  ],
  goals: [],
  projects: [],
  tasks: [
    {
      taskId: 5678,
      task: 'do homework on monday',
      quadrantValue: 2
    }
  ]
};

describe('task reducer', () => {
  it('should set state to initial state when no arguments', () => {
    const newState = taskReducer(undefined, {type: 'test'});
    expect(newState.currentUser).toEqual(null);
    expect(newState.tasks).toEqual([]);
  });

  it('should return current state on unknown action', () => {
    let state = 'whot he don';
    const newState = taskReducer(state, 'ehsy yfljg');
    expect(newState).toEqual(state);
  })
  it('should handle FETCH_USER_DATA_SUCCESS action', () => {
    let state = initialState;
    const newState = taskReducer(state, actions.fetchUserDataSuccess(userData));
    // expect(newState.currentUser).toEqual(userData.currentUser);
    // expect(newState.roles).toEqual(userData.roles);
    // expect(newState.goals).toEqual(userData.goals);
    // expect(newState.projects).toEqual(userData.projects);
    expect(newState.tasks).toEqual(userData.tasks);
  });
  it('should handle POST_TASK_SUCCESS', () => {
    let state = userData;
    let newTask = {
      taskId: 3456,
      task:'what the hell is this',
      quadrantValue: 2,
      userId: {}
    };
    const newState = taskReducer(state, actions.postTaskSuccess(newTask));
    expect(newState.tasks).toContainEqual(newTask);
  });
  it('should handle UPDATE_TASK_SUCCESS', () => {
    let state = userData;
    let updateTask = {
      taskId: 5678,
      task: 'postpone homework',
      quadrantValue: 2
    }
    const newState = taskReducer(state, actions.updateTaskSuccess(updateTask));
    expect(newState.tasks.find(item => item.taskId ===updateTask.taskId)).toEqual(updateTask);
  });
  it('should handle DELETE_TASK_SUCCESS', () => {
    let state = userData;
    let taskToDeleteId = 5678;
    const newState = taskReducer(state, actions.deleteTaskSuccess(taskToDeleteId));
    expect(newState.tasks.length).toEqual((state.tasks.length))
  });
});