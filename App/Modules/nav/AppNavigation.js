import React from 'React'
import { StackNavigator } from 'react-navigation'
import Drawer from './components/Drawer'
import { StyleSheet } from 'react-native'
import { Colors } from '../../Theme/'
import LoginScreen from '../auth/screens/LoginScreen'

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.acnavy
  }
})

export const createRootNavigator = (signedIn = false) => {
  console.tron.log('in createRootNavigator with signedIn: ' + signedIn)
  // console.tron.log(user)
  let thisRoute = signedIn ? 'Drawer' : 'Login'
  console.tron.log('setting initialRouteName to be: ' + thisRoute)
  const theNav = StackNavigator({
    NewLoginScreen: { screen: LoginScreen, navigationOptions: { header: null } },
    Drawer: { screen: Drawer } // { screen: Drawer }
  }, {
    initialRouteName: thisRoute,
    navigationOptions: {
      headerStyle: styles.header,
      headerTintColor: 'white',
      headerTitleStyle: { fontFamily: 'Montserrat-Bold' },
      headerBackTitleStyle: { fontFamily: 'Montserrat-Regular' }
    }
  })
  // console.tron.log('theNav is')
  // console.tron.log(theNav)
  return theNav
}

export default PrimaryNav = StackNavigator({
    Drawer: { screen: Drawer }
  }, {
    initialRouteName: 'Drawer',
    navigationOptions: {
      headerStyle: styles.header,
      headerTintColor: 'white',
      headerTitleStyle: { fontFamily: 'Montserrat-Bold' },
      headerBackTitleStyle: { fontFamily: 'Montserrat-Regular' }
    }
  })