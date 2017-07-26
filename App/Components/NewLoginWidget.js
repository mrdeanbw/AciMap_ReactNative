import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Fonts, Colors, Images, Metrics } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome'
import UserActions from '../Redux/UserRedux'
import NearbyActions from '../Redux/NearbyRedux'

class LoginWidget extends Component {
  render () {
    return (
      <View style={{alignItems: 'center', backgroundColor: 'transparent', marginBottom: 100, paddingHorizontal: 30, paddingVertical: 30, borderRadius: 15}}>
        <TouchableOpacity>
          <Image source={Images.loginButton} style={styles.loginButton}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loginButton: {
    width: 298,
    height: 75
  },
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
})

const mapStateToProps = (state) => ({
  user: state.user,
  loc: state.user.loc
})

const mapDispatchToProps = (dispatch) => ({
  userLogin: (loc) => dispatch(UserActions.userLogin(loc)),
  userLoginSuccess: (obj) => dispatch(UserActions.userLoginSuccess(obj)),
  findNearbyDrivers: (user, loc) => dispatch(NearbyActions.findNearbyDrivers(user, loc))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginWidget)
