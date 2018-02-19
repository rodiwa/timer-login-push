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

export const selectTimerFromListAction = timerDetails => {
  const { SET_SELECTED_TIMER_DETAILS } = APP_ACTIONS
  return dispatch => {
    dispatch({ type: SET_SELECTED_TIMER_DETAILS, payload: timerDetails })
    dispatch(NavigationActions.navigate({
      routeName: 'Timer',
      params: timerDetails
    }))
  }
}

export const startTimerAction = () => {
  const { START_TIMER_COUNTDOWN } = APP_ACTIONS
  return dispatch => {
    dispatch(NavigationActions.navigate({
      routeName: 'TimerScreen'
    }))
    dispatch({ type: START_TIMER_COUNTDOWN })
  }
}

export const stopTimerAction = () => {
  const { STOP_TIMER_COUNTDOWN } = APP_ACTIONS
  return dispatch => {
    dispatch(NavigationActions.navigate({
      routeName: 'User',
      action: NavigationActions.navigate({ routeName: 'Timer' })
    }))
    dispatch({ type: STOP_TIMER_COUNTDOWN })    
  }
}

export const timerCompleteAction = () => {
  const { TIMER_COMPLETE } = APP_ACTIONS
  return {
    type: TIMER_COMPLETE
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