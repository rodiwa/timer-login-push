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
    const { userData, selectTimerFromListAction } = this.props
    const arrTimer = []

    if (!userData) {
      return (<Text>You have not saved any timers yet!</Text>)
    }

    const { timers } = userData
    for (const timer in timers) {
      arrTimer.push(timers[timer])
    }

    return arrTimer.map((timerDetails, idx) =><Button key={idx} title={timerDetails.title} onPress={()=>selectTimerFromListAction(timerDetails)} />)
  }

  renderAddNewTimerBtn () {
    return <Button title={TIMER_MSGS.ADD_NEW} onPress={()=>this.props.addNewTimerAction()} />
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
  const { userData } = state.login.userDetails

  return {
    userData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewTimerAction: bindActionCreators(addNewTimerAction, dispatch),
    selectTimerFromListAction: bindActionCreators(selectTimerFromListAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen)