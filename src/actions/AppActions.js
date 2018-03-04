import { APP_ACTIONS, LOGIN_ACTIONS } from './types'
import { NavigationActions } from 'react-navigation';
import DatabaseService from '../services/DatabaseService';
import moment from 'moment'

export const addNewTimerAction = () => {
  const { EDIT_MODE_ON } = APP_ACTIONS
  return dispatch => {
    dispatch({ type: EDIT_MODE_ON })
    dispatch(NavigationActions.navigate({
      routeName: 'TimerScreen'
    }))
  }
}

export const editTimerAction = isUerLoggedIn => {
  const { EDIT_MODE_ON, EDIT_EXISTING_TIMER_ON } = APP_ACTIONS

  return dispatch => {
    dispatch({ type: EDIT_MODE_ON })
    dispatch({ type: EDIT_EXISTING_TIMER_ON })
    dispatch(NavigationActions.navigate({
      routeName: 'TimerScreen'
    }))
  }
}

export const saveEditTimerAction = () => {

}

export const cancelEditTimerAction = () => {
  const { EDIT_MODE_OFF, EDIT_EXISTING_TIMER_OFF } = APP_ACTIONS

  return dispatch => {
    dispatch({ type: EDIT_MODE_OFF })
    dispatch({ type: EDIT_EXISTING_TIMER_OFF })
    dispatch(NavigationActions.navigate({
      routeName: 'Guest',
      action: NavigationActions.navigate({ routeName: 'Timer' })
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

export const showFirstTimerInListOnLogin = timerDetails => {
  const { SET_SELECTED_TIMER_DETAILS } = APP_ACTIONS
  return dispatch => {
    dispatch({ type: SET_SELECTED_TIMER_DETAILS, payload: timerDetails })
    dispatch(NavigationActions.navigate({
      routeName: 'User',
      action: NavigationActions.navigate({ routeName: 'Timer', params: timerDetails })
    }))
  }
}

export const startTimerAction = (hours, minutes) => {
  const { START_TIMER_COUNTDOWN } = APP_ACTIONS
  const endTime = moment().add({ hours, minutes }).format()

  return dispatch => {
    dispatch(NavigationActions.navigate({
      routeName: 'TimerScreen'
    }))
    dispatch({ type: START_TIMER_COUNTDOWN, payload: {
      endTime
    } })
  }
}

export const stopTimerAction = () => {
  const { RESET_TIMER } = APP_ACTIONS
  return (dispatch, getState) => {
    const { isLoggedIn } = getState().login
    const navToUserType = isLoggedIn ? 'User' : 'Guest'
    dispatch(NavigationActions.navigate({
      routeName: navToUserType,
      action: NavigationActions.navigate({ routeName: 'Timer' })
    }))
    dispatch({ type: RESET_TIMER })
  }
}

export const userClicksOkOnTimerCompleteAction = () => {
  const { RESET_TIMER } = APP_ACTIONS  
  return dispatch => {
    dispatch(NavigationActions.navigate({
      routeName: 'User',
      action: NavigationActions.navigate({ routeName: 'Timer' })
    }))
    dispatch({ type: RESET_TIMER })    
  }
}

export const guestClicksOkOnTimerCompleteAction = () => {
  const { STOP_TIMER_COUNTDOWN } = APP_ACTIONS  
  return dispatch => {
    dispatch(NavigationActions.navigate({
      routeName: 'Guest',
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

export const saveNewTimerAction = (newTitle) => {
  const { EDIT_MODE_OFF } = APP_ACTIONS
  const { ADD_NEW_TIMER_TO_LIST } = LOGIN_ACTIONS

  return async (dispatch, getState) => {
    const userid = getState().login.userDetails.user.id
    const newTime = getState().app.defaultTime
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

export const updateHourByUserAction = (hours) => {
  const { SET_HOUR_USER } = APP_ACTIONS
  return {
    type: SET_HOUR_USER,
    payload: hours
  }
}

export const updateMinuteByUserAction = (minutes) => {
  const { SET_MINUTES_USER } = APP_ACTIONS
  return {
    type: SET_MINUTES_USER,
    payload: minutes
  }
}
