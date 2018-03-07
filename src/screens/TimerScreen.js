import React from 'react'
import moment from 'moment'
import { View, StyleSheet, TextInput, Platform } from 'react-native'
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
    const { hours, minutes } = isUserLoggedIn ? currentTimer : defaultTime
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
          placeholder="Add name of timer"
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

    let { hours, minutes } = isUserLoggedIn ? currentTimer : defaultTime

    if (isTimerComplete) {
      return (
        <Text style={commonStyles.timerUpMessageStyle}>{'Your time(r) is up! ;)'}</Text>
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
    const { isEditing, isTimerRunning, isTimerComplete } = this.props.app
    const { onClickTimerDoneAction, isUserLoggedIn } = this.props

    if (isTimerComplete) {
      return (
        <View>
          <Button
            large
            title={'Done'}
            onPress={() => onClickTimerDoneAction() }>
            <Text>Done</Text>
          </Button>
        </View>
      )
    }

    if (isEditing) {
      const { isEditingExistingTimer } = this.props.app
      const btnLabel = isEditingExistingTimer ? 'Done' : 'Cancel'
      return (
        <View>
          { !isEditingExistingTimer && <Button large title='Add' onPress={()=>this.props.saveNewTimerAction(this.state.newTimerTitle)}><Text>{'Add Timer'}</Text></Button> }
          { !isUserLoggedIn && <Button large title={btnLabel} onPress={()=>this.onClickCancelBtn()}>
            <Text>{btnLabel}</Text>
          </Button> }
        </View>
      )
    }

    return (
      <View>
        <Button
          large
          onPress={()=>this.toggleTimer()}
          >
          <Text>{ isTimerRunning ? 'Stop' : 'Start' }</Text>
        </Button>
      </View>
    )
  }

  showEditDeleteButtons () {
    const { isEditing, isTimerRunning, isTimerComplete } = this.props.app
    const { isUserLoggedIn } = this.props
    return ( !isEditing && !isUserLoggedIn && !isTimerRunning && !isTimerComplete &&
      <View>
        <Button large title="Edit" onPress={()=>this.props.editTimerAction(isUserLoggedIn)}>
          <Text>Edit</Text>
        </Button>
        { isUserLoggedIn && <Button large title="Delete" onPress={()=>null} /> }
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
          <Button large onPress={()=>this.onClickCancelBtn()}>
            <Text>{'Cancel'}</Text>
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
