export const getNavigationOptions = (title, backgroundColor, color) => ({
  title,
  headerTitle: title,
  headerStyle: {
    backgroundColor,
  },
  headerTitleStyle: {
    color,
    fontFamily: 'Avenir-Black'
  },
  headerTintColor: color,
});

export const getNavigationOptionsWithAction = (title, backgroundColor, color, headerLeft) => ({
  title,
  headerStyle: {
    backgroundColor,
  },
  headerTitleStyle: {
    color,
    fontFamily: 'Avenir-Black'
  },
  headerTintColor: color,
  headerLeft,
});

export const getDrawerNavigationOptions = (title, backgroundColor, titleColor, drawerIcon) => ({
  title,
  headerTitle: 'Arcade City',
  headerStyle: {
    backgroundColor,
  },
  headerTitleStyle: {
    color: titleColor,
    fontFamily: 'Avenir-Black'
  },
  headerTintColor: titleColor,
  drawerLabel: title,
  drawerIcon,
});

export const getDrawerConfig = (drawerWidth, drawerPosition, initialRouteName) => ({
  drawerWidth,
  drawerPosition,
  initialRouteName,
});
