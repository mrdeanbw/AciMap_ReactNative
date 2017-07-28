// On open app, load the LoginScreen. It will detect if a user exists and will re-route accordingly.
// TODO: Handle existing user in componentWillMount(?) looking at Redux/localStorage usergasm.

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Metrics, Images } from '../Themes/'
// import UserActions from '../Redux/UserRedux'
import AuthActions from '../_auth/redux'
import Loading from '../Components/Loading'

class LoginScreen extends Component {
  // If initialFetch is not false, show loadSpinner. That will last thru the first thing, until navaway.
  render () {
    return this.props.initialFetch === false ? (
      <Image source={Images.city} style={styles.imageContainer}>
        <View style={styles.hoverContainer}>
          <View style={styles.loginBox}>
            <TouchableOpacity onPress={() => this.props.userLogin()}>
              <Image source={Images.loginButton} />
            </TouchableOpacity>
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
    marginBottom: 100,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 15
  }
})

const mapStateToProps = (state) => ({
  user: state.user.obj || null,
  initialFetch: state.user.initialFetch
})

const mapDispatchToProps = (dispatch) => ({
  // userLogin: (loc) => dispatch(UserActions.userLogin(loc))
  userLogin: () => dispatch(AuthActions.userLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
