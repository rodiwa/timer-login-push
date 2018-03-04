import { APP_ACTIONS } from '../actions/types'
import { LOGIN_ACTIONS } from '../actions/types'

const INITIAL_STATE = {
  isEditing: false,
  isTimerRunning: false,
  isTimerComplete: false,
  defaultTime: {
    hours: '04',
    minutes: '30'
  }
}

export const AppStateReducer = (state=INITIAL_STATE, action) => {
  const {
    EDIT_MODE_ON, 
    EDIT_MODE_OFF, /* ADD_NEW_TIMER_TO_LIST */
    EDIT_EXISTING_TIMER_ON,
    EDIT_EXISTING_TIMER_OFF,
    START_TIMER_COUNTDOWN,
    STOP_TIMER_COUNTDOWN,
    TIMER_COMPLETE,
    SET_SELECTED_TIMER_DETAILS,
    RESET_TIMER,
    SET_HOUR_USER,
    SET_MINUTES_USER } = APP_ACTIONS

    const { LOGOUT_SUCCESS } = LOGIN_ACTIONS

  switch (action.type) {
    case EDIT_MODE_ON:
      return Object.assign({}, state, { isEditing: true })
    case EDIT_MODE_OFF:
      return Object.assign({}, state, { isEditing: false })
    case EDIT_EXISTING_TIMER_ON:
      return Object.assign({}, state, { isEditingExistingTimer: true })
    case EDIT_EXISTING_TIMER_OFF:
      return Object.assign({}, state, { isEditingExistingTimer: false })
    case START_TIMER_COUNTDOWN:
      const { endTime } = action.payload
      return { ...state, currentTimer: {
        ...state.currentTimer,
        endTime
      }, isTimerRunning: true }
    case STOP_TIMER_COUNTDOWN:
      return { ...state, isTimerRunning: false }
    case TIMER_COMPLETE:
      return { ...state, isTimerRunning: false, isTimerComplete: true }
    case RESET_TIMER:
      return { ...state, isTimerRunning: false, isEditing: false, isTimerComplete: false }
    case SET_SELECTED_TIMER_DETAILS:
      const { title, hours, minutes } = action.payload
      return { ...state, currentTimer: { title, hours, minutes } }
    case LOGOUT_SUCCESS:
      return { ...state, currentTimer: null }
    case SET_MINUTES_USER:
      return { ...state, defaultTime: { ...state.defaultTime, minutes: action.payload } }
    case SET_HOUR_USER:
      return { ...state, defaultTime: { ...state.defaultTime, hours: action.payload } }
    default:
      return state
  }
}
