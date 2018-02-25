import React from 'react'
import { View, Text, Picker, StyleSheet } from 'react-native'
import { min } from 'moment';

export default class TimePickerIos extends React.Component {
  state = {
    hour: '04',
    minutes: '30'
  }

  componentWillMount () {
    const { hour, minutes } = this.props.defaults
    this.setState({
      hour, minutes
    })
  }

  updateHour = hour => {
    this.setState({ hour })
    this.props.updateHourByUser(hour)
  }

  updateMinutes = minutes => {
    this.setState({ minutes })
    this.props.updateMinuteByUser(minutes)
  }

  render () {
    return (
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker}
          selectedValue={this.state.hour}
          onValueChange={(hour, itemIndex) => this.updateHour(hour)}>
            <Picker.Item label="00" value="00" />
            <Picker.Item label="01" value="01" />
            <Picker.Item label="02" value="02" />
            <Picker.Item label="03" value="03" />
            <Picker.Item label="04" value="04" />
            <Picker.Item label="05" value="05" />
            <Picker.Item label="06" value="06" />
            <Picker.Item label="07" value="07" />
            <Picker.Item label="08" value="08" />
            <Picker.Item label="09" value="09" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
        </Picker>
        <View style={styles.text}>
          <Text> : </Text>
        </View>
        <Picker style={styles.picker}
          selectedValue={this.state.minutes}
          onValueChange={(minutes, itemIndex) => this.updateMinutes(minutes)}>
            <Picker.Item label="00" value="00" />
            <Picker.Item label="03" value="03" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="30" value="30" />
            <Picker.Item label="40" value="40" />
            <Picker.Item label="50" value="50" />
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row'
  },
  text: {
    justifyContent: 'center'
  },
  picker: {
    width: 130,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})