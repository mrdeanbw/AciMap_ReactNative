import { StackNavigator } from 'react-navigation'
import Drawer from './components/Drawer'
import { StyleSheet } from 'react-native'
import { Colors } from '../../Theme/'

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.acnavy
  }
})

export default StackNavigator({
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
