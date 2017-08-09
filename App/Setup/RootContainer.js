import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StatusBar, AsyncStorage } from 'react-native'
import ReduxNavigation from '../Modules/nav/ReduxNavigation'
import { NavigationActions } from 'react-navigation'
// import createRootNavigator from '../Modules/nav/redux'
import Toast from '../Modules/ui/components/Toast'
import LocActions from '../Modules/loc/redux'

class RootContainer extends Component {
  isSignedIn () {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('ac_uid')
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    }
  }

  componentWillMount () {
    // console.tron.log('Mounting RootContainer........')
    this.props.fetchUserLoc()
    // this.isSignedIn()
    //   .then(res => {
    //     console.tron.log('returned from issignedinscheck w res')
    //     console.tron.log(res)
    //     this.setState({ signedIn: res, checkedSignIn: true })
    //     if (res) {
    //       console.tron.log('SIGNEDIN. NAVIGATING TO THE PLACE')
    //       // this.props.navigateTo('HomeScreen')
    //     }
    //   })

  }

  componentDidUpdate () {
    console.tron.log('RootContainer updated, its state is now')
    console.tron.log(this.state)
  }

  render () {
    return (
    // const { checkedSignIn, signedIn } = this.state

    // // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    // if (!checkedSignIn) {
    //   return null
    // }

    // // const Layout = createRootNavigator(signedIn)

    // removed signedIn={signedIn} from reduxnavigation below

    // return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
        <Toast />
      </View>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchUserLoc: () => dispatch(LocActions.fetchUserLoc()),
  navigateTo: (route) => dispatch(NavigationActions.navigate({ routeName: route }))
})

export default connect(null, mapDispatchToProps)(RootContainer)
