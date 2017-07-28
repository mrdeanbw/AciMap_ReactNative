import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Fonts, Colors } from '../Themes/'
import ChatActions from '../Redux/ChatRedux'
import DrawerChatWidget from './DrawerChatWidget'
import AuthActions from '../_auth/redux'
import * as AuthSelectors from '../_auth/selectors'

class DrawerContent extends Component {
  clickDrawerNav (route, navigation) {
    if (this.props.roomKey) {
      this.props.clearRoomKey()
    }
    navigation.navigate(route)
  }

  logout (navigation) {
    navigation.navigate('HomeScreen')
    this.props.userLogout()
  }

  render () {
    const { navigation } = this.props
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.clickDrawerNav('HomeScreen', navigation)}
        >
          <View style={{ width: 25, alignItems: 'center' }}>
            <Icon name='map-o' size={20} color='#fff' />
          </View>
          <Text style={styles.text}>City Map</Text>
        </TouchableOpacity>

        {this.props.userClass !== 'driver' ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => this.clickDrawerNav('DriverSignupScreen', navigation)}
          >
            <View style={{ width: 25, alignItems: 'center' }}>
              <Icon name='car' size={20} color='#fff' />
            </View>
            <Text style={styles.text}>Drive for Arcade City</Text>
          </TouchableOpacity>
        ) : <View />}

        <TouchableOpacity
          style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.clickDrawerNav('FeedbackScreen', navigation)}
        >
          <View style={{ width: 25, alignItems: 'center' }}>
            <Icon name='bullhorn' size={20} color='#fff' />
          </View>
          <Text style={styles.text}>Give Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.clickDrawerNav('ConnectScreen', navigation)}
        >
          <View style={{ width: 25, alignItems: 'center' }}>
            <Icon name='handshake-o' size={20} color='#fff' />
          </View>
          <Text style={styles.text}>Connect</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.logout(navigation)}
        >
          <View style={{ width: 25, alignItems: 'center' }}>
            <Icon name='sign-out' size={20} color='#fff' />
          </View>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>

        <DrawerChatWidget navigation={navigation} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: Colors.acnavy,
    flex: 1
  },
  text: {
    fontFamily: Fonts.type.base,
    color: Colors.snow,
    marginVertical: 10,
    fontSize: Fonts.size.h5,
    marginLeft: 20
  }
})

const mapStateToProps = (state) => ({
  roomKey: state.chat.roomKey,
  userClass: AuthSelectors.getUserClass(state)
})

const mapDispatchToProps = (dispatch) => ({
  clearRoomKey: () => dispatch(ChatActions.clearRoomKey()),
  userLogout: () => dispatch(AuthActions.userLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
