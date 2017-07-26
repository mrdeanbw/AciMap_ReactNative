import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import firebase from '../Config/FirebaseConfig'
import { Colors, Metrics } from '../Themes/'
import t from 'tcomb-form-native'

var Form = t.form.Form

if (t.form.Form.stylesheet.controlLabel.normal.color !== '#ffffff') {
  t.form.Form.stylesheet.textbox.normal.color = '#ffffff'
  t.form.Form.stylesheet.textbox.normal.fontFamily = 'Avenir-Book'
  t.form.Form.stylesheet.controlLabel.normal.color = '#ffffff'
  t.form.Form.stylesheet.controlLabel.normal.fontFamily = 'Avenir-Book'
}

var FeedbackForm = t.struct({
  feedback: t.String
})

var options = {
  fields: {
    feedback: {
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 100
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 100
          }
        }
      }
    }
  }
}

class FeedbackScreen extends Component {
  state = {
    submitted: false
  }
  onPress () {
    var value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      var user = this.props.user
      firebase.database().ref('feedback/' + user.obj.uid).push().set({
        feedback1: value,
        createdAt: Date.now()
      })
      .then(response => {
        if (response.status === 'success') {
          // this.props.driverSignupSuccess(value, user)
          this.setState({
            submitted: true
          })
        } else {
          window.alert('Thank you!')
        }
      })
    }
  }
  render () {
    return this.state.submitted === false
    ? (<ScrollView style={styles.container}>
      <Text style={styles.headline}>Give Feedback</Text>
      <Text style={styles.explainer}>Bug? Feature request? Comment? Idea? Rant? Insult? Metaphysical speculation?</Text>
      <Text style={styles.explainer}>We would love to hear from you.</Text>
      <View style={styles.formContainer}>
        <Form
          ref='form'
          type={FeedbackForm}
          options={options}
        />
      </View>
      <TouchableHighlight style={styles.submitBtn} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableHighlight>
    </ScrollView>)
    : (<View style={styles.container}>
      <Text style={styles.headline}>Thank you!</Text>
      <Text style={styles.explainer}>Didn't that feel good?</Text>
    </View>)
  }
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 36,
    color: Colors.snow,
    alignSelf: 'center',
    fontFamily: 'Avenir-Black',
    marginVertical: 24,
    paddingHorizontal: 9
  },
  explainer: {
    fontSize: 18,
    color: Colors.snow,
    fontFamily: 'Avenir-Book',
    marginVertical: 5,
    paddingHorizontal: Metrics.screenWidth * 0.1
  },
  formContainer: {
    marginVertical: 30,
    paddingHorizontal: Metrics.screenWidth * 0.1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.acnavy,
    paddingHorizontal: 10
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
    fontFamily: 'Avenir-Black',
    alignSelf: 'center',
    color: 'white',
    fontSize: 20
  }
})

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(FeedbackScreen)
