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
  });

  it('should handle FETCH_MISSION_REQUEST', () => {
    expect(missionReducer(undefined, actions.fetchMissionRequest()))
      .toEqual({currentUser: null, tasks: []})
  });

  it.only('should handle FETCH_MISSION_SUCCESS', () => {
    expect(missionReducer(undefined, actions.fetchMissionSuccess('My mission is for this test')))
      .toEqual({currentUser: null, tasks: [], mission: ''})
  });

});
