import * as actions from "../actions";

const initialState = {
  currentUser: null,
  userId: null,
  currentMission: "Do First Things First"
};

const missionReducer = (state = initialState, action) => {
  if (action.type === actions.FETCH_MISSION_REQUEST) {
    return state;
  }
  if (action.type === actions.FETCH_MISSION_SUCCESS) {
    return {
      ...state,
      currentMission: action.mission
    };
  }
  if (action.type === actions.FETCH_MISSION_ERROR) {
    return state;
  }
  if (action.type === actions.POST_MISSION_REQUEST) {
    return state;
  }
  if (action.type === actions.POST_MISSION_SUCCESS) {
    return {
      ...state,
      currentMission: action.mission
    };
  }
  if (action.type === actions.POST_MISSION_ERROR) {
    return state;
  }
  return state;
};

export default missionReducer;