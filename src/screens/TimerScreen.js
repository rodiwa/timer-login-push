import React from 'react'
import {
  View, Text, StyleSheet, Button
} from 'react-native'

import { commonStyles } from '../common/styles'

export default class TimerScreen extends React.Component {
  state = {
    isTimerRunning: false,
    hh: '04',
    mm: '20'
  }

  toggleTimer = () => this.setState({ isTimerRunning: !this.state.isTimerRunning }) // TODO: temporary

  showTime = () => {
    const { hh, mm } = this.state
    return <Text> {`${hh}:${mm}`} </Text>
  }

  showButton = () => {
    const { isTimerRunning } = this.state

    return (
      <Button
        title={ isTimerRunning ? 'Stop' : 'Start' }
        onPress={()=>this.toggleTimer()}
      />
    )
  }

  render() {
    return (
      <View style={commonStyles.view}>
        { this.showTime() }
        { this.showButton() }
      </View>
    )
  }
}