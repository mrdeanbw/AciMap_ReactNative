import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Fonts, Colors } from '../Themes/'
import ChatActions from '../Redux/ChatRedux'
import DrawerChatWidget from './DrawerChatWidget'

class DrawerContent extends Component {
  clickDrawerNav(route, navigation) {
    if (this.props.roomKey) {
      this.props.clearRoomKey()
    }
    navigation.navigate(route)
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.clickDrawerNav('HomeScreen', navigation)}
        >
          <View style={{ width: 25, alignItems: 'center' }}>
            <Icon name='map-o' size={20} color='#fff' />
          </View>
          <Text style={styles.text}>City Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.clickDrawerNav('DriverScreen', navigation)}
        >
          <View style={{ width: 25, alignItems: 'center' }}>
            <Icon name='car' size={20} color='#fff' />
          </View>
          <Text style={styles.text}>Drive for Arcade City</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.clickDrawerNav('DriverScreen', navigation)}
        >
          <View style={{ width: 25, alignItems: 'center' }}>
            <Icon name='bullhorn' size={20} color='#fff' />
          </View>
          <Text style={styles.text}>Give Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.clickDrawerNav('DriverScreen', navigation)}
        >
          <View style={{ width: 25, alignItems: 'center' }}>
            <Icon name='handshake-o' size={20} color='#fff' />
          </View>
          <Text style={styles.text}>Connect</Text>
        </TouchableOpacity>

        <DrawerChatWidget navigation={navigation} />
      </View>
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
  roomKey: state.chat.roomKey
})

const mapDispatchToProps = (dispatch) => ({
  clearRoomKey: () => dispatch(ChatActions.clearRoomKey())
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
