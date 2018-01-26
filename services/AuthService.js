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

  async signOut(navigate) {
    // const signOut = await Expo.signOut() // TODO: expo doesnt have explicit api to logout
    navigate('Guest')
  }
}

export default new AuthService()