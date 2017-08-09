import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import { getUser } from '../auth/selectors'

// here is our redux-aware our smart component
function ReduxNavigation (props) {
  // console.tron.log('REDUXNAVIGATION PROPS')
  // console.tron.log(props)
  const { dispatch, nav, user, signedIn } = props
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav
  })
  // console.tron.log('HERE in reduxnav we have user')
  // console.tron.log(user)
  // const AppNavigation = createRootNavigator(signedIn)

  return <AppNavigation navigation={navigation} />
}

const mapStateToProps = state => ({ 
  nav: state.nav,
  user: getUser(state)
})

export default connect(mapStateToProps)(ReduxNavigation)
