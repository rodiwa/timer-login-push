import React from 'react'
import moment from 'moment'
import {
  View, Text, StyleSheet, Button, TextInput, Platform
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { commonStyles } from '../common/styles'
import TimerLiveComponent from '../components/TimerLiveComponent'
import TimePickerIos from '../components/TimePickerIos'
import TimePickerAndroid from '../components/TimePickerAndroid'
import {
  cancelAddTimerAction,
  saveNewTimerAction,
  startTimerAction,
  stopTimerAction,
  userClicksOkOnTimerCompleteAction,
  guestClicksOkOnTimerCompleteAction,
  updateHourByUserAction,
  updateMinuteByUserAction } from '../actions/AppActions'

class TimerScreen extends React.Component {
  state = {
    hours: '04',
    minutes: '20',
  }

  toggleTimer = () => {
    const { startTimerAction, stopTimerAction } = this.props
    const { isTimerRunning, currentTimer } = this.props.app
    const { hours, minutes } = currentTimer
    isTimerRunning? stopTimerAction() : startTimerAction(hours, minutes)
  }

  showTimerTitle () {
    const { isEditing, currentTimer } = this.props.app

    if (isEditing) {
      return (
        <TextInput
          style={styles.textInput}
          placeholder="Add name of timer"
          onChangeText={(newTimerTitle) => this.setState({newTimerTitle})}
          value={this.state.text}
        />
      )
    }

    if (currentTimer) {
      return <Text> {currentTimer.title} </Text>
    }
  }

  showTimerHHMM = () => {
    const { isEditing, currentTimer, isTimerRunning, isTimerComplete } = this.props.app    

    let { hours, minutes } = currentTimer ? currentTimer : this.state

    if (isTimerComplete) {
      return (
        <Text>{'Your time(r) is up! ;)'}</Text>
      )
    }

    if (isTimerRunning) {
      return (
        <TimerLiveComponent currentTimer={currentTimer} />
      )
    }

    if (isEditing) {
      const { defaultTime } = this.props
      return (
        Platform.OS === 'ios' ?
          <TimePickerIos defaults={defaultTime} updateHourByUser={this.props.updateHourByUserAction} updateMinuteByUser={this.props.updateMinuteByUserAction} /> :
          <TimePickerIos defaults={defaultTime} updateHourByUser={this.props.updateHourByUserAction} updateMinuteByUser={this.props.updateMinuteByUserAction} />
      )
    }
    
    return (
      <Text> {`${hours}:${minutes}`} </Text>
    )
  }

  showButton = () => {
    const { isEditing, isTimerRunning, isTimerComplete } = this.props.app
    const { userClicksOkOnTimerCompleteAction, guestClicksOkOnTimerCompleteAction, isUserLoggedIn } = this.props

    if (isTimerComplete) {
      return (
        <Button
          title={'Done'}
          onPress={() => isUserLoggedIn ? userClicksOkOnTimerCompleteAction() : guestClicksOkOnTimerCompleteAction() } />
      )
    }

    if (isEditing) {
      return (
        <View>
          <Button title="Add" onPress={()=>this.props.saveNewTimerAction(this.state.newTimerTitle)} />
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
    cancelAddTimerAction: bindActionCreators(cancelAddTimerAction, dispatch),
    saveNewTimerAction: bindActionCreators(saveNewTimerAction, dispatch),
    startTimerAction: bindActionCreators(startTimerAction, dispatch),
    stopTimerAction: bindActionCreators(stopTimerAction, dispatch),
    userClicksOkOnTimerCompleteAction: bindActionCreators(userClicksOkOnTimerCompleteAction, dispatch),
    guestClicksOkOnTimerCompleteAction: bindActionCreators(guestClicksOkOnTimerCompleteAction, dispatch),
    updateHourByUserAction: bindActionCreators(updateHourByUserAction, dispatch),
    updateMinuteByUserAction: bindActionCreators(updateMinuteByUserAction, dispatch),
  }
}

const mapStateToProps = state => {
  return { app: state.app, isUserLoggedIn: state.login.isLoggedIn, defaultTime: state.app.defaultTime }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerScreen)

const styles = StyleSheet.create({
  textInput: {
    textAlign: 'center'
  }
})
