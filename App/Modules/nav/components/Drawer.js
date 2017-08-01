import { DrawerNavigator } from 'react-navigation'
import { Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { getNavigationOptionsWithAction, getDrawerNavigationOptions, getDrawerConfig } from '../NavUtils'
import NavBarItem from './NavBarItem'

import LoginScreen from '../../auth/screens/LoginScreen'
import WelcomeScreen from '../../comms/screens/WelcomeScreen'
import FeedbackScreen from '../../comms/screens/FeedbackScreen'
import ConnectScreen from '../../comms/screens/ConnectScreen'
import HomeScreen from '../../ride/screens/HomeScreen'
import ChatScreen from '../../chat/screens/ChatScreen'
import DriverSignupScreen from '../../drive/screens/DriverSignupScreen'
import { Colors } from '../../../Theme/'

const getDrawerItem = navigation => (
  <NavBarItem
    iconName='bars'
    onPress={() => {
      Keyboard.dismiss()
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }}
  />
)

const getDrawerIcon = (iconName, tintColor) => <Icon name={iconName} size={20} color={tintColor} />

const homeDrawerIcon = ({ tintColor }) => getDrawerIcon('map-o', tintColor)
const userDrawerIcon = ({ tintColor }) => getDrawerIcon('car', tintColor)
const feedbackDrawerIcon = ({ tintColor }) => getDrawerIcon('bullhorn', tintColor)

const homeNavOptions = getDrawerNavigationOptions('Arcade City', Colors.acnavy, 'white', homeDrawerIcon)
const userNavOptions = getDrawerNavigationOptions('Driver Signup', Colors.acnavy, 'white', userDrawerIcon)
const feedbackNavOptions = getDrawerNavigationOptions('Feedback', Colors.acnavy, 'white', feedbackDrawerIcon)
const chatNavOptions = getDrawerNavigationOptions('Chat', Colors.acnavy, 'white', feedbackDrawerIcon)
const connectNavOptions = getDrawerNavigationOptions('Connect', Colors.acnavy, 'white', feedbackDrawerIcon)

const DrawerRoutes = {
  LoginScreen: { screen: LoginScreen, navigationOptions: { header: null } },
  WelcomeScreen: { screen: WelcomeScreen, navigationOptions: { header: null } },
  HomeScreen: { screen: HomeScreen, navigationOptions: homeNavOptions },
  DriverSignupScreen: { screen: DriverSignupScreen, navigationOptions: userNavOptions },
  ChatScreen: { screen: ChatScreen, navigationOptions: chatNavOptions },
  FeedbackScreen: { screen: FeedbackScreen, navigationOptions: feedbackNavOptions },
  ConnectScreen: { screen: ConnectScreen, navigationOptions: connectNavOptions }
}

const Drawer = DrawerNavigator(DrawerRoutes, getDrawerConfig(300, 'left', 'LoginScreen', DrawerRoutes))

Drawer.navigationOptions = ({ navigation }) => getNavigationOptionsWithAction('Arcade City', Colors.acnavy, 'white', getDrawerItem(navigation))

export default Drawer
