import React from 'react'
import { StackNavigator } from 'react-navigation'

import GuestTabNavigator from './GuestTabNavigator'
import UserTabNavigator from './UserTabNavigator'
import ErrorScreen from '../screens/ErrorScreen'

export const RootNavigator = StackNavigator(
  {
    Guest: {
      screen: GuestTabNavigator,
    },
    User: {
      screen: UserTabNavigator
    },
    Error: {
      screen: ErrorScreen,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);