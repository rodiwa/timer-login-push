import React from 'react'
import { connect } from 'react-redux'
import {
  View, Text, Button
} from 'react-native'
import { commonStyles } from '../common/styles'
import { logoutAction } from '../actions/LoginActions'

class LogoutScreen extends React.Component {
  render () {
    const { navigate } = this.props.navigation

    return (
      <View style={commonStyles.view}>
        <Text>Just checking! You DO wanna log out, right?</Text>
        <Button
          title='Yep, log me out'
          onPress={()=>{this.props.logoutAction(navigate)}}
        />
        <Button
          title='Nope, my bad'
          onPress={()=>{navigate('User')}}
        />
      </View>
    ) 
  }
}

export default connect(null, { logoutAction })(LogoutScreen)