import React from 'react'
import {
  View, Text, Button
} from 'react-native'

import { commonStyles } from '../common/styles'
import { GOOGLE, FACEBOOK } from '../constants/Strings'
import LoginService from '../services/LoginService'

export default class LoginScreen extends React.Component {
  signInButton = (type='Email') => <Button title={type} onPress={()=>LoginService.signInUsingSocial(type, this.props.navigation.navigate)}/>

  render() {
    return (
      <View style={commonStyles.view}>
        <Text>Sign In</Text>
        { this.signInButton(GOOGLE) }
      </View>
    )
  }
}
