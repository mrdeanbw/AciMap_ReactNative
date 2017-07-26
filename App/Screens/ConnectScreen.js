import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Linking } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Metrics } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome'

class ConnectScreen extends Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.explainer}>Community makes Arcade City strong. Connect with us!</Text>
        <Text style={styles.explainer}>Arcade City Square is our community Facebook group. You can share tips and ideas with fellow Arcade citizens. Feel free to introduce yourself!</Text>
        <View style={{ marginVertical: 15 }}>
          <Icon.Button name='facebook' backgroundColor='#3b5998' onPress={() => Linking.openURL('https://www.facebook.com/groups/ArcadeCitySquare')} style={styles.button}>
            <Text style={styles.buttonText}>&nbsp;Arcade City Square</Text>
          </Icon.Button>
        </View>
        <Text style={styles.explainer}>For news and updates, Like our Arcade City page on Facebook and follow @ArcadeCityHall on Twitter.</Text>
        <View style={{ marginVertical: 15 }}>
          <Icon.Button name='facebook' backgroundColor='#3b5998' onPress={() => Linking.openURL('https://www.facebook.com/ArcadeCityHall')} style={styles.button}>
            <Text style={styles.buttonText}>&nbsp;AC Facebook Page</Text>
          </Icon.Button>
        </View>
        <View style={{ marginTop: 15, marginBottom: 50 }}>
          <Icon.Button name='twitter' backgroundColor='#0084b4' onPress={() => Linking.openURL('https://www.twitter.com/ArcadeCityHall')} style={styles.button}>
            <Text style={styles.buttonText}>&nbsp;@ArcadeCityHall</Text>
          </Icon.Button>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  explainer: {
    fontSize: 16,
    color: Colors.snow,
    fontFamily: 'Avenir-Book',
    marginVertical: 9,
    paddingHorizontal: Metrics.screenWidth * 0.08
  },
  container: {
    flex: 1,
    backgroundColor: Colors.acnavy,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  button: {
    height: 55,
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.snow,
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    fontSize: 20,
    marginVertical: Metrics.baseMargin
  }
})

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(ConnectScreen)
