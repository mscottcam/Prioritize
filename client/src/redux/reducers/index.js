import { combineReducers } from 'redux';

import { taskReducer, missionReducer } from '../reducers'

const rootReducer = combineReducers({ taskReducer, missionReducer })

export default rootReducer