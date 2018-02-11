import { combineReducers } from 'redux'
import { LoginReducer } from './LoginReducer'
import { NavigationReducer } from './NavigationReducer'
import { AppStateReducer } from './AppStateReducer'

export const Reducers = combineReducers({
  login: LoginReducer,
  nav: NavigationReducer,
  app: AppStateReducer
})
