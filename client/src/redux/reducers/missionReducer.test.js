import thunk from 'redux-thunk';
import * as actions from '../actions'
import missionReducer from './missionReducer'

describe('task reducer', () => {
  it('should set state to initial state when no arguments', () => {
    const newState = missionReducer(undefined, { type: 'test' });
    expect(newState.currentUser).toEqual(null);
    expect(newState.tasks).toEqual([]);
  });

  it('should return current state on unknown action', () => {
    let state = {};
    const newState = missionReducer(state, { type: 'test' });
    expect(newState).toEqual({});
  });

  it('should handle FETCH_MISSION_REQUEST', () => {
    let state = { test: "test" };
    let newState = missionReducer(state, actions.fetchMissionRequest());
    expect(newState).toEqual({ test: "test" });
  });

  it('should handle FETCH_MISSION_SUCCESS', () => {
    let state = {};
    let newState = missionReducer(state, actions.fetchMissionSuccess('test'));
    expect(newState).toEqual({ currentMission: 'test' });
  });

  it('should handle FETCH_MISSION_ERROR', () => {
    let state = {test: 'test'};
    let newState = missionReducer(state, actions.fetchMissionError());
    expect(newState).toEqual({test: 'test'});
  });

  it('should handle POST_MISSION_REQUEST', () => {
    let state = {test: 'test'};
    let newState = missionReducer(state, actions.postMissionRequest());
    expect(newState).toEqual({test: 'test'});
  }); 

  it('should handle POST_MISSION_SUCCESS', () => {
    let state = {};
    let newState = missionReducer(state, actions.postMissionSuccess('test'));
    expect(newState).toEqual({ currentMission: 'test' });
  });

  it('should handle POST_MISSION_ERROR', () => {
    let state = {test: 'test'};
    let newState = missionReducer(state, actions.postMissionError());
    expect(newState).toEqual({test: 'test'});
  });
});
