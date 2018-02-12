import { LOGIN_ACTIONS } from '../actions/types'

const {
  LOGIN_GOOGLE_ATTEMPT,
  LOGIN_FACEBOOK_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_CANCEL,
  LOGOUT_ATTEMPT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  ADD_NEW_TIMER_TO_LIST
} = LOGIN_ACTIONS

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoggingInOut: false,
  isLoggedInAnonymous: true,
  isLoginCancel: false,
  isLoginError: false
}

export const LoginReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_GOOGLE_ATTEMPT:
    case LOGIN_FACEBOOK_ATTEMPT:
    case LOGOUT_ATTEMPT:
      return Object.assign({}, state, { isLoggingInOut: true })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoggedIn: true, isLoggedInAnonymous: false, isLoggingInOut: false, userDetails: action.payload })
    case LOGIN_CANCEL:
      return Object.assign({}, state, { isLoginCancel: true, isLoggingInOut: false })
    case LOGIN_ERROR:
      return Object.assign({}, state, { isLoginError: true, isLoggingInOut: false })
    case LOGOUT_SUCCESS:
      // TODO: remove userDetails fromr edux state on logout
      return Object.assign({}, state, { isLoggedInAnonymous: true, isLoggedIn: false, isLoggingInOut: false, /* userDetails: null */ })
    case LOGOUT_ERROR:
      return Object.assign({}, state, { isLoggedInAnonymous: false, isLoggingInOut: false })
    case ADD_NEW_TIMER_TO_LIST: // TODO: move this to app state?
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          userData: {
            ...state.userDetails.userData,
            timers: {
              ...state.userDetails.userData.timers,
              ...action.payload
            }
          }
        }
      }
    default:
      return state    
  }
}
