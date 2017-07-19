import React, { Component } from 'react'
import { Image, Modal, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import UiActions from '../Redux/UiRedux'
import { Colors, Metrics } from '../Themes/'
import { GiftedChat } from 'react-native-gifted-chat'

class DriverProfile extends Component {
  state = {
    messages: [],
  }
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    })
  }
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  render () {
    const profile = this.props.activeDriver.profile
    return (
      <Modal
        visible={this.props.driverProfileVisible}
        animationType={'slide'}
        >
        <View style={styles.header}>
          <Text style={styles.text}>{profile.name}</Text>
          <Text style={styles.text} onPress={() => this.props.toggleDriverProfile()}>Close Modal!</Text>
        </View>
        <View style={{flex: 1, width: Metrics.screenWidth, height: Metrics.screenHeight, backgroundColor: Colors.ember}}>
          <GiftedChat
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: 1,
            }}
            style={{marginTop: 200, backgroundColor: Colors.silver}}
          />
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
