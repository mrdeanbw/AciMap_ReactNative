import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Metrics } from '../../../Theme/'
import { getUser } from '../../auth/selectors'
import ServiceRequestButton from '../components/ServiceRequestButton'
import DateRequestButton from '../components/DateRequestButton'
import RoundedButton from '../../ui/components/RoundedButton'
import RequestActions from '../redux'
import { selectRequestForm, selectRequestFormDetails } from '../selectors'

class NewRequestScreen extends Component {
  render () {
    return (
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView ref='scrollView' keyboardShouldPersistTaps={'always'} style={styles.container}>
          <View style={styles.scheduleRequestContainer}>
            <Text style={styles.title}>I need a...</Text>
            <ServiceRequestButton />
            <Text style={styles.title}>When?</Text>
            <DateRequestButton />
            <Text style={styles.title}>Details:</Text>
            <TextInput
              onChangeText={(text) => this.props.updateRequestFormDetails(text)}
              value={this.props.requestFormDetails}
              style={styles.requestTextInput}
              multiline
              placeholder='Describe your request'
              placeholderTextColor='#CCCCCC'
              maxLength={500}
            />
            <View style={{marginBottom: 15}} />
            <RoundedButton
              text='Request a Ride'
              style={{alignSelf: 'center'}}
              onPress={() => this.props.requestSubmitted(this.props.formDetails)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.acnavy,
    paddingHorizontal: Metrics.screenWidth * 0.1
  },
  scheduleRequestContainer: {
    marginBottom: 150,
    paddingHorizontal: 10
  },
  title: {
    color: Colors.snow,
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 5
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
  }
})

const mapStateToProps = (state) => ({
  user: getUser(state),
  formDetails: selectRequestForm(state),
  requestFormDetails: selectRequestFormDetails(state)
})

const mapDispatchToProps = (dispatch) => ({
  updateRequestFormDetails: (details) => dispatch(RequestActions.updateRequestFormDetails(details)),
  requestSubmitted: (req) => dispatch(RequestActions.requestSubmitted(req))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRequestScreen)
