import { StackNavigator } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'
import DriverSignupScreen from '../Containers/DriverSignupScreen'
import ChatScreen from '../Containers/ChatScreen'
import FeedbackScreen from '../Containers/FeedbackScreen'
import ConnectScreen from '../Containers/ConnectScreen'
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
    headerTitleStyle: { fontFamily: 'Avenir-Black' },
    headerBackTitleStyle: { fontFamily: 'Avenir-Book' }
  }
})

export default PrimaryNav
