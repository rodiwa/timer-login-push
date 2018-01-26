import Expo from 'expo'
import { GOOGLE_CLIENT } from '../constants/app/Auth'

class AuthService {
  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: GOOGLE_CLIENT.ANDROID,
        iosClientId: GOOGLE_CLIENT.IOS,
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        return result
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }

  async signOut() {
    // TODO:  logout button can be implemented only after success login
    // sign out using expo
    // goto landing screen
  }
}

export default new AuthService()