class LoginService {
  signInSuccess({ navigate, result }) {
    navigate('User', result)
  }

  signInError(navigate) {
    navigate('Error', { type: 'LoginError' })
  }
  
  signInCancel(navigate) {
    navigate('Error', { type: 'LoginCancel' })
  }

}

export default new LoginService()