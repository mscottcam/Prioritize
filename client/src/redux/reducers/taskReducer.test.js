import thunk from 'redux-thunk';
import * as actions from '../actions'
import taskReducer from './taskReducer'
import missionReducer from './missionReducer'

describe('task reducer', () => {
  it('should set state to initial state when no arguments', () => {
    const newState = taskReducer(undefined, {type: 'test'});
    expect(newState.currentUser).toEqual(null);
    expect(newState.tasks).toEqual([]);
  });
  // 
  it('should return current state on unknown action', () => {
    let state = {};
    const newState = taskReducer(state, undefined);
    expect(newState).toEqual({});
  })
});
