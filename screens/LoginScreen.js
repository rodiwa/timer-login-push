import React from 'react'
import {
  View, Text, Button
} from 'react-native'

import { commonStyles } from '../common/styles'

export default class LoginScreen extends React.Component {
  signInButton = (type='Email') => <Button title={type} />
  render() {
    return (
      <View style={commonStyles.view}>
        <Text>Sign In</Text>
        { this.signInButton('Google') }
        { this.signInButton('Facebook') }
      </View>
    )
  }
}