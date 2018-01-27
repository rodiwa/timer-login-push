import * as firebase from 'firebase'

const newUserDefaultData = {
  list: {},
  isTimerRunning: false,
  isTimerComplete: false,
  hasUserStoppedTimer: false
}

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
  }

  async addNewuser (userId) {
    await firebase.database().ref(`users/${userId}`).set(newUserDefaultData)
  }

  getUserDetails (user) {
    try {
      const { id } = user
      this.loggedInUser = user // cached user details

      firebase.database().ref(`users/${id}`).on('value', snapshot => {
        details = snapshot.val()
        if (!details) {
          this.addNewuser(`${user.id}`)
          details = newUserDefaultData
        }

        // TODO: redux action to store data to state
      })
    } catch (e) {
      // ignore
    }
  }
}

export default new DatabaseService()