import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View } from 'react-native'
import { commonStyles } from '../common/styles'
import { NavigationActions } from 'react-navigation'

import { TIMER_MSGS } from '../constants/Strings'
import { addNewTimerAction, selectTimerFromListAction } from '../actions/AppActions'
import { Container, Content, Button, Body, List, ListItem, Text, Left, Right } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'

class ListScreen extends React.Component {
  renderTimerList () {
    const { userData, selectTimerFromListAction } = this.props
    const arrTimer = []

    if (!userData) {
      return (<Text style={{ fontSize: 25 }}>You have not saved any timers yet!</Text>)
    }

    const { timers } = userData
    for (const timer in timers) {
      arrTimer.push(timers[timer])
    }

    return (
      <List style={{ /*backgroundColor: 'yellow',*/ flexGrow: 1 }}>
        { arrTimer.map((timerDetails, idx) => (
          <ListItem
            style={{ paddingTop: 20, paddingBottom: 20 }}
            key={idx}
            title={timerDetails.title}
            onPress={()=>selectTimerFromListAction(timerDetails)}>
            <Left><Text style={{ fontSize: 25 }}>{timerDetails.title}</Text></Left>
            <Right><Text style={{ fontSize: 20 }}>{`${timerDetails.hours}:${timerDetails.minutes}`}</Text></Right>
          </ListItem>
         )
        )}
      </List>
    )
  }

  renderAddNewTimerBtn () {
    return <Button title={TIMER_MSGS.ADD_NEW} onPress={()=>this.props.addNewTimerAction()}><Text>{ TIMER_MSGS.ADD_NEW }</Text></Button>
  }

  render () {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
          <Grid>
            <Row size={80} style={{ /*backgroundColor: 'cyan',*/ justifyContent: 'center', alignItems: 'flex-start', alignContent: 'stretch' }}>
              <View style={{ padding: 25, flexDirection: 'row' }}>
                { this.renderTimerList() }
              </View>
            </Row>
            <Row size={20} style={{ /*backgroundColor: 'pink',*/ justifyContent: 'center', alignItems: 'center' }}>
              <View>
                { this.renderAddNewTimerBtn() }
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
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