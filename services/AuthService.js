import Expo from 'expo'
import { CLIENT_ID } from '../constants/app/Auth'

class AuthService {
  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: CLIENT_ID.GOOGLE.ANDROID,
        iosClientId: CLIENT_ID.GOOGLE.IOS,
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

  async signInWithFacebookAsync() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(CLIENT_ID.FACEBOOK.APP_ID, {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

  async signOut(navigate) {
    // const signOut = await Expo.signOut() // TODO: expo doesnt have explicit api to logout
    navigate('Guest')
  }
}

export default new AuthService()