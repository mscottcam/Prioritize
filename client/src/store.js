import {createStore, applyMiddleware} from 'redux';
import taskReducer from './redux/reducers/taskReducer';
import thunk from 'redux-thunk';

const store = createStore(taskReducer, window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION(), applyMiddleware(thunk))
export default store;