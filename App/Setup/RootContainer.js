import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StatusBar } from 'react-native'
import firebase from './Config/FirebaseConfig'
import ReduxNavigation from '../Modules/nav/ReduxNavigation'
import { NavigationActions } from 'react-navigation'
import Toast from '../Modules/ui/components/Toast'
import LocActions from '../Modules/loc/redux'
import LoginScreen from '../Modules/auth/screens/LoginScreen'
import { doesUserExist } from '../Modules/auth/selectors'

class RootContainer extends Component {
  componentWillMount () {
    this.props.fetchUserLoc()

    // If user exists in Redux but not authed with Firebase, yeah go do that.
    console.tron.log('Current user:')
    console.tron.log(firebase.auth().currentUser)
  }

  componentDidMount () {
    console.tron.log('componentDidMount - userExists: ' + this.props.userExists)
  }

  componentDidUpdate () {
    console.tron.log('componentDidUpdate - userExists: ' + this.props.userExists)
  }

  render () {
    if (this.props.userExists && firebase.auth().currentUser) {
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle='light-content' />
          <ReduxNavigation />
          <Toast />
        </View>
      )
    } else {
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle='light-content' />
          <LoginScreen />
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  userExists: doesUserExist(state) // TODO: change this to THEREISUSER not the user, don't want it to change
})

const mapDispatchToProps = (dispatch) => ({
  fetchUserLoc: () => dispatch(LocActions.fetchUserLoc()),
  navigateTo: (route) => dispatch(NavigationActions.navigate({ routeName: route }))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
