import React from 'react'
import {
  View, Text, StyleSheet, Button
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { commonStyles } from '../common/styles'
import { cancelAddTimerAction } from '../actions/AppActions'

class TimerScreen extends React.Component {
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
    const { isEditing } = this.props.app

    if (isEditing) {
      return (
        <View>
          <Button title="Add" onPress={()=>null} />
          <Button title="Cancel" onPress={()=>this.props.cancelAddTimerAction()} />
        </View>
      )
    }

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

const mapDispatchToProps = dispatch => {
  return {
    cancelAddTimerAction: bindActionCreators(cancelAddTimerAction, dispatch)
  }
}

const mapStateToProps = state => {
  return { app: state.app }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerScreen)