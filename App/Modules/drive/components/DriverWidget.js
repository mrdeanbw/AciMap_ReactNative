import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../Theme/'
import RoundedButton from '../../ui/components/RoundedButton'
import DriveActions from '../../drive/redux'

class DriverWidget extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.beaconText}>Set Driver Beacon</Text>
        <RoundedButton
          text='Set Driver Beacon'
          style={{alignSelf: 'center'}}
          onPress={() => this.props.addDriverBeacon()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.darktrans,
    marginBottom: 100,
    paddingHorizontal: 50,
    paddingVertical: 30,
    borderRadius: 15
  },
  beaconText: {
    paddingBottom: 25,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 24
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
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: Fonts.size.h3,
    marginVertical: Metrics.baseMargin
  }
})

const mapDispatchToProps = (dispatch) => ({
  addDriverBeacon: () => dispatch(DriveActions.addDriverBeacon())
})

export default connect(null, mapDispatchToProps)(DriverWidget)
