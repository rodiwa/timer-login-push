/**
 * Loading screen during async call w custom message
 */

import React from 'react'
import {
View,
Text,
StyleSheet
} from 'react-native'
import MonoText from './StyledText'
import { LOADING_MSG } from '../constants/Strings'
 
export const LoadingScreen = ({ customMsg }) => {
  const message = customMsg || LOADING_MSG
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{ message }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view : {
    backgroundColor: '#333',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white'
  }
})