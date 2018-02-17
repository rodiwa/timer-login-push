import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { LoginReducer } from './LoginReducer'
import { NavigationReducer } from './NavigationReducer'
import { AppStateReducer } from './AppStateReducer'

const persistConfig = {
  key: 'root',
  storage
}

const Reducers = combineReducers({
  login: LoginReducer,
  nav: NavigationReducer,
  app: AppStateReducer
})

export default persistReducer(persistConfig, Reducers)
