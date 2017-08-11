import React, { Component } from 'react'
import { Linking, StyleSheet, Text, View, TouchableHighlight, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import DriveActions from '../redux'
import { Colors, Metrics } from '../../../Theme/'
import t from 'tcomb-form-native'
import * as AuthSelectors from '../../auth/selectors'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var Form = t.form.Form

// Avoid error on hot-reload
if (t.form.Form.stylesheet.controlLabel.normal.color !== '#ffffff') {
  t.form.Form.stylesheet.textbox.normal.color = '#ffffff'
  t.form.Form.stylesheet.textbox.normal.fontFamily = 'Montserrat-Regular'
  t.form.Form.stylesheet.textbox.error.color = '#ffffff'
  t.form.Form.stylesheet.textbox.error.fontFamily = 'Montserrat-Regular'
  t.form.Form.stylesheet.controlLabel.normal.color = '#ffffff'
  t.form.Form.stylesheet.controlLabel.normal.fontFamily = 'Montserrat-Regular'
  t.form.Form.stylesheet.controlLabel.error.fontFamily = 'Montserrat-Regular'
}

// here we are: define your domain model
var DriverSignup = t.struct({
  describeYourself: t.String,
  describeYourVehicle: t.String
})

var options = {}

class DriverSignupScreen extends Component {
  static navigationOptions = {
    title: 'Driver Signup'
  }
  onPress () {
    var value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      this.props.driverSignupSubmit(value)
    }
  }
  render () {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView ref='scrollView'
          keyboardShouldPersistTaps={'always'}>
          <Text style={styles.headline}>Drive for Arcade City</Text>
          <Text style={styles.explainer}>Join the peer-to-peer ridesharing revolution.</Text>
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.explainerBold}>-- Set your own rates and hours</Text>
            <Text style={styles.explainerBold}>-- Build your own recurring customer base no one can take away from you</Text>
            <Text style={styles.explainerBold}>-- Run your own transportation business like a true entrepreneur: no strings, no bosses, no corporate overlords</Text>
          </View>

          <Text style={styles.explainer}>Top Arcade City drivers earn 2 or 3 times what they used to make driving for Uber. And they have built a loyal customer base managed by THEM, not the company. That setup results in better service for the customer, and stable, recurring revenue for the driver.</Text>

          <Text style={styles.explainer}>Fill out the below information to sign up as a driver. This information will be visible publicly on your "driver beacon".</Text>

          <Text style={styles.explainer}>Your beacon is a marker on the map, visible to nearby riders. You can have one beacon at a time.</Text>

          <Text style={styles.explainer}>When you are approved as a full driver in good standing, you will be able to 'go online' and have your driver marker update in realtime on nearby riders' maps while you are online. In the meantime, it will stay in one place until you update its location manually. Riders will see that you are a 'trial' driver.</Text>

          <Text style={styles.explainerBold}>After you sign up below, you will have 7 days to give your first ride and submit a 'selfie' picture of you with a happy rider. If you do not submit that picture within 7 days, your driver account will be deactivated.</Text>

          <Text style={styles.explainer}>We will send you additional information and training to {this.props.user.email}.</Text>

          <Text style={styles.explainer}>By hitting Submit, you affirm that you have read and agree to our <Text onPress={() => Linking.openURL('https://arcade.city/terms')} style={{color: Colors.acturq}}>Terms of Service</Text>. (You'll want to actually read that.)</Text>

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

          <View style={{marginBottom: 50}}>
            <Text style={styles.explainerBold}>Example for 'Describe yourself':</Text>
            <Text style={styles.explainer}>Former Uber driver in Boston, now enjoying independence. Driver rating and car pics on my FB profile, friend me!</Text>
            <Text style={styles.explainerBold}>Example for 'Describe your vehicle':</Text>
            <Text style={styles.explainer}>Black 2017 Ford Expedition, seats 5</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 36,
    color: Colors.snow,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    marginVertical: 24,
    marginHorizontal: 15
  },
  subheadline: {
    fontSize: 24,
    color: Colors.snow,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    marginVertical: 24,
    marginHorizontal: 10
  },
  explainer: {
    fontSize: 16,
    color: Colors.snow,
    fontFamily: 'Montserrat-Regular',
    marginVertical: 7
  },
  explainerBold: {
    fontSize: 16,
    color: Colors.snow,
    fontFamily: 'Montserrat-Bold',
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
    marginBottom: 40,
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
  user: AuthSelectors.getUser(state)
})

const mapDispatchToProps = (dispatch) => ({
  driverSignupSubmit: (formData, user) => dispatch(DriveActions.driverSignupSubmit(formData, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(DriverSignupScreen)
