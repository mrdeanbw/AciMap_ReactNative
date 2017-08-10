import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../../Theme'
import { connect } from 'react-redux'
import { getCodePushDownloadPerc, getCodePushModalVisible } from '../selectors'
import * as Animatable from 'react-native-animatable'

class CodepushToast extends Component {
  state = {
    rendered: false
  }

  componentDidUpdate () {
    console.tron.log('CodepushToast updated with props')
    console.tron.log(this.props)

    if (this.animatedTextRef && this.props.modalVisible && !this.state.rendered) {
      console.tron.log('Rendering once...')
      this.animatedTextRef.startAnimation(500, 0, () => {})
      this.setState({ rendered: true })
      console.tron.log('Set rendered state to true')
    }
  }
  render () {
    return this.props.modalVisible ? (<Animatable.View
      animation='fadeInUp'
      ref={ci => (this.animatedTextRef = ci)}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{paddingLeft: 8, width: 180, alignItems: 'center'}}>
          <Text style={styles.nameText}>Updating</Text>
          <Text style={styles.text}>{this.props.perc}%</Text>
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
    backgroundColor: Colors.ember,
    marginBottom: 150,
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
  perc: getCodePushDownloadPerc(state),
  modalVisible: getCodePushModalVisible(state)
})

export default connect(mapStateToProps)(CodepushToast)
