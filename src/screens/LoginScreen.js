import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View } from 'react-native'
import { Container, Content, Button, Text } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'

import { commonStyles } from '../common/styles'
import { GOOGLE } from '../constants/Strings'
import { loginGoogleAction } from '../actions/LoginActions'

class LoginScreen extends React.Component {
  signInButton = (type='Email') => {
    const {navigate} = this.props.navigation
    return (
      <Button large title={type} onPress={() => this.props.loginAction(navigate)}>
        <Text> {type} </Text>
      </Button>
    )
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
          <Grid>
            <Row style={{ /*backgroundColor: 'cyan',*/ justifyContent: 'center', alignItems: 'center'}}>
              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, marginBottom: 20 }}>Sign In</Text>
                { this.signInButton(GOOGLE) }
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: bindActionCreators(loginGoogleAction, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LoginScreen)