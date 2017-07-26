import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Colors, Metrics, Images } from '../Themes/'
import UserActions from '../Redux/UserRedux'

class WelcomeScreen extends Component {
  render () {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>      
        <Image source={Images.welcome} style={styles.welcomeText} />
        <Image source={Images.arcadecityis} style={styles.textImage} />
        <Image source={Images.acmission} style={styles.textImage} />
        <Image source={Images.howcanyouhelp} style={styles.helpText} />
        <TouchableOpacity onPress={() => this.props.userLogin()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>I am a RIDER</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.userLogin()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>I am a DRIVER</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
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
    resizeMode: 'contain',
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
    fontSize: 24
  }
})

const mapStateToProps = (state) => ({
  user: state.user.obj || null
})

const mapDispatchToProps = (dispatch) => ({
  userLogin: (loc) => dispatch(UserActions.userLogin(loc))
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
