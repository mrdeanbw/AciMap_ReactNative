import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import firebase from '../Config/FirebaseConfig'
import DriverActions from '../Redux/DriverRedux'
import { Colors, Metrics } from '../Themes/'
import t from 'tcomb-form-native'

var Form = t.form.Form

// Avoid error on hot-reload
if (t.form.Form.stylesheet.controlLabel.normal.color !== '#ffffff') {
  t.form.Form.stylesheet.textbox.normal.color = '#ffffff'
  t.form.Form.stylesheet.textbox.normal.fontFamily = 'Montserrat-Regular'
  t.form.Form.stylesheet.controlLabel.normal.color = '#ffffff'
  t.form.Form.stylesheet.controlLabel.normal.fontFamily = 'Montserrat-Regular'
}

// here we are: define your domain model
var DriverSignup = t.struct({
  fullName: t.String,
  email: t.String,
  describeYourself: t.String,
  describeYourVehicle: t.String,
  iAcceptTheTerms: t.Boolean
})

var options = {}

class DriverSignupScreen extends Component {
  static navigationOptions = {
    title: 'Driver Signup'
  }
  onPress () {
    var value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      var user = this.props.user
      firebase.database().ref('users/' + user.uid).update({
        obj: {...user, timestamp: Date.now()},
        driverSignup: value
      })
      .then(response => {
        if (response.status === 'success') {
          this.props.driverSignupSuccess(value, user)
        } else {
          window.alert('Error, try again')
        }
      })
    }
  }
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.headline}>Drive for Arcade City</Text>
        <Text style={styles.explainer}>Calling all drivers!</Text>
        <Text style={styles.explainer}>Sign up now to join our ridesharing revolution. As an Arcade City driver, you'll get to:</Text>
        <View style={{paddingHorizontal: 10}}>
          <Text style={styles.explainer}>-- Set your own rates and hours</Text>
          <Text style={styles.explainer}>-- Build your own recurring customer base no one can take away from you</Text>
          <Text style={styles.explainer}>-- Run your own transportation business like a true entrepreneur: no strings, no bosses, no corporate overlords</Text>
        </View>
        <Text style={styles.explainer}>You will be emailed additional information within 24 hours. .</Text>
        <View style={styles.formContainer}>
          <Form
            ref='form'
            type={DriverSignup}
            options={options}
          />
        </View>
        <TouchableHighlight style={styles.submitBtn} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 36,
    color: Colors.snow,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
    marginVertical: 24,
    marginHorizontal: 15
  },
  explainer: {
    fontSize: 16,
    color: Colors.snow,
    fontFamily: 'Montserrat-Regular',
    marginVertical: 7
  },
  formContainer: {
    marginVertical: 30,
    paddingHorizontal: Metrics.screenWidth * 0.1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.acnavy,
    paddingHorizontal: Metrics.screenWidth * 0.1
  },
  submitBtn: {
    height: 56,
    backgroundColor: Colors.acturq,
    borderColor: Colors.acturq,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 250
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    color: 'white',
    fontSize: 20
  }
})

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  driverSignupSubmit: (formData, user) => dispatch(DriverActions.driverSignupSubmit(formData, user)),
  driverSignupSuccess: (formData, user) => dispatch(DriverActions.driverSignupSuccess(formData, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(DriverSignupScreen)
