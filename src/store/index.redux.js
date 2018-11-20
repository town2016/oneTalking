import { combineReducers } from 'redux'
import { gallery } from './hot.redux'
import { user } from './user.redux'
import { dynamic } from './talking.redux'
export default combineReducers({gallery, user, dynamic})
