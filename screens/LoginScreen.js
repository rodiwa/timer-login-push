import React from 'react'
import {
  View, Text, Button
} from 'react-native'

import { commonStyles } from '../common/styles'
import { GOOGLE, FACEBOOK } from '../constants/Strings'
import AuthService from '../services/AuthService'

export default class LoginScreen extends React.Component {
  signInButton = (type='Email') => <Button title={type} onPress={()=>this.signInUsingSocial(type)}/>

  signInUsingSocial = type => {
    type === GOOGLE ? AuthService.signInWithGoogleAsync() : this.signInWithFacebookAsync()
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
