import React from 'react'
import {
  View, Text, Button
} from 'react-native'
import { commonStyles } from '../common/styles'
import { LOGIN_MSGS } from '../constants/Strings'

export default class ErrorScreen extends React.Component {
  showErrorMessage () {
    const { params } = this.props.navigation.state
    const { ERROR, ERROR_MSG, CANCEL_MSG } = LOGIN_MSGS

    return (
      params === ERROR ? ERROR_MSG : CANCEL_MSG
    )
  }

  render () {
    return (
      <View style={commonStyles.view}>
        <Text>{ this.showErrorMessage() }</Text>
        <Button 
          title='Main Screen'
          onPress={()=>this.props.navigation.navigate('Guest')}
        />
      </View>
    ) 
  }
}
