import { DrawerNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { getNavigationOptionsWithAction, getDrawerNavigationOptions, getDrawerConfig } from '../Config/NavUtils'
import NavBarItem from '../Components/NavBarItem'

import LoginScreen from '../Screens/LoginScreen'
import WelcomeScreen from '../Screens/WelcomeScreen'
import HomeScreen from '../Screens/HomeScreen'
import ChatScreen from '../Screens/ChatScreen'
import DriverSignupScreen from '../Screens/DriverSignupScreen'
import FeedbackScreen from '../Screens/FeedbackScreen'
import ConnectScreen from '../Screens/ConnectScreen'
import PermissionsScreen from '../Screens/PermissionsScreen'
import { Colors } from '../Themes/'

const getDrawerItem = navigation => (
  <NavBarItem
    iconName='bars'
    onPress={() => {
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
  PermissionsScreen: { screen: PermissionsScreen, navigationOptions: { header: null } },
  HomeScreen: { screen: HomeScreen, navigationOptions: homeNavOptions },
  DriverScreen: { screen: DriverSignupScreen, navigationOptions: userNavOptions },
  ChatScreen: { screen: ChatScreen, navigationOptions: chatNavOptions },
  FeedbackScreen: { screen: FeedbackScreen, navigationOptions: feedbackNavOptions },
  ConnectScreen: { screen: ConnectScreen, navigationOptions: connectNavOptions }
}

const Drawer = DrawerNavigator(DrawerRoutes, getDrawerConfig(300, 'left', 'LoginScreen', DrawerRoutes))

Drawer.navigationOptions = ({ navigation }) => getNavigationOptionsWithAction('Arcade City', Colors.acnavy, 'white', getDrawerItem(navigation))

export default Drawer
