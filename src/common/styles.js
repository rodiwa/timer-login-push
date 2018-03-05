import { StyleSheet } from 'react-native'

export const commonStyles = StyleSheet.create({
  view: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  clockText: {
    fontSize: 100
  },
  timerTitleStyle: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  timerUpMessageStyle: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'green'
  }
})
