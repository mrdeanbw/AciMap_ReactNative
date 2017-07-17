import { StackNavigator } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'
import DriverSignupScreen from '../Containers/DriverSignupScreen'
import { StyleSheet } from 'react-native'
import { Colors } from '../Themes/'

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.acnavy
  }
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  DriverSignupScreen: { screen: DriverSignupScreen }
}, {
  // Default config for all screens
  // headerMode: 'none',
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    headerStyle: styles.header,
    headerTintColor: 'white',
    headerTitleStyle: { fontFamily: 'Avenir-Black' },
    headerBackTitleStyle: { fontFamily: 'Avenir-Book' }
  }
})

export default PrimaryNav
