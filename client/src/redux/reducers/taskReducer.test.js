import thunk from 'redux-thunk';
import * as actions from '../actions'
import taskReducer from './taskReducer'
import missionReducer from './missionReducer'

describe('task reducer', () => {
  xit('should set state to initial state when no arguments', () => {
    const newState = taskReducer(undefined, {type: 'test'});
    expect(newState.currentUser).toEqual(null);
    expect(newState.tasks).toEqual([]);
  });

  xit('should return current state on unknown action', () => {
    let state = {};
    const newState = taskReducer(state, undefined);
    expect(newState).toEqual({});
  })
    it('should handle FETCH_USER_DATA_SUCCESS action', () => {
      let state = {};
    const newState = taskReducer(state, {type: 'FETCH_USER_DATA_SUCCESS'});
    expect(newState.currentUser).toEqual(true);
    expect(newState.tasks).toEqual([]);
  });
  // it('should handle POST_TASK_SUCCESS', () => {
  //   const newState = taskReducer(undefined, {type: 'POST_TASK_SUCCESS'});
  //   expect(newState.currentUser).toEqual(true);
  //   expect(newState.tasks).toInclude(action.task);
  // });
  // it('should handle UPDATE_TASK_SUCCESS', () => {
  //   const newState = taskReducer(undefined, {type: 'UPDATE_TASK_SUCCESS'});
  //   expect(newState.currentUser).toEqual(true);
  //   expect(newState.tasks).toEqual([]);
  // });

});
