import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StatusBar } from 'react-native'
import firebase from './Config/FirebaseConfig'
import ReduxNavigation from '../Modules/nav/ReduxNavigation'
import CodepushToast from '../Modules/ui/components/CodepushToast'
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

  render () {
    if (!this.props.codepushStatus && !this.props.userExists) {
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle='light-content' />
          <LoginScreen />
          <CodepushToast />
        </View>
      )
    }

    if ((this.props.codepushStatus === 'updating' || this.props.codepushStatus === 'downloading') && !this.props.userExists) { //  && !this.props.user ?
      console.tron.log('HM')
      console.tron.log(this.props)
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle='light-content' />
          <Loading />
          <CodepushToast />
        </View>
      )
    } else if (this.props.userExists && firebase.auth().currentUser) {
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle='light-content' />
          <ReduxNavigation />
          <CodepushToast />
        </View>
      )
    } else {
      return (
        <View style={{flex: 1}}>
          <StatusBar barStyle='light-content' />
          <LoginScreen />
          <CodepushToast />
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
