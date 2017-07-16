import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Fonts, Colors, Metrics } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome';
import UserActions from '../Redux/UserRedux'
import NearbyActions from '../Redux/NearbyRedux'
import { connect } from 'react-redux'
import firebase from '../Lib/firebase'

class LoginButton extends Component {
  // User hit button to login with Facebook.
  _tryLogin() {
    // this.setState({
    //   fetchingDrivers: false
    // })
    LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.resolve('cancelled');
        }
        return AccessToken.getCurrentAccessToken();
      })
      .then(data => {
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        return firebase.auth().signInWithCredential(credential);
      })
      .then((currentUser) => {
        if (currentUser === 'cancelled') {
          console.log('Login cancelled');
        } else {
          this.props.userSuccess(currentUser.toJSON())
          this.props.findNearbyDrivers(currentUser.toJSON(), this.props.loc)
        }
      })
      .catch((error) => {
        console.log(`Login fail with error: ${error}`);
      });
  }
  render () {
    return (
      <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this._tryLogin.bind(this)} style={styles.button}>
        <Text style={styles.buttonText}>&nbsp;Log in</Text>
      </Icon.Button>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 55,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    paddingHorizontal: 40,
    backgroundColor: '#3b5998',
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.snow,
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    fontSize: Fonts.size.h3,
    marginVertical: Metrics.baseMargin
  }
});

const mapStateToProps = (state) => ({   
  user: state.user,
  loc: state.user.loc
})

const mapDispatchToProps = (dispatch) => ({
  userSuccess: (obj) => dispatch(UserActions.userSuccess(obj)),
  findNearbyDrivers: (user, loc) => dispatch(NearbyActions.findNearbyDrivers(user, loc)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton)