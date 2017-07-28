import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from '../Config/FirebaseConfig'
import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Colors, Metrics } from '../Themes/'
import NearbyActions from '../Redux/NearbyRedux'
import AuthActions from '../_auth/redux'
import { NavigationActions } from 'react-navigation'
import * as AuthSelectors from '../_auth/selectors'
import Loading from '../Components/Loading'

const ASPECT_RATIO = Metrics.screenWidth / Metrics.screenHeight
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class PermissionsScreen extends Component {
  state = {
    loading: false
  }
  grabDem () {
    this.setState({ loading: true })
    firebase.messaging().requestPermissions()
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
        // this.props.updateUserLoc(loc)
        this.props.userWelcomed()
        if (this.props.className === 'rider') {
          // this.props.findNearbyDrivers(loc) // do this for rider now. driver will wait til signup done +/? beacon down?
          this.props.navigateTo('HomeScreen')
        } else if (this.props.className === 'driverSigningUp') {
          this.props.navigateTo('DriverSignupScreen')
        }
      },
      (error) => window.alert(error.message),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 180000 }
     )
  }
  render () {
    return this.state.loading === false ? (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <Text style={styles.buttonText}>Welcome {this.props.className}!</Text>
        <Text style={styles.buttonText}>Permissions! Click okay to trigger dem permissions</Text>
        <TouchableOpacity style={{padding: 20, backgroundColor: Colors.acturq, borderRadius: 15}} onPress={() => this.grabDem()}>
          <Text style={{ fontFamily: 'Montserrat-Regular', color: 'white' }}>Click this shit</Text>
        </TouchableOpacity>
      </ScrollView>
    ) : (<Loading />)
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
  user: AuthSelectors.getUser(state),
  className: state.ui.className
})

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (route) => dispatch(NavigationActions.navigate({ routeName: route })),  
  userWelcomed: () => dispatch(AuthActions.userWelcomed())
})

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsScreen)
