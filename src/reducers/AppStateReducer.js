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
    SET_SELECTED_TIMER_DETAILS } = APP_ACTIONS

    const { LOGOUT_SUCCESS } = LOGIN_ACTIONS

  switch (action.type) {
    case EDIT_MODE_ON:
      return Object.assign({}, state, { isEditing: true })
    case EDIT_MODE_OFF:
      return Object.assign({}, state, { isEditing: false })
    case START_TIMER_COUNTDOWN:
      return { ...state, isTimerRunning: true }
    case STOP_TIMER_COUNTDOWN:
      return { ...state, isTimerRunning: false }
    case TIMER_COMPLETE:
      return { ...state, isTimerRunning: false, isTimerComplete: true }
    case SET_SELECTED_TIMER_DETAILS:
      const { title, hh, mm } = action.payload
      return { ...state, currentTimer: { title, hh, mm } }
    case LOGOUT_SUCCESS:
      console.log('asd')
      return { ...state, currentTimer: null }
    default:
      return state
  }
}
