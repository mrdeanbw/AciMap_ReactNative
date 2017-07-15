import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux'
import UserActions from '../Redux/UserRedux'
import RoundedButton from '../Components/RoundedButton'
import { NavigationActions } from 'react-navigation'

const { width, height } = Dimensions.get('window');

class DriverSignupScreen extends Component {
  static navigationOptions = {
    title: 'Driver Signup',
  };
  render() {
    const { navigate } = this.props.navigation;
    console.tron.log('navigate object:')
    console.tron.log(navigate)
    return (
      <View style={{ flex: 1 }}>
        <Text>DRIVER SIGNUP</Text>
        <RoundedButton
          text='Submit'
          onPress={() => alert('submitting')}
          style={{alignSelf: 'center'}}
        />        
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

const mapDispatchToProps = (dispatch) => ({
  findNearbyDrivers: () => dispatch(NearbyActions.findNearbyDrivers())
})

export default connect(null, mapDispatchToProps)(DriverSignupScreen)