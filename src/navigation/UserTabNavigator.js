import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

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
    navigationOptions: ({ navigation }) => ({
      headerMode: 'screen',
      iniinitialRouteName: 'Timer', // TODO: not working
      swipeEnabled: true,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'List':
            iconName = Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-list';
            break;
          case 'Timer':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'Logout':
            iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
