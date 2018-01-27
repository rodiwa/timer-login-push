import DatabaseService from './DatabaseService';
import AuthService from '../services/AuthService'
import { GOOGLE, FACEBOOK } from '../constants/Strings'

class LoginService {
  async signInUsingSocial(type, navigate) {
    if (type === GOOGLE) {
      const result = await AuthService.signInWithGoogleAsync()
      if (result.cancelled) {
        return this.signInCancel(navigate)
      } if (result.error) {
        return this.signInError(navigate)
      } else {
        return this.signInSuccess({ navigate, result })
      }
    }
  }

  async signInSuccess({ navigate, result }) {
    try {
      const userDetails = await DatabaseService.getUserDetails(result.user)
      navigate('User')
    } catch (e) {
      // ignore
    }
  }

  signInError(navigate) {
    navigate('Error', { type: 'LoginError' })
  }
  
  signInCancel(navigate) {
    navigate('Error', { type: 'LoginCancel' })
  }

}

export default new LoginService()