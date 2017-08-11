/*
 * Component: ServiceRequestButton
 * App/Components/Buttons/ServiceRequestButton/index.js
 *
 * Service select button for use in scheduled request forms.
 * Uses custom picker with choices Test Ride, Test Delivery, Test Other, Ride, Delivery, Other
 */

import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import style from './style'
import UiActions from '../../../ui/redux'
import { selectRequestFormService } from '../../selectors'

const ServiceRequestButton = (props) => {
  const buttonPress = (props) => {
    props.toggleModal('serviceSelect')
  }
  return (
    <View style={style.requestButtonContainer}>
      <TouchableOpacity style={style.button} onPress={() => buttonPress(props)}>
        <Text style={style.buttonText}>{props.selectRequestFormService.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = (state) => ({
  selectRequestFormService: selectRequestFormService(state)
})

const mapDispatchToProps = (dispatch) => ({
  toggleModal: (component) => dispatch(UiActions.toggleModal(component))
})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestButton)
