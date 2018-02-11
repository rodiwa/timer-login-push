import { combineReducers } from 'redux'
import { LoginReducer } from './LoginReducer'
import { NavigationReducer } from './NavigationReducer'

export const Reducers = combineReducers({
  login: LoginReducer,
  nav: NavigationReducer
})
