import React from 'react'
import { View, Text, TimePickerAndroid, TouchableNativeFeedback } from 'react-native'
import { Button } from 'native-base'

export default class TimePickerForAndroid extends React.Component {
  state = {
    hours: '04',
    minutes: '30'
  }
  
  componentDidMount () {
    const { hours, minutes } = this.props.defaults
    this.setState({
      hours, minutes
    })
  }

  async showTimePickerForAndroid () {
    const that = this
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: parseInt(that.state.hours, 10),
        minute: parseInt(that.state.minutes, 10),
        is24Hour: true, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        
        that.setState({
          hours: hour,
          minutes: minute
        })

        that.props.updateHourByUser(hour)
        that.props.updateMinuteByUser(minute)
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }

  render () {
    return (
      <TouchableNativeFeedback
        onPress={() => {this.showTimePickerForAndroid()}} >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{ fontSize: 100 }}
          >{ `${this.state.hours}:${this.state.minutes}`  }</Text>
          <Text>{ 'Click to change time' }</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
