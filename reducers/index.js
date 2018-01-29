import { combineReducers } from 'redux'
import { LoginReducer } from './LoginReducer'

export const Reducers = combineReducers({
  login: LoginReducer
})
