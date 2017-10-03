import * as actions from '../actions';

const initialState = {
  currentUser: '',
  errorMessage: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_SUCCESS:
      return ({
        ...state,
        currentUser: action.currentUser
      });
    case actions.AUTH_ERROR:
      return ({
        ...state, 
        errorMessage: action.message
      });
    default: return state
  };
};

export default authReducer