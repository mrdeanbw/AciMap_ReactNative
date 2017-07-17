import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Metrics, Colors, Fonts } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome'

class DriverWidget extends Component {
  render () {
    return (
      <View style={{alignItems: 'center', backgroundColor: Colors.darktrans, marginBottom: 100, paddingHorizontal: 50, paddingVertical: 30, borderRadius: 15}}>
        <Text style={{paddingBottom: 25, color: 'white', fontFamily: 'Avenir-Book', fontSize: 24}}>Set Driver Beacon</Text>
        <Icon.Button name='facebook' backgroundColor='#3b5998' onPress={() => this.props.addDriverBeacon(this.props.user, this.props.loc, this.props.driver)} style={styles.button}>
          <Text style={styles.buttonText}>&nbsp;Set Driver Beacon</Text>
        </Icon.Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    fontSize: Fonts.size.h3,
    marginVertical: Metrics.baseMargin
  }
})

const mapStateToProps = (state) => ({
  user: state.user.obj || null,
  driver: state.driver.formData || null,
  loc: state.user.loc,
  nearbyDrivers: state.nearby.drivers || []
})

export default connect(mapStateToProps, null)(DriverWidget)
