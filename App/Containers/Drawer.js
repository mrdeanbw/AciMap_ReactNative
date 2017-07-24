import { DrawerNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { getNavigationOptionsWithAction, getDrawerNavigationOptions, getDrawerConfig } from '../Config/NavUtils'
import NavBarItem from '../Components/NavBarItem'
import HomeScreen from '../Containers/HomeScreen'
import ChatScreen from '../Containers/ChatScreen'
import DriverSignupScreen from '../Containers/DriverSignupScreen'
import FeedbackScreen from '../Containers/FeedbackScreen'
import ConnectScreen from '../Containers/ConnectScreen'
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
  HomeScreen: { screen: HomeScreen, navigationOptions: homeNavOptions },
  DriverScreen: { screen: DriverSignupScreen, navigationOptions: userNavOptions },
  ChatScreen: { screen: ChatScreen, navigationOptions: chatNavOptions },
  FeedbackScreen: { screen: FeedbackScreen, navigationOptions: feedbackNavOptions },
  ConnectScreen: { screen: ConnectScreen, navigationOptions: connectNavOptions }
}

const Drawer = DrawerNavigator(DrawerRoutes, getDrawerConfig(300, 'left', 'HomeScreen', DrawerRoutes))

Drawer.navigationOptions = ({ navigation }) => getNavigationOptionsWithAction('Arcade City', Colors.acnavy, 'white', getDrawerItem(navigation))

export default Drawer
