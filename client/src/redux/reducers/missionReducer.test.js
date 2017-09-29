import thunk from 'redux-thunk';
import * as actions from '../actions'
import missionReducer from './missionReducer'

describe('task reducer', () => {
  it('should set state to initial state when no arguments', () => {
    const newState = missionReducer(undefined, {type: 'test'});
    expect(newState.currentUser).toEqual(null);
    expect(newState.tasks).toEqual([]);
  });

  it('should return current state on unknown action', () => {
    let state = {};
    const newState = missionReducer(state, undefined);
    expect(newState).toEqual({});
  })
});
