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

  showTimerTitle () {
    const { params } = this.props.navigation.state

    if (params) {
      return <Text> {params.title} </Text>
    }
  }

  showTimerHHMM = () => {
    const { params } = this.props.navigation.state
    let { hh, mm } = this.state

    if (params) {
      hh = params.hh,
      mm = params.mm
    }
    
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
        { this.showTimerTitle() }
        { this.showTimerHHMM() }
        { this.showButton() }
      </View>
    )
  }
}