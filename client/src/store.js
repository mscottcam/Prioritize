import {createStore, applyMiddleware} from 'redux';
import reducer from './redux/reducers/reducer';
import thunk from 'redux-thunk';

const store = createStore(reducer, window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION(), applyMiddleware(thunk))
console.log('Text', store.getState());
export default store;