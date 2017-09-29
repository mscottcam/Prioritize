import * as actions from '../actions'

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
    case FETCH_MISSION_REQUEST:
      return state
    case FETCH_MISSION_SUCCESS: 
      return ({
        ...state,
        mission: action.mission
      })


    default: return state
  }

  
}

export default missionReducer