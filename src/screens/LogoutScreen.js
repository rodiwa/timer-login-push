import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Container, Content, Button, Text, Thumbnail } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { commonStyles } from '../common/styles'
import { logoutAction } from '../actions/LoginActions'
import { USER_MSGS } from '../constants/Strings'

class LogoutScreen extends React.Component {
  render () {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
          <Grid>
            <Row size={2}>
              <View>
                <Thumbnail large source={{uri: '../'}} />
              </View>
            </Row>
            <Row style={{ /*backgroundColor: 'cyan',*/ justifyContent: 'center', alignItems: 'flex-end'}}>
              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, textAlign: 'center' }}>{ USER_MSGS.CONFIRM_LOGOUT }</Text>
              </View>
            </Row>
            <Row style={{ /*backgroundColor: 'cyan',*/ justifyContent: 'center', alignItems: 'center'}}>
              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Button
                  onPress={()=>{this.props.logoutAction()}}
                ><Text>{ USER_MSGS.YES_LOGOUT }</Text></Button>
              </View>
            </Row>
            <Row style={{ /*backgroundColor: 'cyan',*/ justifyContent: 'center', alignItems: 'flex-start'}}>
              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Button
                  onPress={()=>{this.props.navigation.goBack()}}
                ><Text>{ USER_MSGS.NO_LOGOUT }</Text></Button>
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
    ) 
  }
}

export default connect(null, { logoutAction })(LogoutScreen)
