import React from 'react'
import {
  View, Text, Button
} from 'react-native'
import Expo from 'expo';

import { commonStyles } from '../common/styles'
import { GOOGLE_CLIENT } from '../constants/app/Auth'
import { GOOGLE, FACEBOOK } from '../constants/Strings'

export default class LoginScreen extends React.Component {
  signInButton = (type='Email') => <Button title={type} onPress={()=>this.signInUsingSocial(type)}/>

  signInUsingSocial = type => {
    type === GOOGLE ? this.signInWithGoogleAsync() : this.signInWithFacebookAsync()
  }

  async signInWithFacebookAsync() {
    // TODO: Facebook not currently setup!
  }

  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: GOOGLE_CLIENT.ANDROID,
        iosClientId: GOOGLE_CLIENT.IOS,
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        console.log(result)
        alert('signed in using google')
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }

  render() {
    return (
      <View style={commonStyles.view}>
        <Text>Sign In</Text>
        { this.signInButton(GOOGLE) }
      </View>
    )
  }
}
