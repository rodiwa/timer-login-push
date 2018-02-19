import React from 'react'
import { StackNavigator } from 'react-navigation'

import GuestTabNavigator from './GuestTabNavigator'
import UserTabNavigator from './UserTabNavigator'
import TimerScreen from '../screens/TimerScreen'

export const RootNavigator = StackNavigator(
  {
    Guest: {
      screen: GuestTabNavigator,
    },
    User: {
      screen: UserTabNavigator
    },
    TimerScreen: {
      screen: TimerScreen
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      header: null
    }),
  }
);