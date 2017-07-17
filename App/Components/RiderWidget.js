import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../Themes/'

class RiderWidget extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={{alignItems: 'center', backgroundColor: Colors.darktrans, marginBottom: 20, paddingHorizontal: 50, paddingVertical: 30, borderRadius: 15}}>
        <Text style={{paddingBottom: 25, color: 'white', fontFamily: 'Avenir-Book', fontSize: 24}}>Drivers nearby: {this.props.nearbyDrivers.length}</Text>
        <Text
          style={{paddingBottom: 25, color: 'white', fontFamily: 'Avenir-Book', fontSize: 16}}
          onPress={() => navigate('DriverSignupScreen')}>
          Sign up to drive
        </Text>
      </View>
    )
  }
}

// const styles = StyleSheet.create({
//   button: {
//     height: 55,
//     borderRadius: 5,
//     marginHorizontal: Metrics.section,
//     marginVertical: Metrics.baseMargin,
//     paddingHorizontal: 40,
//     backgroundColor: '#3b5998',
//     justifyContent: 'center'
//   },
//   buttonText: {
//     color: Colors.snow,
//     fontFamily: 'Avenir-Book',
//     textAlign: 'center',
//     fontSize: Fonts.size.h3,
//     marginVertical: Metrics.baseMargin
//   }
// })

const mapStateToProps = (state) => ({
  user: state.user.obj || null,
  driver: state.driver.formData || null,
  loc: state.user.loc,
  nearbyDrivers: state.nearby.drivers || []
})

export default connect(mapStateToProps, null)(RiderWidget)
