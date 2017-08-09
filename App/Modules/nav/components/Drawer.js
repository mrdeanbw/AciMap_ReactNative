import { DrawerNavigator } from 'react-navigation'
import { Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { getNavigationOptionsWithAction, getDrawerNavigationOptions, getDrawerConfig } from '../NavUtils'
import NavBarItem from './NavBarItem'

// import LoginScreen from '../../auth/screens/LoginScreen'
import HomeScreen from '../../auth/screens/HomeScreen'
import WelcomeScreen from '../../comms/screens/WelcomeScreen'
import FeedbackScreen from '../../comms/screens/FeedbackScreen'
import ConnectScreen from '../../comms/screens/ConnectScreen'
import ChatScreen from '../../chat/screens/ChatScreen'
import DriverSignupScreen from '../../drive/screens/DriverSignupScreen'
import EditDriverProfileScreen from '../../drive/screens/EditDriverProfileScreen'
import NewRequestScreen from '../../request/screens/NewRequestScreen'
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
const editDriverProfileOptions = getDrawerNavigationOptions('Edit Profile', Colors.acnavy, 'white', userDrawerIcon)
const feedbackNavOptions = getDrawerNavigationOptions('Feedback', Colors.acnavy, 'white', feedbackDrawerIcon)
const chatNavOptions = getDrawerNavigationOptions('Chat', Colors.acnavy, 'white', feedbackDrawerIcon)
const connectNavOptions = getDrawerNavigationOptions('Connect', Colors.acnavy, 'white', feedbackDrawerIcon)
const newRequestNavOptions = getDrawerNavigationOptions('New Request', Colors.acnavy, 'white', userDrawerIcon)

const DrawerRoutes = {
  // LoginScreen: { screen: LoginScreen, navigationOptions: { header: null } },
  HomeScreen: { screen: HomeScreen, navigationOptions: homeNavOptions },
  WelcomeScreen: { screen: WelcomeScreen, navigationOptions: { header: null } },
  DriverSignupScreen: { screen: DriverSignupScreen, navigationOptions: userNavOptions },
  EditDriverProfileScreen: { screen: EditDriverProfileScreen, navigationOptions: editDriverProfileOptions },
  ChatScreen: { screen: ChatScreen, navigationOptions: chatNavOptions },
  FeedbackScreen: { screen: FeedbackScreen, navigationOptions: feedbackNavOptions },
  ConnectScreen: { screen: ConnectScreen, navigationOptions: connectNavOptions },
  NewRequestScreen: { screen: NewRequestScreen, navigationOptions: newRequestNavOptions }
}

const Drawer = DrawerNavigator(DrawerRoutes, getDrawerConfig(300, 'left', 'HomeScreen', DrawerRoutes)) // check for welcome?

Drawer.navigationOptions = ({ navigation }) => getNavigationOptionsWithAction('Arcade City', Colors.acnavy, 'white', getDrawerItem(navigation))

export default Drawer
