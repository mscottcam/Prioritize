import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { fetchTasks, fetchTasksRequest } from './redux/actions/actions';

store.dispatch(fetchTasks());
store.dispatch(fetchTasksRequest());
console.log('Text', store.getState());

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();