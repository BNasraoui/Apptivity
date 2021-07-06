import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Button
} from 'react-native';


import { styles } from '../styles/styles.js';

// User Profile page specifying user functionality
export default class Home extends React.Component {
  
  static navigationOptions = {
    header: null,
  }
  
  /* Logout function */
  logout() {
      // Set logged in user to empty
      loggedInUser = "";
      // Navigate to home
      this.props.navigation.navigate('Home');
  }

  render() {
      return (
          <View style={styles.containerUser}>
              <Text style={styles.title12} >
                  Hello USER
              </Text>
          {/* Account Settings Page */}
          <TouchableOpacity
              style={styles.AccountSettings}
              onPress={() => this.props.navigation.navigate('UserSettings')}>
              <Text style={{color:'white', alignSelf:'center'}}> Account Settings </Text>
          </TouchableOpacity>
          {/* TODO Logout for User */}
          <TouchableOpacity
              style={styles.AccountSettings}
              onPress={() => this.logout()}>
                <Text style={{textAlign: 'center', color:'white'}}> Logout </Text>
          </TouchableOpacity>

	</View>

  )
}
}



