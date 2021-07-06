import React from 'react';
import { Image, Alert, Switch, Text, View, StyleSheet, TextInput, Picker, TouchableHighlight } from 'react-native';
import { styles, BaseText, PersonalisedActivity } from '../styles/styles.js';
import DialogInput from 'react-native-dialog-input';
import{ Stitch, RemoteMongoClient, BSON} from 'mongodb-stitch-react-native-sdk';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * EditUserPage is the component where an admin can edit an existing user.
 */
export default class EditUserPage extends React.Component {

	// Header
	static navigationOptions = {
        title: 'Edit User'
	}
	
	// Starting states
	state =
	{
		// ID value
		inputID: "",
        // StitchID Value
        stitchID: "",
        // User's email
        email: "",
		// Switches are set to false at the start
		switchValueDataGraph: false,
		switchValueWrist: false,
		switchValueHip: false,
		// Epoch setting, default values is 5
		epoch: "5",
		// Don't show dialogue box at the start
		isDialogVisible: false,
		// Admin or user? Default is user
		is_admin: false, 
		// Personalised Activities
		personalisedActivities: []
	}

	// Functions
	
	// Showing dialogue box with text input for personalised activity
	showDialog(isShow) {
		this.setState({isDialogVisible: isShow});
	}

	/* Adding a new personalised activity */
	addActivity(inputText) {
		// Maximum of 3 personalised activities allowed
		if (this.state.personalisedActivities.length >= 3) {
			Alert.alert("Too many activities!");
			// Hide dialog box
			this.showDialog(false);	
			return;
		}
		// Add new activity to the array
		this.state.personalisedActivities.push(inputText);
		// Hide dialog box
		this.showDialog(false);	
	}

    // Deleting activity
    deleteActivity(index) {
		// Update the personalisedActivities array with removed element at index
		this.state.personalisedActivities.splice(index, 1);
		// Re-render page with new list of personalisedActivities
		this.setState({personalisedActivities: this.state.personalisedActivities});
    }

	// Initialise data from the database
	initialise = () => {
		const stitchApp = Stitch.defaultAppClient;
		const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');

		// Get collection from MongoDB
		const userCredentialsCollection = mongodb.db('OutOfTheBlue').collection('user_research_credentials');

		// Find user whose id = id entered
		const query = {"research_id": this.state.inputID};

		// Find user details from database
		userCredentialsCollection.findOne(query)
			.then(item => {
				// Update state with values from the database
                this.setState({
                    email: item.email,
                    stitchID: item.user_id,
					switchValueDataGraph: item.data_graph_enabled,
					switchValueHip: item.monitor_hip,
					switchValueWrist: item.monitor_wrist,
					epoch: item.epoch_setting,
					is_admin: item.is_admin,
					personalisedActivities: item.personalised_activities
				})
			})
			.catch(err => {
				console.log(`Failed to update the item: ${err}`);
				// Alert user if there is an error
				Alert.alert("Failed to find user. Please check details and try again.");
			})
	}

	// Submitting the information of the user to be saved into the database
	submitUser = () => {
		const stitchApp = Stitch.defaultAppClient;
		const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');

		// Get collection from MongoDB
		const userCredentialsCollection = mongodb.db('OutOfTheBlue').collection('user_research_credentials');

		// Find user whose id = id entered
		const query = {"research_id": this.state.inputID};

		// New values for user details
        const updateUserCredential = {
            user_id: this.state.stitchID,
            research_id: this.state.inputID,
            email: this.state.email,
			data_graph_enabled: this.state.switchValueDataGraph,
			monitor_hip: this.state.switchValueHip,
			monitor_wrist: this.state.switchValueWrist,
			epoch_setting: this.state.epoch,
			is_admin: false, //force the user to always be a user
			personalised_activities: this.state.personalisedActivities
		}

		// Update user details in database
		userCredentialsCollection.updateOne(query, updateUserCredential)
			.then(result => {
				console.log("User with id: "+this.state.inputID+" successfully updated");
				// If successfully edited user, alert user and navigate back to admin page.
				Alert.alert("User with id: "+this.state.inputID+" successfully updated");
        		this.props.navigation.navigate('Admin')
			})
			.catch(err => {
				console.log(`Failed to update the item: ${err}`);
				// Alert user if there is an error
				Alert.alert("Failed to update user. Please check details and try again.");
            })
        
    }

    // Toggling value of data graph switch
	toggleSwitchDataGraph = (value) => {
		this.setState({switchValueDataGraph: value})
	}

	// Toggling value of monitor postion(wrist) switch
	toggleSwitchWrist = (value) => {
	    this.setState({switchValueWrist: value})
	}

	// Toggling value of monitor postion(hip) switch
	toggleSwitchHip = (value) => {
	    this.setState({switchValueHip: value})
	}
	// End Functions

	render() {

		/* Dynamic rendering of personalised activities */
		var PersonalisedActivities = this.state.personalisedActivities.map((activity, index) => {
			return(
			<View key = {index} style={[{width: '33%', flexDirection: 'row', alignItems: 'center'}]}>
				{/* Component showing the activity */}
				<PersonalisedActivity>
					{activity}
				</PersonalisedActivity>
				{/* Delete Button */}
				<TouchableHighlight
					style={styles.deleteButton}
					onPress={() => this.deleteActivity(index)}
				>
					{/* Icon in middle of button */}
                    <Ionicons style={{alignSelf: 'center', color: '#FFFFFF'}} name='md-close-circle' size={20}/>
				</TouchableHighlight>
			</View>
			)
		})


		return (
			/* Component of whole screen */
	        <View style={styles.containerIntial}>

	            {/* ID UI */}
	            <View testID = "StudyIDView" style={[styles.group, styles.borderBottom]}>
		            <BaseText>
		                ID:
	                </BaseText>
		            <TextInput
		                 style={{backgroundColor: 'white', width:'50%'}}
			             placeholder="Enter ID Here"
			             onChangeText={(inputID) => this.setState({inputID})}
			             value={this.state.inputID}
	                />
					{/* Initialise button */}
					<TouchableHighlight
						style={styles.submitButton}
						onPress={this.initialise}
                	>
						{/* Icon in middle of button */}
						<Ionicons style={{alignSelf: 'center', color: '#FFFFFF'}} name='md-refresh-circle' size={60}/>
                	</TouchableHighlight>
				</View>

				{/* Data Graph UI */}
				<View testID = "DataGraphView" style={[styles.group, styles.borderBottom]}>
					<BaseText>
		                Data Graph:
	                </BaseText>
		            <Switch						
						onValueChange = {this.toggleSwitchDataGraph}
						value = {this.state.switchValueDataGraph}
		            />
		        </View>

				{/* Monitor Position UI */}
				<View style={styles.borderBottom}>
					<BaseText style={{paddingTop: 10}}>
		                Monitor Position:
	                </BaseText>
	                <View testID = "WristView" style={styles.group}>
		                <BaseText style={{fontSize: 15}}>
		                    Wrist:
		                </BaseText>
					    <Switch
					        onValueChange = {this.toggleSwitchWrist}
							value = {this.state.switchValueWrist}
					    />
					</View>
					<View testID = "HipView" style={styles.group}>
					    <BaseText style={{fontSize: 15}}>
		                    Hip:
		                </BaseText>
					    <Switch
			                onValueChange = {this.toggleSwitchHip}
							value = {this.state.switchValueHip}
		                />
					</View>
				</View>

				{/* Diary Epoch UI */}
				<View testID = "DiaryEpochView" style={[styles.group, styles.borderBottom]}>
					<BaseText>
		                Diary Epoch:
	                </BaseText>
	                <View style={{backgroundColor: 'white', width:'35%'}}>
						<Picker
							selectedValue = {this.state.epoch}
							onValueChange = {
								(itemValue, itemIndex) =>
								this.setState({epoch: itemValue})
							}>
							<Picker.Item label = "5 mins" value = "5"/>
							<Picker.Item label = "15 mins" value = "15" />
							<Picker.Item label = "30 mins" value = "30" />
						</Picker>
					</View>
				</View>

				{/* Personalised Activity UI */}
                <BaseText style={{paddingTop: 10}}>
                    Personalised Activity:
                </BaseText>
				{/* Render the array of personalised activities */}
				<View testID = "PersonalisedActivitiesContainer" style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
					{ PersonalisedActivities }
				</View>
				<TouchableHighlight
                    style={styles.addButton}
                    onPress={ () => {this.showDialog(true)}}
                >
                    {/* Icon in middle of button */}
                    <Ionicons style={{alignSelf: 'center', color: '#FFFFFF'}} name='md-add-circle' size={40}/>
                </TouchableHighlight>
				{/* Dialog box to input new personalised activities */}
				<DialogInput isDialogVisible={this.state.isDialogVisible}
					title={"Adding New Personalised Acitvity"}
					message={"Enter Personalised Activity"}
					hintInput ={"Enter Activity Here"}
					submitInput={ (inputText) => {this.addActivity(inputText)} }
					closeDialog={ () => {this.showDialog(false)}}>
        		</DialogInput>
                
				{/* Submit button */}
                <TouchableHighlight
                    style={styles.submitButton}
                    onPress={this.submitUser}
                >
	                {/* Icon in middle of button */}
	                <Ionicons style={{alignSelf: 'center', color: '#FFFFFF'}}name='md-checkmark-circle' size={60}/>
                </TouchableHighlight>
	        </View>
		);
    }
}