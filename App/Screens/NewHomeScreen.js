import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Metrics, Colors, Images } from '../Themes/'
import LoginWidget from '../Components/NewLoginWidget'

class NewHome extends Component {
  constructor(props) {
    super(props)
    console.tron.log('props:')
    console.tron.log(props)
  }
  render() {
    return (
      <Image source={Images.girl} style={styles.backgroundImage}>
        <View style={{position: 'absolute', bottom: 0, alignItems: 'center', width: Metrics.screenWidth}}>
          <View style={{alignItems: 'center', backgroundColor: 'transparent', marginBottom: 100, paddingHorizontal: 30, paddingVertical: 30, borderRadius: 15}}>
            <TouchableOpacity onPress={() => this.setState({screen: 'welcome1'})} >
              <Image source={Images.loginButton} style={styles.loginButton}/>
            </TouchableOpacity>
          </View>
        </View>
      </Image>
    )
  }
} 

const Welcome1 = () => (
  <Image source={Images.girl} style={styles.backgroundImage}>
    <View style={{position: 'absolute', bottom: 0, alignItems: 'center', width: Metrics.screenWidth}}>
      <View style={{alignItems: 'center', backgroundColor: 'transparent', marginBottom: 100, paddingHorizontal: 30, paddingVertical: 30, borderRadius: 15}}>
        <Text style={{color: 'white'}}>YOYOYOYOYO</Text>
      </View>
    </View>
  </Image>
)

class HomeScreen extends Component {
  state = {
    screen: 'home'
  }

  static navigationOptions = {
    title: 'Arcade City',
    headerTintColor: 'white',
    drawerLabel: 'Home',
    drawerIcon: () => (
      <Icon name='car' size={30} color={Colors.snow} />
    ),
    headerStyle: {
      backgroundColor: Colors.acnavy
    },
    headerTitleStyle: { fontFamily: 'Avenir-Black' },
    headerBackTitleStyle: { fontFamily: 'Avenir-Book' }
  }

  render () {
    const { navigation } = this.props.navigation
    switch (this.props.screen) {
      case 'home':
        return (<NewHome />)
        break
      case 'welcome1':
        return (<Welcome1 />)
        break

    }
    
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    alignItems: 'center' 
  }
})


const mapStateToProps = (state) => ({
  user: state.user.obj || null,
  screen: state.ui.welcomeScreen
})

export default connect(mapStateToProps)(HomeScreen)
