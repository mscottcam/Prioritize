import * as actions from "../actions";

const initialState = {
  currentUser: "",
  errorMessage: ""
};

const authReducer = (state = initialState, action) => {
  if (action.type === actions.AUTH_SUCCESS) {
    return {
      ...state,
      currentUser: action.currentUser
    };
  }
  if (action.type === actions.AUTH_ERROR) {
    return {
      ...state,
      errorMessage: action.message
    };
  }
  return state;
};

export default authReducer;