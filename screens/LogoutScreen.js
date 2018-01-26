import React from 'react'
import {
  View, Text, Button
} from 'react-native'
import { commonStyles } from '../common/styles'
import AuthService from '../services/AuthService';

export default class LogoutScreen extends React.Component {
  render () {
    const { navigate } = this.props.navigation

    return (
      <View style={commonStyles.view}>
        <Text>Just checking! You DO wanna log out, right?</Text>
        <Button
          title='Yep, log me out'
          onPress={()=>{AuthService.signOut(navigate)}} // TODO: logout using LoginServices
        />
        <Button
          title='Nope, my bad'
          onPress={()=>{navigate('User')}}
        />
      </View>
    ) 
  }
}
