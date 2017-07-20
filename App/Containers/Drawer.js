import { DrawerNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import React from 'react'
import { getNavigationOptionsWithAction, getDrawerNavigationOptions, getDrawerConfig } from '../Config/NavUtils'
import NavBarItem from '../Components/NavBarItem'
import HomeScreen from '../Containers/HomeScreen'
import DriverSignupScreen from '../Containers/DriverSignupScreen'
import { Colors } from '../Themes/'

const getDrawerItem = navigation => (
  <NavBarItem
    iconName="bars"
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

const homeNavOptions = getDrawerNavigationOptions('City Home', Colors.acnavy, 'white', homeDrawerIcon)
const userNavOptions = getDrawerNavigationOptions('Drive for Arcade City', Colors.acnavy, 'white', userDrawerIcon)
const feedbackNavOptions = getDrawerNavigationOptions('Feedback', Colors.acnavy, 'white', feedbackDrawerIcon)

const Drawer = DrawerNavigator({
  HomeScreen: { screen: HomeScreen, navigationOptions: homeNavOptions },
  UserScreen: { screen: DriverSignupScreen, navigationOptions: userNavOptions },
  FeedbackScreen: { screen: DriverSignupScreen, navigationOptions: feedbackNavOptions },
}, getDrawerConfig(300, 'left', 'HomeScreen'))

Drawer.navigationOptions = ({ navigation }) => getNavigationOptionsWithAction('Menu', Colors.acnavy, 'white', getDrawerItem(navigation))

export default Drawer
