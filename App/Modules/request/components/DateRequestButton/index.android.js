/*
 * Component: DateRequestButton (Android)
 * App/Components/Buttons/DateRequestButton/index.js
 *
 * Date/time select buttons for use in scheduled request forms.
 * iOS has one native datetime picker. Android has two separate ones. So we'll split this into two butons.
 */

import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, DatePickerAndroid, TimePickerAndroid } from 'react-native'
import style from './style'
import moment from 'moment'
import { updateRequestFormWhen } from '../../../Redux/actions'
import { selectRequestFormWhen } from '../../../Redux/selectors'
import Reactotron from 'reactotron-react-native'

const DateRequestButton = (props) => {
  let whendate = moment(props.selectRequestFormWhen).format('ddd M/D')
  let whentime = moment(props.selectRequestFormWhen).format('h:mma')

  const dateButtonPress = async (props) => {
    let options = {
      date: props.selectRequestFormWhen
    }
    const {action, year, month, day} = await DatePickerAndroid.open(options)
    if (action !== DatePickerAndroid.dismissedAction) {
      let fulldate = year + '-' + (month + 1) + '-' + day + ' ' + whentime
      let thedate = moment(fulldate, 'YYYY-MM-DD HH:mm').toDate()
      props.updateRequestFormWhen(thedate)
    }
  }

  const timeButtonPress = async (props) => {
    let hour1 = moment(props.selectRequestFormWhen).hour()
    let minute1 = moment(props.selectRequestFormWhen).minute()
    Reactotron.log('timebuttonpress infos')
    Reactotron.log(hour1)
    Reactotron.log(minute1)
    let options = {
      hour: hour1,
      minute: minute1
    }
    const { action, minute, hour } = await TimePickerAndroid.open(options)
    if (action !== TimePickerAndroid.dismissedAction) {
      let fulltime = moment(props.selectRequestFormWhen).format('YYYY-MM-DD') + ' ' + hour + ':' + minute
      let thedate = moment(fulltime, 'YYYY-MM-DD HH:mm').toDate()
      props.updateRequestFormWhen(thedate)
    }
  }

  return (
    <View style={{alignItems: 'center'}}>
      <View style={style.requestButtonContainerAndroid}>
        <TouchableOpacity style={style.buttonAndroid} onPress={() => dateButtonPress(props)}>
          <Text style={style.buttonText}>{whendate.toUpperCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonAndroid} onPress={() => timeButtonPress(props)}>
          <Text style={style.buttonText}>{whentime.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
  selectRequestFormWhen: selectRequestFormWhen(state)
})

const mapDispatchToProps = (dispatch) => ({
  updateRequestFormWhen: (when) => dispatch(updateRequestFormWhen(when))
})

export default connect(mapStateToProps, mapDispatchToProps)(DateRequestButton)
