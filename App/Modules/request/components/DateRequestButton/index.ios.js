/*
 * Component: DateRequestButton
 * App/Components/Buttons/DateRequestButton/index.js
 *
 * Date select button for use in scheduled request forms.

 */

import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import style from './style'
import moment from 'moment'
import { toggleModal } from '../../redux'
import { selectRequestFormWhen } from '../../selectors'

const DateRequestButton = (props) => {
  const buttonPress = (props) => {
    props.toggleModal('dateSelect')
  }
  let storedTime = props.selectRequestFormWhen
  let whenisit
  if (storedTime < Date.now()) {
    whenisit = 'now'
  } else {
    whenisit = moment(storedTime).format('ddd M/D, h:mma')
  }
  return (
    <View style={style.requestButtonContainer}>
      <TouchableOpacity style={style.button} onPress={() => buttonPress(props)}>
        <Text style={style.buttonText}>{whenisit.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = (state) => ({
  selectRequestFormWhen: selectRequestFormWhen(state)
})

const mapDispatchToProps = (dispatch) => ({
  toggleModal: (component) => dispatch(toggleModal(component))
})

export default connect(mapStateToProps, mapDispatchToProps)(DateRequestButton)
