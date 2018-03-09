import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Container, Content, Button, Text, Thumbnail } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { commonStyles } from '../common/styles'
import { logoutAction } from '../actions/LoginActions'

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
                <Text style={{ fontSize: 25, textAlign: 'center' }}>Sure you logging out?</Text>
              </View>
            </Row>
            <Row style={{ /*backgroundColor: 'cyan',*/ justifyContent: 'center', alignItems: 'center'}}>
              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Button
                  title='Yep, log me out'
                  onPress={()=>{this.props.logoutAction()}}
                ><Text>{'Yep, log out!'}</Text></Button>
              </View>
            </Row>
            <Row style={{ /*backgroundColor: 'cyan',*/ justifyContent: 'center', alignItems: 'flex-start'}}>
              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Button
                  title='Nope, my bad'
                  onPress={()=>{this.props.navigation.goBack()}}
                ><Text>{'Nope, my bad'}</Text></Button>
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
    ) 
  }
}

export default connect(null, { logoutAction })(LogoutScreen)
