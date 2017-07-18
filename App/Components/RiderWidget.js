import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../Themes/'

class RiderWidget extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.nearbyText}>
          Drivers nearby: {this.props.nearbyDrivers.length}
        </Text>
        <Text style={styles.signupText}
          onPress={() => this.props.navigate('DriverSignupScreen')}>
          Sign up to drive
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.darktrans,
    marginBottom: 20,
    paddingHorizontal: 50,
    paddingVertical: 30,
    borderRadius: 15
  },
  nearbyText: {
    paddingBottom: 25,
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 24
  },
  signupText: {
    paddingBottom: 25,
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 16
  }
})

const mapStateToProps = (state) => ({
  nearbyDrivers: state.nearby.drivers || []
})

export default connect(mapStateToProps, null)(RiderWidget)
