import { combineReducers } from 'redux';

import taskReducer from './taskReducer'
import missionReducer from './missionReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({ taskReducer, missionReducer, authReducer })

export default rootReducer