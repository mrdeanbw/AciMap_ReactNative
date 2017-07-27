import { StackNavigator } from 'react-navigation'
import Drawer from '../Containers/Drawer'
import { StyleSheet } from 'react-native'
import { Colors } from '../Themes/'

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.acnavy
  }
})

const PrimaryNav = StackNavigator({
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
