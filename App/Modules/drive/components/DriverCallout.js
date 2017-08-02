import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import RoundedButton from '../../ui/components/RoundedButton'
import { Colors, Metrics, Images } from '../../../Theme/'

export default class DriverCallout extends Component {
  componentWillMount () {
    console.tron.log(this.props)
  }
  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.travis} style={styles.userImage} />
        <Text style={styles.nameText}>{this.props.user.name}</Text>
        <Text style={styles.text}>{this.props.user.driver.vehicle}</Text>
        <Text style={styles.text}>{this.props.user.driver.self}</Text>
        { !this.props.same ? 
          <RoundedButton
            text='Open Chat'
            style={{alignSelf: 'center'}}
          /> : <View />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    paddingVertical: 12
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.darktrans,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 30,
    width: 280
  },
  text: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 0,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14
  },
  nameText: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 0,
    fontFamily: 'Montserrat-Bold',
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18
  },
  bold: {
    fontFamily: 'Montserrat-Bold'
  }
})
