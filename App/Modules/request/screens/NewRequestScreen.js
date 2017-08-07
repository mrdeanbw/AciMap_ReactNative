import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableHighlight, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import DriveActions from '../redux'
import UserActions from '../../users/redux'
import { Colors, Metrics } from '../../../Theme/'
import * as AuthSelectors from '../../auth/selectors'
import ServiceRequestButton from '../components/ServiceRequestButton'
import DateRequestButton from '../components/DateRequestButton'
import { updateRequestFormDetails } from '../redux'
import { selectRequestFormDetails } from '../selectors'

class NewRequestScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView ref='scrollView' keyboardShouldPersistTaps={'always'}>
          <View style={styles.scheduleRequestContainer}>
            <Text style={styles.title}>I need a...</Text>
            <ServiceRequestButton />
            <Text style={styles.title}>When?</Text>
            <DateRequestButton />
            <Text style={styles.title}>Details:</Text>
            <TextInput
              onChangeText={(text) => this.props.updateRequestFormDetails(text)}
              value={this.props.selectRequestFormDetails}
              style={styles.requestTextInput}
              multiline
              placeholder='Describe your request'
              placeholderTextColor='#CCCCCC'
              maxLength={500}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  scheduleRequestContainer: {
    marginBottom: 150,
    paddingHorizontal: 10
  },

  requestTextInput: {
    height: 120,
    borderColor: 'rgba(67,154,224,0.85)',
    backgroundColor: 'rgba(27,20,59,0.9)',
    borderWidth: 2,
    fontFamily: 'Montserrat-Light',
    color: 'white',
    marginHorizontal: 20,
    marginTop: 4,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16
  },

  title: {
    color: Colors.snow,
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 5
  },



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
  driverSignupSubmit: (formData, user) => dispatch(DriveActions.driverSignupSubmit(formData, user)),
  fetchNearbyDrivers: () => dispatch(UserActions.fetchNearbyDrivers()),
  updateRequestFormDetails: (text) => dispatch(updateRequestFormDetails(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRequestScreen)
