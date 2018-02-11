import { APP_ACTIONS } from './types'
import { NavigationActions } from 'react-navigation';

export const addNewTimerAction = () => {
  const { ADD_NEW_TIMER, EDIT_MODE_ON } = APP_ACTIONS
  return dispatch => {
    dispatch({ type: ADD_NEW_TIMER })
    dispatch({ type: EDIT_MODE_ON })
    dispatch(NavigationActions.navigate({
      routeName: 'Timer'
    }))
  }
}

export const cancelAddTimerAction = () => {
  const { EDIT_MODE_OFF } = APP_ACTIONS
  return dispatch => {
    dispatch({ type: EDIT_MODE_OFF })
    dispatch(NavigationActions.navigate({
      routeName: 'List'
    }))
  }
}