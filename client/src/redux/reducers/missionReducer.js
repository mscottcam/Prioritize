import * as actions from '../actions';

const initialState = {
  currentUser: null, //name
  userId: null,
  currentMission: null,
  roles:[],
  goals: [],
  projects: [],
  tasks: []
};

const missionReducer = (state=initialState, action) => {
  switch (action.type) {
    case actions.FETCH_MISSION_REQUEST:
      return state
    case actions.FETCH_MISSION_SUCCESS: 
      return ({
        ...state,
        currentMission: action.mission
      });
    case actions.FETCH_MISSION_ERROR:
      return state
    case actions.POST_MISSION_REQUEST: 
      return state
    case actions.POST_MISSION_SUCCESS:
      return ({
        ...state, 
        currentMission: action.mission
      });  
    case actions.POST_MISSION_ERROR:
      return state
    default: return state
  };
};

export default missionReducer