import React from 'react'
import {
  View, Text, Button
} from 'react-native'
import { commonStyles } from '../common/styles'

export default class ListScreen extends React.Component {
  render () {
    return (
      <View style={commonStyles.view}>
        <Text>List item first one in list</Text>
        <Text>List item first one in list</Text>
        <Text>List item first one in list</Text>
        <Text>List item first one in list</Text>
        <Text>List item first one in list</Text>
        <Text>List item first one in list</Text>        
      </View>
    ) 
  }
}
