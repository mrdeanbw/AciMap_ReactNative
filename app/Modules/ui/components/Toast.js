import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'

class Toast extends Component {
  componentDidUpdate () {
    if (this.animatedTextRef && this.props.toast) {
      this.animatedTextRef.startAnimation(500, 0, () => {})
    }
  }
  render () {
    return this.props.toast ? (<Animatable.View
      animation='fadeInUp'
      ref={ci => (this.animatedTextRef = ci)}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.chatImageContainer}>
          <Image source={{ uri: this.props.toast.image }} style={styles.userImage} />
        </View>
        <View style={{paddingLeft: 8, width: 180}}>
          <Text style={styles.nameText}>{this.props.toast.title}:</Text>
          <Text style={styles.text}>{this.props.toast.message}</Text>
        </View>
      </View>
    </Animatable.View>) : <View />
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center'
  },
  innerContainer: {
    width: 240,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(24,194,192,0.9)',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  chatImageContainer: {
    width: 44,
    height: 40,
    alignItems: 'center'
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  nameText: {
    padding: 5,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    paddingBottom: 0
  },
  text: {
    padding: 5,
    paddingTop: 2,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14
  }
})

const mapStateToProps = (state) => ({
  toast: state.ui.toast
})

export default connect(mapStateToProps)(Toast)
