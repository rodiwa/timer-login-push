import React from 'react'
import { View, Text, Stylesheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { padStart } from 'lodash'
import preciseDiff from 'moment-precise-range-plugin'
import { timerCompleteAction } from '../actions/AppActions'
import { Notifications } from 'expo'
import { commonStyles } from '../common/styles'

const PUSH_CONFIG_OPTS = {
  title: 'Countdown Timer Thingie',
  body: 'Your time(r) is up!',
  ios: {
    sound: true
  },
  android: {
    sound: true,
    vibrate: true
  }
}

class TimerLiveComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hours: '',
      minutes: ''
    }
  }

  componentDidMount () {
    // disable any previous PUSH instances, because we are now on the app itself. no push notif to be shown when app is active. <--- 1
    Notifications.cancelAllScheduledNotificationsAsync()
    this.startTicker()
  }

  // TODO: might need to ask iOS user for permission for PUSH. Not tried. Will cross that bridge when we get there.
  // https://medium.com/@Laurens_Lang/local-notifications-in-expo-867e2af1ca97
  // async componentDidMount() {
  //   let result = await   
  //   Permissions.askAsync(Permissions.NOTIFICATIONS);
  //   if (Constants.lisDevice && resut.status === ‘granted’) {
  //    console.log(‘Notification permissions granted.’)
  //   }
  // }

  componentWillUnmount () {
    this.clearTimerIntervals()
  }

  clearTimerIntervals () {
    this.updateTimeInInterval && clearInterval(this.updateTimeInInterval)
    this.updateTimeInInterval = false
  }

  checkIfTimerIsComplete (endTime) {
    if (moment() > endTime) {
      this.clearTimerIntervals()

      // disable any scheduled PUSH notif as timer is now up <--- 1
      Notifications.cancelAllScheduledNotificationsAsync()

      return this.props.timerCompleteAction()
    }
  }

  startTicker () {
    const interval = 1000 * 60 * 0.5

    const endTime = moment(this.props.currentTimer.endTime)
    this.checkIfTimerIsComplete(endTime)

    // schedule new PUSH notif with updated endTime <---- 2
    Notifications.scheduleLocalNotificationAsync(PUSH_CONFIG_OPTS, {
      time: new Date(endTime.format())
    })

    // add event listener for local notifications, so we can clearEventListeners <--- 3 TODO: needed? add for performance?

    let nowTime

    const { title } = this.props.currentTimer
    let { hours, minutes } = moment().preciseDiff(endTime, true)
    hours = padStart(hours, 2, '0')
    minutes = padStart(minutes, 2, '0')

    this.setState({
      hours, minutes, title
    })

    this.updateTimeInInterval = setInterval(()=>{
      this.checkIfTimerIsComplete(endTime)

      nowTime = moment()
      let { hours, minutes } = nowTime.preciseDiff(endTime, true)
      hours = padStart(hours, 2, '0')
      minutes = padStart(minutes, 2, '0')
      
      this.setState({
        hours,
        minutes
      })
    }, interval)
  }

  showTime () {
    const { hours, minutes } = this.state
    return `${hours}:${minutes}`
  }

  showTimerEndTime () {
    const { endTime } = this.props.currentTimer
    if (endTime) {
      return `Timer ends at ${moment(endTime).format('HH:mm A')}`
    }

    return null
  }

  render () {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <Text style={commonStyles.clockTextRunning}>{ this.showTime() }</Text>
        <Text> { this.showTimerEndTime() } </Text>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    timerCompleteAction: bindActionCreators(timerCompleteAction, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(TimerLiveComponent)
