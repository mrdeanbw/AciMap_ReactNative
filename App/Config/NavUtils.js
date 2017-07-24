import React from 'react'
import DrawerContent from '../Components/DrawerContent'

export const getNavigationOptions = (title, backgroundColor, color) => ({
  title,
  headerTitle: title,
  headerStyle: {
    backgroundColor
  },
  headerTitleStyle: {
    color,
    fontFamily: 'Avenir-Black'
  },
  headerTintColor: color
})

export const getNavigationOptionsWithAction = (title, backgroundColor, color, headerLeft) => ({
  title,
  headerStyle: {
    backgroundColor
  },
  headerTitleStyle: {
    color,
    fontFamily: 'Avenir-Black'
  },
  headerTintColor: color,
  headerLeft
})

export const getDrawerNavigationOptions = (title, backgroundColor, titleColor, drawerIcon) => ({
  title,
  headerTitle: title,
  headerStyle: {
    backgroundColor
  },
  headerTitleStyle: {
    color: titleColor,
    fontFamily: 'Avenir-Black'
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
