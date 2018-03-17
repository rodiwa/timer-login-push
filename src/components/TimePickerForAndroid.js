import React from 'react'
import { View, Text, TimePickerAndroid, TouchableNativeFeedback } from 'react-native'
import { Button } from 'native-base'
import { padStart } from 'lodash'
import { USER_MSGS } from '../constants/Strings'

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
      const {action, hour: hours, minute: minutes} = await TimePickerAndroid.open({
        hour: parseInt(that.state.hours, 10),
        minute: parseInt(that.state.minutes, 10),
        is24Hour: true, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        hours = padStart(hours, 2, '0')
        minutes = padStart(minutes, 2, '0')
        
        that.setState({
          hours,
          minutes
        })

        that.props.updateHourByUser(hours)
        that.props.updateMinuteByUser(minutes)
      }
    } catch ({code, message}) {
      console.warn(USER_MSGS.CANNOT_OPEN_TIMEPICKER, message);
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
          <Text>{ USER_MSGS.CLICK_TO_CHANGE_TIME }</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
