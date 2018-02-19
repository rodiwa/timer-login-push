import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View, Text, Button
} from 'react-native'
import { commonStyles } from '../common/styles'
import { NavigationActions } from 'react-navigation'

import { TIMER_MSGS } from '../constants/Strings'
import { addNewTimerAction, selectTimerFromListAction } from '../actions/AppActions'

class ListScreen extends React.Component {
  renderTimerList () {
    const { timers, selectTimerFromListAction } = this.props
    const arrTimer = []

    if (!timers) {
      return (<Text>You have not saved any timers yet!</Text>)
    }

    for (const timer in timers) {
      arrTimer.push(timers[timer])
    }

    return arrTimer.map((timerDetails, idx) =><Button key={idx} title={timerDetails.title} onPress={()=>selectTimerFromListAction(timerDetails)} />)
  }

  renderAddNewTimerBtn () {
    const { isTimerRunning } = this.props
    if (!isTimerRunning) {
      return <Button title={TIMER_MSGS.ADD_NEW} onPress={()=>this.props.addNewTimerAction()} />
    }
  }

  render () {
    return (
      <View style={commonStyles.view}>
        { this.renderTimerList() }
        { this.renderAddNewTimerBtn() }
      </View>
    ) 
  }
}

const mapStateToProps = state => {
  const { timers } = state.login.userDetails.userData
  const { isTimerRunning } = state.login.userDetails.userData
  
  // offline
  // TODO: remove offline code
  // const timers = {
  //   goHome: {
  //     hh: '10',
  //     mm: '20',
  //     title: 'Go home'
  //   },
  //   fullOfficeDay: {
  //     hh: '07',
  //     mm: '30',
  //     title: 'Full day office'
  //   },
  //   tennisTime: {
  //     hh: '02',
  //     mm: '00',
  //     title: 'Tennis time'
  //   }
  // }

  return {
    timers,
    isTimerRunning
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewTimerAction: bindActionCreators(addNewTimerAction, dispatch),
    selectTimerFromListAction: bindActionCreators(selectTimerFromListAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)