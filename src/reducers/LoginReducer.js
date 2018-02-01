import { LOGIN_ACTIONS } from '../actions/types'

const {
  LOGIN_GOOGLE,
  LOGIN_FACEBOOK,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_CANCEL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
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
    case LOGIN_GOOGLE:
    case LOGIN_FACEBOOK:
    case LOGOUT:
      return Object.assign({}, state, { isLoggingInOut: true })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoggedIn: true, isLoggedInAnonymous: false, isLoggingInOut: false, userDetails: action.payload })
    case LOGIN_CANCEL:
      return Object.assign({}, state, { isLoginCancel: true, isLoggingInOut: false })
    case LOGIN_ERROR:
      return Object.assign({}, state, { isLoginError: true, isLoggingInOut: false })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, { isLoggedInAnonymous: true, isLoggedIn: false, isLoggingInOut: false, userDetails: null })
    case LOGOUT_ERROR:
      return Object.assign({}, state, { isLoggedInAnonymous: false, isLoggingInOut: false })
    default:
      return state    
  }
}
