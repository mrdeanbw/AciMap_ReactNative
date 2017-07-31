import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Colors, Metrics, Images } from '../../../Theme/'
import UiActions from '../../ui/redux'
import AuthActions from '../../auth/redux'
import { NavigationActions } from 'react-navigation'
import * as Animatable from 'react-native-animatable'
import * as AuthSelectors from '../../auth/selectors'

class WelcomeScreen extends Component {
  selectClass (className) {
    this.props.setClass(className)
    this.props.userWelcomed()
    if (className === 'driver') {
      this.props.navigateTo('DriverSignupScreen')
    } else {
      this.props.navigateTo('HomeScreen')
    }    
  }
  render () {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, alignItems: 'center'}} keyboard>
        <Animatable.Image animation='fadeInDown' source={Images.welcome} style={styles.welcomeText} />
        <Animatable.Image animation='fadeInDown' delay={500} source={Images.arcadecityis} style={styles.textImage} />
        <Animatable.Image animation='fadeInDown' delay={3000} source={Images.acmission} style={styles.textImage} />
        <Animatable.Image animation='fadeIn' delay={5500} source={Images.howcanyouhelp} style={styles.helpText} />
        <TouchableOpacity onPress={() => this.selectClass('rider')}>
          <Animatable.View style={styles.button} animation='fadeIn' delay={6000}>
            <Text style={styles.buttonText}>I am a RIDER</Text>
          </Animatable.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.selectClass('driver')}>
          <Animatable.View style={styles.button} animation='fadeIn' delay={6000}>
            <Text style={styles.buttonText}>I am a DRIVER</Text>
          </Animatable.View>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.acnavy
  },
  welcomeText: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    marginTop: 30,
    marginBottom: 10,
    maxWidth: Metrics.screenWidth * 0.6,
    maxHeight: 125,
    resizeMode: 'contain'
  },
  textImage: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 0,
    maxWidth: Metrics.screenWidth * 0.8,
    maxHeight: 135,
    resizeMode: 'contain'
  },
  helpText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 3,
    marginBottom: 10,
    maxWidth: Metrics.screenWidth * 0.7,
    maxHeight: 125,
    resizeMode: 'contain'
  },
  button: {
    backgroundColor: Colors.acturq,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Montserrat-Regular'
  }
})

const mapStateToProps = (state) => ({
  user: AuthSelectors.getUser(state)
})

const mapDispatchToProps = (dispatch) => ({
  setClass: (className) => dispatch(UiActions.setClass(className)),
  navigateTo: (route) => dispatch(NavigationActions.navigate({ routeName: route })),
  userWelcomed: () => dispatch(AuthActions.userWelcomed())
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
