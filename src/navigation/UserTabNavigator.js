import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';
import { tabBarOptions } from '../common/styles'

import ListScreen from '../screens/ListScreen'
import TimerScreen from '../screens/TimerScreen'
import LogoutScreen from '../screens/LogoutScreen'

export default TabNavigator(
  {
    List: {
      screen: ListScreen,
    },
    Timer: {
      screen: TimerScreen
    },
    Logout: {
      screen: LogoutScreen,
    }
  },
  {
    showLabel: false,
    navigationOptions: ({ navigation }) => ({
      headerMode: 'screen',
      activeTintColor: '#ccc',
      swipeEnabled: true,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'List':
            iconName = Platform.OS === 'ios' ? `ios-list${focused ? '-box' : ''}` : 'md-list';
            break;
          case 'Timer':
            iconName =
              Platform.OS === 'ios'
                ? `ios-timer${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'Logout':
            iconName = Platform.OS === 'ios' ? `ios-settings${focused ? '' : '-outline'}` : 'md-link';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={42}
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
