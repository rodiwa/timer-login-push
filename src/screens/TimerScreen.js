import React from 'react'
import moment from 'moment'
import { View, StyleSheet, TextInput, Platform } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { commonStyles } from '../common/styles'
import TimerLiveComponent from '../components/TimerLiveComponent'
import TimePickerForIos from '../components/TimePickerForIos'
import TimePickerForAndroid from '../components/TimePickerForAndroid'
import { USER_MSGS } from '../constants/Strings'
import {
  cancelAddTimerAction,
  saveNewTimerAction,
  startTimerAction,
  stopTimerAction,
  onClickTimerDoneAction,
  updateHourByUserAction,
  updateMinuteByUserAction,
  editTimerAction,
  saveEditTimerAction,
  cancelEditTimerAction } from '../actions/AppActions'
import { Container, Content, Button, Body, Text } from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid"

class TimerScreen extends React.Component {
  state = {}

  toggleTimer = () => {
    const { startTimerAction, stopTimerAction, isUserLoggedIn } = this.props
    const { isTimerRunning, currentTimer, defaultTime } = this.props.app
    const { hours, minutes } = isUserLoggedIn && currentTimer && currentTimer.hours ? currentTimer : defaultTime
    isTimerRunning? stopTimerAction() : startTimerAction(hours, minutes)
  }

  showTimerTitle () {
    const { isEditing, currentTimer, isEditingExistingTimer } = this.props.app

    // TODO: show timer title only for logged in users
    if (isEditingExistingTimer) {
      return
    }

    if (isEditing) {
      return (
        <TextInput
          style={styles.textInput}
          placeholder={USER_MSGS.ADD_TIMER_TITLE_PLACEHOLDER}
          onChangeText={newTimerTitle => this.setState({ newTimerTitle })}
          value={this.state.text}
        />
      )
    }

    if (currentTimer) {
      return <Text style={ commonStyles.timerTitleStyle }> {currentTimer.title} </Text>
    }
  }

  showTimerHHMM = () => {
    const { isEditing, currentTimer, defaultTime, isTimerRunning, isTimerComplete } = this.props.app
    const { isUserLoggedIn } = this.props

    let { hours, minutes } = isUserLoggedIn && currentTimer && currentTimer.hours ? currentTimer : defaultTime

    if (isTimerComplete) {
      return (
        <Text style={commonStyles.timerUpMessageStyle}>{USER_MSGS.TIMER_COMPLETE}</Text>
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
          <TimePickerForIos defaults={defaultTime} updateHourByUser={this.props.updateHourByUserAction} updateMinuteByUser={this.props.updateMinuteByUserAction} /> :
          <TimePickerForAndroid defaults={defaultTime} updateHourByUser={this.props.updateHourByUserAction} updateMinuteByUser={this.props.updateMinuteByUserAction} />
      )
    }
    
    return (
      <Text style={commonStyles.clockText}> {`${hours}:${minutes}`} </Text>
    )
  }

  onClickCancelBtn = () => {
    const { isEditingExistingTimer } = this.props.app
    if (isEditingExistingTimer) {
      this.props.cancelEditTimerAction() // TODO: not created yet
    } else {
      this.props.cancelAddTimerAction()
    }
  }

  showStartStopButtons = () => {
    const { DONE, CANCEL, ADD_TIMER, START_TIMER, STOP_TIMER, EDIT } = USER_MSGS
    const { isEditing, isTimerRunning, isTimerComplete } = this.props.app
    const { onClickTimerDoneAction, isUserLoggedIn } = this.props

    if (isTimerComplete) {
      return (
        <View>
          <Button
            title={DONE}
            onPress={() => onClickTimerDoneAction() }>
            <Text>Done</Text>
          </Button>
        </View>
      )
    }

    if (isEditing) {
      const { isEditingExistingTimer } = this.props.app
      const btnLabel = isEditingExistingTimer ? DONE : CANCEL
      return (
        <View>
          { !isEditingExistingTimer && <Button onPress={()=>this.props.saveNewTimerAction(this.state.newTimerTitle)}><Text>{ADD_TIMER}</Text></Button> }
          { !isUserLoggedIn && <Button title={btnLabel} onPress={()=>this.onClickCancelBtn()}>
            <Text>{btnLabel}</Text>
          </Button> }
        </View>
      )
    }

    return (
      <View>
        <Button
          danger={isTimerRunning}
          success={!isTimerRunning}
          onPress={()=>this.toggleTimer()}
          >
          <Text>{ isTimerRunning ? STOP_TIMER : START_TIMER }</Text>
        </Button>
      </View>
    )
  }

  showEditDeleteButtons () {
    const { isEditing, isTimerRunning, isTimerComplete } = this.props.app
    const { isUserLoggedIn } = this.props
    return ( !isEditing && !isUserLoggedIn && !isTimerRunning && !isTimerComplete &&
      <View>
        <Button onPress={()=>this.props.editTimerAction(isUserLoggedIn)}>
          <Text>{USER_MSGS.EDIT}</Text>
        </Button>
        { isUserLoggedIn && <Button title={USER_MSGS.DELETE} onPress={()=>null} /> }
      </View>
    )
  }

  showAddTimerCancelButton () {
    const { isEditing } = this.props.app
    const { isUserLoggedIn } = this.props
    
    if (isEditing && isUserLoggedIn) {
      const { isEditingExistingTimer } = this.props.app

      return (
        <View>
          <Button onPress={()=>this.onClickCancelBtn()}>
            <Text>{USER_MSGS.CANCEL}</Text>
          </Button>
        </View>
      )
    }

    return null
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
          <Grid>
            <Row size={4} style={{ /*backgroundColor: 'pink',*/ justifyContent: 'center', alignItems: 'center'}}>
              <View>
                { this.showTimerTitle() }
                { this.showTimerHHMM() }
              </View>
            </Row>
            <Row style={{ /*backgroundColor: 'cyan',*/ justifyContent: 'center', alignItems: 'center'}}>
              { this.showStartStopButtons() }
            </Row>
            <Row style={{ /*backgroundColor: 'lightgreen',*/ justifyContent: 'center', alignItems: 'flex-start'}}>
              { this.showEditDeleteButtons() }
              { this.showAddTimerCancelButton() }
            </Row>
            <Row>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cancelAddTimerAction: bindActionCreators(cancelAddTimerAction, dispatch),
    saveNewTimerAction: bindActionCreators(saveNewTimerAction, dispatch),
    startTimerAction: bindActionCreators(startTimerAction, dispatch),
    stopTimerAction: bindActionCreators(stopTimerAction, dispatch),
    onClickTimerDoneAction: bindActionCreators(onClickTimerDoneAction, dispatch),
    updateHourByUserAction: bindActionCreators(updateHourByUserAction, dispatch),
    updateMinuteByUserAction: bindActionCreators(updateMinuteByUserAction, dispatch),
    editTimerAction: bindActionCreators(editTimerAction, dispatch),    
    saveEditTimerAction: bindActionCreators(saveEditTimerAction, dispatch),
    cancelEditTimerAction: bindActionCreators(cancelEditTimerAction, dispatch)
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
