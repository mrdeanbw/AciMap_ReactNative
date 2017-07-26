import React, { Component } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import UiActions from '../Redux/UiRedux'
import { Colors, Metrics } from '../Themes/'
import ACChat from '../Containers/ACChat'

class DriverProfile extends Component {
  render () {
    const profile = this.props.activeDriver.profile
    return (
      <Modal
        visible={this.props.driverProfileVisible}
        animationType={'slide'}
        onRequestClose={() => console.tron.log('hm')}
        >
        <View style={styles.header}>
          <Text style={styles.text}>{profile.name}</Text>
          <Text style={styles.text} onPress={() => this.props.toggleDriverProfile()}>Close Modal!</Text>
        </View>
        <View style={{flex: 1, width: Metrics.screenWidth, height: Metrics.screenHeight, backgroundColor: Colors.ember}}>
          <ACChat />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    backgroundColor: Colors.acnavy,
    width: Metrics.screenWidth,
    paddingTop: 90
  },
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.acnavy,
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    flex: 1
  },
  text: {
    color: Colors.snow,
    fontFamily: 'Avenir-Book'
  },
  chatContainer: {
    width: Metrics.screenWidth,
    flex: 1
  }
})

const mapStateToProps = (state) => ({
  driverProfileVisible: state.ui.profileVisible,
  activeDriver: state.nearby.activeDriver
})

const mapDispatchToProps = (dispatch) => ({
  toggleDriverProfile: () => dispatch(UiActions.toggleDriverProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(DriverProfile)
