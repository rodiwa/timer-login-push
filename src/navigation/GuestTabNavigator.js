import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';
import { tabBarOptions } from '../common/styles'

import TimerScreen from '../screens/TimerScreen'
import LoginScreen from '../screens/LoginScreen'

export default TabNavigator(
  {
    Timer: {
      screen: TimerScreen,
    },
    Login: {
      screen: LoginScreen,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerMode: 'screen',
      swipeEnabled: true,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Timer':
            iconName =
              Platform.OS === 'ios'
                ? `ios-timer${focused ? '' : '-outline'}`
                : 'md-alarm';
            break;
          case 'Login':
            iconName = Platform.OS === 'ios' ? `ios-contact${focused ? '' : '-outline'}` : 'md-contact';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={36}
            style={{ marginBottom: -3 }}
            color={focused ? 'red' : 'grey'}
          />
        );
      },
    }),
    tabBarOptions,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
