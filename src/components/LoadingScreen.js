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
import { USER_MSGS } from '../constants/Strings'
 
export const LoadingScreen = ({ customMsg }) => {
  const message = customMsg || USER_MSGS.LOADING
  return (
    <View style={styles.view}>
      <Text style={{ fontSize: 25 }}>{ message }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view : {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})