import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../Theme/'
import RoundedButton from '../../ui/components/RoundedButton'
import DriveActions from '../redux'
import * as DriveSelectors from '../selectors'

class DriverWidget extends Component {
  render () {
    return (
      <View style={styles.container}>
        { this.props.driverHasBeacon
          ? <RoundedButton
            text='Remove Beacon'
            style={{alignSelf: 'center'}}
            onPress={() => this.props.removeDriverBeacon()}
          />
        : <RoundedButton
          text='Set Driver Beacon'
          style={{alignSelf: 'center'}}
          onPress={() => this.props.addDriverBeacon()}
        />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.darktrans,
    marginBottom: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
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

const mapStateToProps = (state) => ({
  driverHasBeacon: DriveSelectors.getThisDriverHasBeacon(state)
})

const mapDispatchToProps = (dispatch) => ({
  addDriverBeacon: () => dispatch(DriveActions.addDriverBeacon()),
  removeDriverBeacon: () => dispatch(DriveActions.removeDriverBeacon())
})

export default connect(mapStateToProps, mapDispatchToProps)(DriverWidget)
