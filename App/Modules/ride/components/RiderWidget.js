import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../../../Theme/'
import * as UsersSelectors from '../../users/selectors'

class RiderWidget extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.nearbyText}>
          Drivers nearby: {this.props.nearbyDrivers.length}
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
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 24
  },
  signupText: {
    paddingBottom: 25,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16
  }
})

const mapStateToProps = (state) => ({
  nearbyDrivers: UsersSelectors.getNearbyDrivers(state)
})

export default connect(mapStateToProps, null)(RiderWidget)
