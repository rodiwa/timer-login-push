import React from 'react'
import {
  View, Text, Button
} from 'react-native'

import { commonStyles } from '../common/styles'
import { GOOGLE, FACEBOOK } from '../constants/Strings'
import AuthService from '../services/AuthService'
import LoginService from '../services/LoginService'

export default class LoginScreen extends React.Component {
  signInButton = (type='Email') => <Button title={type} onPress={()=>this.signInUsingSocial(type)}/>

  async signInUsingSocial(type) {
    const { navigate } = this.props.navigation

    if (type === GOOGLE) {
      const result = await AuthService.signInWithGoogleAsync()
      if (result.cancelled) {
        LoginService.signInCancel(navigate)
      } if (result.error) {
        LoginService.signInError(navigate)
      } else {
        LoginService.signInSuccess({ navigate, result })
      }
    }
  }

  async signInWithFacebookAsync() {
    // TODO: Facebook not currently setup!
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
