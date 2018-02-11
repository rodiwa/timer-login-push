import { RootNavigator } from '../navigation/RootNavigator'
import { NavigationActions } from 'react-navigation'

const initialState = RootNavigator.router.getStateForAction(NavigationActions.init())

export const NavigationReducer = (state = initialState, action) => {
  const newState = RootNavigator.router.getStateForAction(action, state)
  
  return newState || state
}
