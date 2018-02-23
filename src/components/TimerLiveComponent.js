import React from 'react'
import { View, Text, Stylesheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { padStart } from 'lodash'
import preciseDiff from 'moment-precise-range-plugin'
import { timerCompleteAction } from '../actions/AppActions'

class TimerLiveComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hours: '',
      minutes: ''
    }
  }

  componentDidMount () {
    this.startTicker()
  }

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
      return this.props.timerCompleteAction()
    }
  }

  startTicker () {
    const interval = 1000 * 60 * 0.5

    const endTime = moment(this.props.currentTimer.endTime)

    this.checkIfTimerIsComplete(endTime)

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

  render () {
    return (
      <View>
        <Text>{ this.showTime() }</Text>
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
