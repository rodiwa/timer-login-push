import Expo from 'expo'
import { LOGIN_ACTIONS } from './types'
import { GOOGLE_CLIENT } from '../constants/app/Auth'
import DatabaseService from '../services/DatabaseService.js'
import { NavigationActions } from 'react-navigation'
import { gotoUserLandingPageAction, gotoGuestLandingPageAction } from './NavActions'

const {
  LOGIN_GOOGLE_ATTEMPT,
  LOGIN_FACEBOOK_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_CANCEL,
  LOGOUT_ATTEMPT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} = LOGIN_ACTIONS

export const loginGoogleAction = navigate => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_GOOGLE_ATTEMPT })
      const result = await Expo.Google.logInAsync({
        androidClientId: GOOGLE_CLIENT.ANDROID,
        iosClientId: GOOGLE_CLIENT.IOS,
        scopes: ['profile', 'email']
      })
      if (result.type === 'success') {
        const { user } = result

        const userData = await DatabaseService.getUserDetailsPromise(user)
        if (!userData) {
          await DatabaseService.addNewuser(user)
        }
        dispatch({ type: LOGIN_SUCCESS, payload: { user, userData } })
        dispatch(gotoUserLandingPageAction(userData))        
      } else if (result.type === 'cancelled') {
        dispatch({ type: LOGIN_CANCEL })
        dispatch(gotoGuestandingPageAction())
      }
    } catch (e) {
      console.log(e)
      dispatch({ type: LOGIN_CANCEL })
      dispatch(gotoGuestandingPageAction())
    }
  }
}

export const logoutAction = navigate => {
  return dispatch => {
    dispatch({ type: LOGOUT_ATTEMPT })
    dispatch(gotoGuestLandingPageAction())
    dispatch({ type: LOGOUT_SUCCESS })
  }
}