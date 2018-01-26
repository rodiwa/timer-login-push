class LoginService {
  signInSuccess({ navigate, result }) {
    // TODO
    navigate('Error', { type: 'LoginSuccess' })
  }

  signInError(navigate) {
    navigate('Error', { type: 'LoginError' })
  }
  
  signInCancel(navigate) {
    navigate('Error', { type: 'LoginCancel' })
  }

}

export default new LoginService()