import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Metrics, Colors, Fonts } from '../Themes/'
import DriverActions from '../Redux/DriverRedux'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as AuthSelectors from '../_auth/selectors'
import * as LocSelectors from '../_loc/selectors'

class DriverWidget extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.beaconText}>Set Driver Beacon</Text>
        <Icon.Button name='facebook'
          onPress={() => this.props.addDriverBeacon(this.props.user, this.props.loc, this.props.driver)}
          style={styles.button}>
          <Text style={styles.buttonText}>&nbsp;Set Driver Beacon</Text>
        </Icon.Button>
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

const mapStateToProps = (state) => ({
  user: AuthSelectors.getUser(state),
  loc: LocSelectors.getUserLoc(state),
  driver: state.driver.formData || null
})

const mapDispatchToProps = (dispatch) => ({
  addDriverBeacon: (user, loc, driver) => dispatch(DriverActions.addDriverBeacon(user, loc, driver))
})

export default connect(mapStateToProps, mapDispatchToProps)(DriverWidget)
