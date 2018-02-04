import { Notifications } from 'expo';
import React from 'react';
import { connect } from 'react-redux'

import { RootNavigator } from './RootNavigator'
import { LoadingScreen } from '../components/LoadingScreen'
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

class AppNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  renderMainSectionTest () {
    if (this.props.login.isLoggingInOut) {
      return <LoadingScreen />
    }

    return <RootNavigator />
  }

  render() {
    return this.renderMainSectionTest()
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(AppNavigation)