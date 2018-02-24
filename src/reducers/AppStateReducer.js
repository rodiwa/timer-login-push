import { APP_ACTIONS } from '../actions/types'
import { LOGIN_ACTIONS } from '../actions/types'

const INITIAL_STATE = {
  isEditing: false,
  isTimerRunning: false,
  isTimerComplete: false
}

export const AppStateReducer = (state=INITIAL_STATE, action) => {
  const {
    EDIT_MODE_ON, 
    EDIT_MODE_OFF, /* ADD_NEW_TIMER_TO_LIST */
    START_TIMER_COUNTDOWN,
    STOP_TIMER_COUNTDOWN,
    TIMER_COMPLETE,
    SET_SELECTED_TIMER_DETAILS,
    RESET_TIMER } = APP_ACTIONS

    const { LOGOUT_SUCCESS } = LOGIN_ACTIONS

  switch (action.type) {
    case EDIT_MODE_ON:
      return Object.assign({}, state, { isEditing: true })
    case EDIT_MODE_OFF:
      return Object.assign({}, state, { isEditing: false })
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
      console.log('asd')
      return { ...state, currentTimer: null }
    default:
      return state
  }
}
