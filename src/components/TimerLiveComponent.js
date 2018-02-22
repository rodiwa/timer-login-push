import React from 'react'
import { View, Text, Stylesheet } from 'react-native'
import moment from 'moment';
import preciseDiff from 'moment-precise-range-plugin'

export default class TimerLiveComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hours: '',
      minutes: ''
    }
  }

  componentDidMount () {
    const { hours, minutes, title } = this.props.currentTimer
    this.setState({
      hours, minutes, title
    })
    this.startTicker()
  }

  componentWillUnmount () {
    this.updateTimeInInterval && clearInterval(this.updateTimeInInterval)
    this.updateTimeInInterval = false
  }

  startTicker () {
    const interval = 1000 * 60 * 0.5

    const endTime = moment(this.props.currentTimer.endTime)
    let nowTime

    this.updateTimeInInterval = setInterval(()=>{
      nowTime = moment()
      const { hours, minutes } = nowTime.preciseDiff(endTime, true)
      this.setState({
        hours,
        minutes
      })
      console.log('set time?')
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