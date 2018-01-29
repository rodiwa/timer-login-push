import Expo from 'expo'
import { LOGIN_ACTIONS } from './types'
import { GOOGLE_CLIENT } from '../constants/app/Auth'

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

export const loginGoogleAction = navigate => {
  return async (dispatch) => {
    // dispatch({ type: LOGIN_GOOGLE })
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: GOOGLE_CLIENT.ANDROID,
        iosClientId: GOOGLE_CLIENT.IOS,
        scopes: ['profile', 'email']
      })
  
      if (result.type === 'success') {
        // TODO: get user details from firebase from here

        dispatch({ type: LOGIN_SUCCESS, payload: result.user })
        navigate('User')
      } else if (result.type === 'cancelled') {
        dispatch({ type: LOGIN_CANCEL })
        navigate('Guest')
      }
    } catch (e) {
      console.error(e)
      dispatch({ type: LOGIN_ERROR })
      navigate('Guest')
    }
  }
}

export const logoutAction = navigate => {
  return dispatch => {
    dispatch({ type: LOGOUT })
    navigate('Guest')
  }
}