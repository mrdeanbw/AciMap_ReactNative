import React from 'react'
import { Text } from 'react-native'
import DrawerContent from '../Components/DrawerContent'

export const getNavigationOptions = (title, backgroundColor, color) => ({
  title,
  headerTitle: <Text style={{fontFamily: 'Montserrat-Bold', color: 'white', marginLeft: 15, fontSize: 18}}>{title}</Text>,
  headerStyle: {
    backgroundColor
  },
  headerTitleStyle: {
    color,
    fontFamily: 'Montserrat-Bold'
  },
  headerTintColor: color
})

export const getNavigationOptionsWithAction = (title, backgroundColor, color, headerLeft) => ({
  title,
  headerTitle: <Text style={{fontFamily: 'Montserrat-Bold', color: 'white', marginLeft: 15, fontSize: 18}}>{title}</Text>,
  headerStyle: {
    backgroundColor
  },
  headerTitleStyle: {
    color,
    fontFamily: 'Montserrat-Bold'
  },
  headerTintColor: color,
  headerLeft
})

export const getDrawerNavigationOptions = (title, backgroundColor, titleColor, drawerIcon) => ({
  title,
  headerTitle: <Text style={{fontFamily: 'Montserrat-Bold', color: 'white', marginLeft: 15, fontSize: 18}}>{title}</Text>,
  headerStyle: {
    backgroundColor
  },
  headerTitleStyle: {
    color: titleColor,
    fontFamily: 'Montserrat-Bold'
  },
  headerTintColor: titleColor,
  drawerLabel: title,
  drawerIcon 
})

export const getDrawerConfig = (drawerWidth, drawerPosition, initialRouteName, drawerRoutes) => ({
  drawerWidth,
  drawerPosition,
  initialRouteName,
  contentComponent: ({navigation}) => <DrawerContent navigation={navigation} routes={drawerRoutes} />
})
