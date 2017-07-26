import { StackNavigator } from 'react-navigation'
import HomeScreen from '../Screens/HomeScreen'
import DriverSignupScreen from '../Screens/DriverSignupScreen'
import ChatScreen from '../Screens/ChatScreen'
import FeedbackScreen from '../Screens/FeedbackScreen'
import ConnectScreen from '../Screens/ConnectScreen'
import Drawer from '../Containers/Drawer'
import { StyleSheet } from 'react-native'
import { Colors } from '../Themes/'

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.acnavy
  }
})

const PrimaryNav = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  DriverSignupScreen: { screen: DriverSignupScreen },
  ChatScreen: { screen: ChatScreen },
  FeedbackScreen: { screen: FeedbackScreen },
  ConnectScreen: { screen: ConnectScreen },
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

export default PrimaryNav
