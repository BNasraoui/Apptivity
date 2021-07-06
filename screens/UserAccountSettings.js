import React from 'react';
import { Alert, View, TextInput, TouchableHighlight } from 'react-native';
import { styles, BaseText, PersonalisedActivity } from '../styles/styles.js';
import { Stitch, RemoteMongoClient, BSON, UserPasswordAuthProviderClient} from 'mongodb-stitch-react-native-sdk';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* UserAccountSettings is the component where a patient can edit their account details. */
export default class UserAccountSettings extends React.Component {

	// Header
	static navigationOptions = {
        title: 'Account Settings'
	}

	// Starting states
	state =
	{   
        // Email value
        email: "",
        // New email value
        newEmail: "",
        // Password value
        password: "",
        // New password value
        newPassword: ""
	}

	// Functions

    // Function to load in the user's email.
    loadEmail() {
        //TODO
    }

    // Function that checks for errors on the user side. This function should be called before querying the database. Returns boolean indicating if there are any errors or not.
	checkErrors() {
		// Check empty fields
		if (this.state.newEmail === "") {
			Alert.alert("Please enter a new email.");
			return false;
		} else if (this.state.newPassword === "") {
            Alert.alert("Please enter a new password.");
			return false;
        }
		return true;
    }

    // Functions that updates the user account details
    updateAccount = () => {
        //TODO

        // Check for user errors
		if(this.checkErrors() === false) {
			return;
        }
        // Alert user of update and navigate back to main hub
        Alert.alert('Account successfully updated.');
        this.props.navigation.navigate('User');
    }

	// Function to get a collection from MongoDB
	getMongoCollection() {
		const stitchApp = Stitch.defaultAppClient;
		const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');

		// Get the collection from MongoDB
        return userCredentialsCollection = mongodb.db('OutOfTheBlue').collection('user_research_credentials')
	}
    
	// End Functions

	render() {
		return (
			/* Component of whole screen */
	        <View style={styles.containerIntial}>

                {/* Email UI */}
                <View style={[styles.group, styles.borderBottom]}>
                    <BaseText>
                        Email:
	                </BaseText >
                    <BaseText style={{color:'black', backgroundColor: 'white', width: '50%'}}>
                        {this.state.email}
	                </BaseText>
                </View>
                {/* New Email UI */}
                <View style={[styles.group, styles.borderBottom]}>
                    <BaseText>
                        New Email:
	                </BaseText>
                    <TextInput
                        style={{backgroundColor: 'white', width: '50%'}}
                        placeholder="Enter New Email Here"
                        onChangeText={(newEmail) => this.setState({newEmail})}
                        value={this.state.newEmail}
                    />
                </View>
                {/* Password UI */}
                <View style={[styles.group, styles.borderBottom]}>
                    <BaseText>
                        Password:
	                </BaseText>
                    <TextInput
                        style={{backgroundColor: 'white', width: '50%'}}
                        placeholder="Enter Password Here"
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                {/* New Password UI */}
                <View style={[styles.group, styles.borderBottom]}>
                    <BaseText>
                        New Password:
	                </BaseText>
                    <TextInput
                        style={{backgroundColor: 'white', width: '50%'}}
                        placeholder="Enter New Password Here"
                        onChangeText={(newPassword) => this.setState({newPassword})}
                        value={this.state.newPassword}
                        secureTextEntry={true}
                    />
                </View>
                {/* Submit button */}
                <TouchableHighlight
                    style={styles.submitButton}
                    onPress={this.updateAccount}
                >
	                {/* Icon in middle of button */}
	                <Ionicons style={{alignSelf: 'center', color: '#FFFFFF'}}name='md-checkmark-circle' size={60}/>
                </TouchableHighlight>
	        </View>
		);
    }
}

