import React, {Component} from 'react';
import {
  Image,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Alert,
  Button,
  AppRegistry,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { styles } from '../styles/styles.js';
import DialogInput from 'react-native-dialog-input';

export default class Home extends React.Component { 
    // Hiding the navigation header
    static navigationOptions = {
        header: null,
}

  // Starting states
	state =
	{
    // Don't show dialog box at start
		isDialogVisible: false
  }
  
  // Functions
  /* Logout function */
  logout() {
    // Set logged in user to empty
    loggedInUser = "";
    // Navigate to home
    this.props.navigation.navigate('Home');
  }

	// Bring up prompt asking user to enter ID
	askID = () => {
		this.showDialog(true);
	}
	
	// Showing dialogue box with text input for ID
	showDialog(isShow) {
		this.setState({isDialogVisible: isShow});
	}

  /* Getting data matching Study ID */
  // TODO NEED DATABASE
	sendInput(inputText) {
		// TODO
		// Hide dialog box
    this.showDialog(false);	
    // TODO 
    // Go to calender page corresponding to study ID
    this.props.navigation.navigate('AppNavigator')
	}


  render() {
  return (
  
  <View style={styles.container}>
      <View style={styles.containerAdmin}>
          <Text style={styles.title12} >
              Hello ADMIN
          </Text>
      </View>
      {/* Account Settings Page */}
      <TouchableOpacity
          style={styles.AccountSettings}
          onPress={() => this.props.navigation.navigate('AdminSettings')}>
          <Text style={{color:'white', alignSelf:'center'}}> Account Settings </Text>
      </TouchableOpacity>
	{/* Create User button for creating new users */}
      <TouchableOpacity
          style={styles.CreateUser}
          onPress={() => this.props.navigation.navigate('CreateUser')}>
              <Text style={{color:'white', alignSelf:'center'}}> Create User </Text>
      </TouchableOpacity>
    {/* Edit User button for editing existing users */}
      <TouchableOpacity
          style={styles.CreateUser}
          onPress={() => this.props.navigation.navigate('EditUser')}>
              <Text style={{color:'white', alignSelf:'center'}}> Edit User </Text>
      </TouchableOpacity>
    {/* TODO Moniter User page */}
      <TouchableOpacity
          style={styles.CreateUser}
          onPress={() => this.askID()}>
              <Text style={{color:'white', alignSelf:'center'}}> Monitor User </Text>
      </TouchableOpacity>
      {/* Logout button - TODO database functionality */}
	  <TouchableOpacity
               style={styles.AccountSettings}
               onPress={() => this.logout()}>
                  <Text style={{textAlign: 'center', color:'white'}}> Logout </Text>
           </TouchableOpacity>


      {/* Dialog box to input new StudyId */}
      <DialogInput isDialogVisible={this.state.isDialogVisible}
          title={"Monitoring User Data"}
          message={"Enter Study ID"}
          hintInput ={"Enter ID Here"}
          submitInput={ (inputText) => {this.sendInput(inputText)} }
          closeDialog={ () => {this.showDialog(false)}}>
      </DialogInput>

</View>
  
 
  )
}
}



