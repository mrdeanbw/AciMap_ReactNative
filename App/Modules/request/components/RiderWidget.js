import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../../../Theme/'
import * as UsersSelectors from '../../users/selectors'
import { NavigationActions } from 'react-navigation'
// import RoundedButton from '../../ui/components/RoundedButton'

class RiderWidget extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.nearbyText}>
          Drivers nearby: {this.props.nearbyDriversCount}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.darktrans,
    marginBottom: 10,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 15
  },
  nearbyText: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    marginBottom: 10
  },
  signupText: {
    paddingBottom: 25,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16
  }
})

const mapStateToProps = (state) => ({
  nearbyDriversCount: UsersSelectors.getNearbyDriversCount(state)
})

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (route) => dispatch(NavigationActions.navigate({ routeName: route }))
})

export default connect(mapStateToProps, mapDispatchToProps)(RiderWidget)

/*
<RoundedButton
  text='Request a Ride'
  style={{alignSelf: 'center'}}
  onPress={() => this.props.navigateTo('NewRequestScreen')}
/>
*/
