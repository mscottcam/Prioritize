import thunk from 'redux-thunk';
import * as actions from '../actions'
import authReducer from './authReducer'

const initialState = {
  currentUser: '',
  errorMessage: ''
}

describe('authReducer', () => {
  it('should set state to initial state when no arguments', ()=>{
    let newState = authReducer(undefined, {type: 'test'});
    expect(newState.currentUser).toEqual('');
    expect(newState.errorMessage).toEqual('');
  })
  it('should return current state on unknown action', () => {
    let state = 'whot he don';
    const newState = authReducer(state, 'ehsy yfljg');
    expect(newState).toEqual(state);
  });
  it('should set Current User when AuthSuccess', () => {
    let state = initialState;
    let currentUser ='Lewi Gilamichael';
    let newState = authReducer(state, actions.authSuccess(currentUser));
    expect(newState.currentUser).toEqual(currentUser);
  });
  it('should set ErrorMessage when AuthError', () => {
    let state = initialState
    let message = 'you done wrong'
    let newState= authReducer(state, actions.authError(message))
    expect(newState.errorMessage).toEqual(message);
  })
});
