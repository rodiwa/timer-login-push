import { types } from '../actions/types'

const INITIAL_STATE = {
  isTimerRunning: false,
  isTimerCompleted: false,
  hasUserStoppedTimer: false,
  isAppLoading: false,
  list: []
}

export const TimerDetailsReducer = (state=INITIAL_STATE, action) => {
  const { GET_TIMER_DETAILS } = types
  const { type, payload } = action

  switch (type) {
    case GET_TIMER_DETAILS:
      return state
    default:
      return state
  }
}
