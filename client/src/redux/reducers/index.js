import { combineReducers } from 'redux';

import taskReducer from './taskReducer'
import missionReducer from './missionReducer'

const rootReducer = combineReducers({ taskReducer, missionReducer })

export default rootReducer