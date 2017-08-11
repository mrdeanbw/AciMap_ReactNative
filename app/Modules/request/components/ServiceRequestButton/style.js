import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../../../Theme/'

export default StyleSheet.create({
  button: {
    borderRadius: 10,
    marginVertical: 1,
    marginHorizontal: 1,
    width: 220,
    borderColor: 'rgba(67,154,224,0.85)',
    backgroundColor: 'rgba(67,154,224,0.25)',
    borderWidth: 2,
    height: 44
  },
  buttonText: {
    margin: 8,
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.bold
  },
  requestButtonContainer: {
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 3
  }
})
