import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View, Text, Button
} from 'react-native'

import { commonStyles } from '../common/styles'
import { GOOGLE } from '../constants/Strings'
import { loginGoogleAction } from '../actions/LoginActions'

class LoginScreen extends React.Component {
  signInButton = (type='Email') => {
    const {navigate} = this.props.navigation
    return (
      <Button title={type} onPress={() => this.props.loginAction(navigate)}/>
    )
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

const mapDispatchToProps = dispatch => {
  return {
    loginAction: bindActionCreators(loginGoogleAction, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LoginScreen)