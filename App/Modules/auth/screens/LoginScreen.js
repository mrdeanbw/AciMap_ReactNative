// On open app, load the LoginScreen. It will detect if a user exists and will re-route accordingly.
// TODO: Handle existing user in componentWillMount(?) looking at Redux/localStorage usergasm.

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Metrics, Images } from '../../../Theme/'
import AuthActions from '../redux'
import Loading from '../../ui/components/Loading'
import * as AuthSelectors from '../selectors'
import * as LocSelectors from '../../loc/selectors'

class LoginScreen extends Component {
  render () {
    return this.props.initialFetch === false ? (
      <Image source={Images.city} style={styles.imageContainer}>
        <View style={styles.hoverContainer}>
          <View style={styles.loginBox}>
            { !this.props.userLocError ? (
              <TouchableOpacity onPress={() => this.props.userLogin()}>
                <Image source={Images.loginButton} />
                <Text style={styles.versionText}>v2.0.3</Text>
              </TouchableOpacity>
            ) : <Text style={{color: 'white', fontSize: 20, fontFamily: 'Montserrat-Bold'}}>Location needed to use app. Please enable and reload app.</Text> }
          </View>
        </View>
      </Image>
    ) : (<Loading />)
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    alignItems: 'center'
  },
  hoverContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: Metrics.screenWidth
  },
  loginBox: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 55,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 15
  },
  versionText: {
    marginTop: 45,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    alignSelf: 'center',
    textShadowRadius: 3,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1}
  }
})

const mapStateToProps = (state) => ({
  user: AuthSelectors.getUser(state),
  initialFetch: AuthSelectors.getInitialFetch(state),
  welcomed: AuthSelectors.getUserWelcomed(state),
  userLocError: LocSelectors.getUserLocError(state)
})

const mapDispatchToProps = (dispatch) => ({
  userLogin: () => dispatch(AuthActions.userLogin()),
  navigateTo: (route) => dispatch(NavigationActions.navigate({ routeName: route }))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
