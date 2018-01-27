import DatabseService from './DatabaseService'
import DatabaseService from './DatabaseService';

class LoginService {
  async signInSuccess({ navigate, result }) {
    // add userid result.user.id to firebase db if new user
    const userDetails = await DatabaseService.getUserDetails(result.user)
    // console.log('aa')
    // console.log(userDetails)
    // or

    // get saved details from firebase for that id and send for navigation

    navigate('User', userDetails)
  }

  signInError(navigate) {
    navigate('Error', { type: 'LoginError' })
  }
  
  signInCancel(navigate) {
    navigate('Error', { type: 'LoginCancel' })
  }

}

export default new LoginService()