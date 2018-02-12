import { APP_ACTIONS, LOGIN_ACTIONS } from './types'
import { NavigationActions } from 'react-navigation';
import DatabaseService from '../services/DatabaseService';

export const addNewTimerAction = () => {
  const { EDIT_MODE_ON } = APP_ACTIONS
  return dispatch => {
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

export const saveNewTimerAction = (newTitle, newTime) => {
  const { EDIT_MODE_OFF } = APP_ACTIONS
  const { ADD_NEW_TIMER_TO_LIST } = LOGIN_ACTIONS
  return async (dispatch, getState) => {
    const userid = getState().login.userDetails.user.id
    // LOADING_ON

    const saveResult = await DatabaseService.saveNewTimerInList(newTitle, newTime, userid)
    if (!saveResult) {
      // DISPATCH ERROR
      return console.log('Error in saving new timer')
    }
    // Update list in states so timer list is updated automatically in List section
    dispatch({
      type: ADD_NEW_TIMER_TO_LIST,
      payload: saveResult
    })
    dispatch({ type: EDIT_MODE_OFF })
    dispatch(NavigationActions.navigate({
      routeName: 'List'
    }))
    // LOADING_OFF
  }
}