import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StatusBar } from 'react-native'
import firebase from './Config/FirebaseConfig'
import ReduxNavigation from '../Modules/nav/ReduxNavigation'
import Toast from '../Modules/ui/components/Toast'
import Loading from '../Modules/ui/components/Loading'
import AuthActions from '../Modules/auth/redux'
import LoginScreen from '../Modules/auth/screens/LoginScreen'
import LocActions from '../Modules/loc/redux'
import { doesUserExist } from '../Modules/auth/selectors'
import { getCodePushStatus } from '../Modules/ui/selectors'

class RootContainer extends Component {
  componentWillMount () {
    this.props.fetchUserLoc()
    this.props.syncCodepush()
  }

  componentDidUpdate () {
    console.tron.display({
      name: 'RootContainer',
      value: this.props,
      preview: 'componentDidUpdate',
      important: true
    })
  }

  render () {
    /*
    if (this.props.codepushStatus && this.props.codepushStatus !== 'uptodate') { //  && !this.props.user ?
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle='light-content' />
          <Loading />
        </View>
      )
    } else
    */

if (this.props.userExists && firebase.auth().currentUser) {
  console.tron.log('heres this user')
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle='light-content' />
          <ReduxNavigation />
          <Toast />
        </View>
      )
    } else {
      console.tron.log('no user')
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
  userExists: doesUserExist(state),
  codepushStatus: getCodePushStatus(state)
})

const mapDispatchToProps = (dispatch) => ({
  fetchUserLoc: () => dispatch(LocActions.fetchUserLoc()),
  syncCodepush: () => dispatch(AuthActions.syncCodepush())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
