import { combineReducers } from 'redux'
import posts from './posts'
import auth from './auth'
import currentId from './currentId'

export default combineReducers({ posts, auth, currentId })
