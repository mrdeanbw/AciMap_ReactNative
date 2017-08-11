import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import DriveActions from '../redux'
import UserActions from '../../users/redux'
import { Colors, Metrics } from '../../../Theme/'
import t from 'tcomb-form-native'
import * as AuthSelectors from '../../auth/selectors'
import { getThisDriverInfo } from '../selectors'

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

class EditDriverProfileScreen extends Component {
  state = {
    value: {
      describeYourself: this.props.driverInfo.self,
      describeYourVehicle: this.props.driverInfo.vehicle
    }
  }

  static navigationOptions = {
    title: 'Edit Driver Profile'
  }
  onPress () {
    var value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      this.props.driverSignupSubmit(value)
      window.alert('Your driver profile has been updated. Log out and in again to see the changes on your driver beacon. Changes may take 15-30 seconds to take effect.')
    }
  }
  render () {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView ref='scrollView'
          keyboardShouldPersistTaps={'always'}>
          <Text style={styles.headline}>Edit Driver Profile</Text>

          <View style={styles.formContainer}>
            <Form
              ref='form'
              type={DriverSignup}
              options={options}
              value={this.state.value}
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
  user: AuthSelectors.getUser(state),
  driverInfo: getThisDriverInfo(state)
})

const mapDispatchToProps = (dispatch) => ({
  driverSignupSubmit: (formData, user) => dispatch(DriveActions.driverSignupSubmit(formData, user)),
  listenForNearbyDrivers: () => dispatch(UserActions.listenForNearbyDrivers())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditDriverProfileScreen)
