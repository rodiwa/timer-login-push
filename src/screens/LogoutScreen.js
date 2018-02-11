import React from 'react'
import { connect } from 'react-redux'
import {
  View, Text, Button
} from 'react-native'
import { commonStyles } from '../common/styles'
import { logoutAction } from '../actions/LoginActions'

class LogoutScreen extends React.Component {
  render () {
    return (
      <View style={commonStyles.view}>
        <Text>Just checking! You DO wanna log out, right?</Text>
        <Button
          title='Yep, log me out'
          onPress={()=>{this.props.logoutAction()}}
        />
        <Button
          title='Nope, my bad'
          onPress={()=>{this.props.navigation.goBack()}}
        />
      </View>
    ) 
  }
}

export default connect(null, { logoutAction })(LogoutScreen)
