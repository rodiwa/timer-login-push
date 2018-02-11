import { NavigationActions } from 'react-navigation'

export const gotoUserLandingPageAction = (userData) => NavigationActions.navigate({
  routeName: 'User',
  params: userData ,
  action: NavigationActions.navigate({ routeName: 'Timer' })
})

export const gotoGuestLandingPageAction = () => NavigationActions.navigate({
  routeName: 'Guest',
  action: NavigationActions.navigate({ routeName: 'Timer' })
})
