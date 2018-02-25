import * as firebase from 'firebase'
import { camelCase } from 'lodash'

const newUserDefaultData = {
  list: {},
  isTimerRunning: false,
  isTimerComplete: false,
  hasUserStoppedTimer: false
}

class DatabaseService {
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

  addNewuser (user) {
    return new Promise((resolve, reject) => {
      try {
        const { id } = user
        firebase.database().ref(`users/${id}`).set(newUserDefaultData).then(
          resolve('User added')
        )
      } catch(e) {
        reject(e)
      }
    })
  }

  saveNewTimerInList (title, time, id) {
    const camelCasedTitle = camelCase(title)
    const objTimerToSaveObj = {}
    objTimerToSaveObj[camelCasedTitle] = {
      default: false,
      hours: time.hour,
      minutes: time.minutes,
      title
    }
    return new Promise((resolve, reject) => {
      try {
        firebase.database().ref(`users/${id}/timers`).update(objTimerToSaveObj).then(
          resolve(objTimerToSaveObj)          
        )
      } catch(e) {
        reject(e)
      }
    })
  }

  getUserDetailsPromise (user) {
    return new Promise((resolve, reject) => {
      try {
        let details
        const { id } = user
        firebase.database().ref(`users/${id}`).on('value', snapshot => {
          details = snapshot.val()
          resolve(details)
        })
      } catch(e) {
        reject(e)
      }
    })
  }
}

export default new DatabaseService()