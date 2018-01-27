import * as firebase from 'firebase'

class DatabaseService {
  constructor () {
    loggedInUser = null
  }

  initialize () {
    const config = {
      apiKey: "AIzaSyCI2JcDVWdef625AtkMiZBYrwkKTIIMoRE",
      authDomain: "countdown-timer-signin-jan.firebaseapp.com",
      databaseURL: "https://countdown-timer-signin-jan.firebaseio.com",
      projectId: "countdown-timer-signin-jan",
      storageBucket: "countdown-timer-signin-jan.appspot.com",
      messagingSenderId: "57266899333"
    };

    firebase.initializeApp(config)

    firebase.auth().onAuthStateChanged = (user) => {
      if (user) {
        console.log('User logged in')        
      } else {
        console.log('User NOT logged in')
      }
    }
  }

  async addNewuser (userId) {
    await firebase.database().ref(`users/${userId}`).set({
      list: {},
      isTimerRunning: false,
      isTimerComplete: false,
      hasUserStoppedTimer: false
    })
  }

  isUserAlreadyExists () {

  }

  async getUserDetails (user) {
    const { id } = user
    this.loggedInUser = user // cached user details

    await firebase.database().ref(`users/${id}789`).on('value', snapshot => {
      const userDetails = snapshot.val()
      if (!userDetails) {
        return this.addNewuser(`${user.id}789`)
      }

      // console.log('sss')
      // console.log(userDetails)
      return userDetails
    })
  }
}

export default new DatabaseService()