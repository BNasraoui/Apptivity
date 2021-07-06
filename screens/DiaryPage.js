import React, { Component } from 'react';
import { StyleSheet, View, Text,ScrollView, Button, TouchableHighlight, Image, Alert, Picker, Switch } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import { Stitch, RemoteMongoClient, BSON} from 'mongodb-stitch-react-native-sdk';
import {styles} from '../styles/styles';
import {Calendar} from 'react-native-calendars';
import DialogInput from 'react-native-dialog-input';
import { thisExpression } from '@babel/types';
//import { userInfo } from 'os';

/**
 * DiaryPage is the component where an admin can edit an existing user.
 */
export default class DiaryPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			tableHead: ['Start', 'End', 'Activity', 'Monitor', ''],
			tableData: [
			// put default data here: e.g.
			// ['9:00', '9:30', 'run', 'on', ''],
			// ['10:00', '10:30', 'run', 'off', ''],
            ],
			alertVisible: false,
			formAnimationDialog: false,
			alertAnimationDialog: false,
			startTimeDialog: false,
			endTimeDialog: false,
			activityDialog: false,
            startTime: "",
			endTime: "",
            activity: "",
			switchValue: false,
			switchValueMonitor: false,
			errorMessage: "",
			epoch: 30,
			activities: ["Run", "Swim", "Cycle", "Wheel"],
			date: this.convertDate(dateSelectedDiaryPage.dateString)
		};
		/* Initialise the Mongo DB connection and get collections from DB */
		this.initialise();
	}

	initialise() {
	this.setState({
		tableData: []
	});

		/* Constants to this page */
	const stitchApp = Stitch.defaultAppClient;
	const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
	const userActivityCollection = mongodb.db('OutOfTheBlue').collection('user_data');
	const userCredentialCollection = mongodb.db('OutOfTheBlue').collection('user_research_credentails');

	const query = {"user_id" : loggedInUser, "date" : this.state.date};
	
	userActivityCollection.find(query).toArray()
  		.then(items => {
			// console.log(`Successfully found ${items.length} documents.`)
			// console.log("THIS IS THE ITEM: " + items[0].startTime);
			var i;
			for (i = 0; i < items.length; i++) {
				this.state.tableData[i] = [items[i].startTime,
										   items[i].endTime,
										   items[i].activity,
										   items[i].switchValue, '']
			}

			this.setState({
				tableData: this.state.tableData
			}, () => {
				console.log("DONE!")
			});
		})
		.catch(err => console.error(`Failed to find document: ${err}`))		
	}

	/**
	 * @description a pop up with the row index in the message
	 * @param index: the row index which is passed in
	 * @returns: void -> pop up dialog
	 */
	_alertIndex(index) {
		Alert.alert(`This is row ${index + 1}`
		);
	}

	/**
	 * @description Checks with the user if they wish to delete 
	 * a diary entry
	 * @param index: the table row index which is passed in
	 * @returns: void -> pop up dialog
	 */
	deleteActivityPrompt = (index) => {
		Alert.alert(
			`Remove entry`,
			'Are you sure you wish to remove this diary entry?',
			[
			{
				text: 'Cancel',
				onPress: () => console.log("Cancel pressed"),
				style: 'cancel',
			},
			{text: 'OK', onPress: () => this.deleteActivity(index)},
			],
			{cancelable: false},
		);
	}

	/**
	 * @description Does the item deletion from the this.state.tableData 
	 * variable
	 * @param index: the table row index to be deleted
	 * @returns void
	 */
	deleteActivity = (index) => {
		console.log("Ok pressed");

		const stitchApp = Stitch.defaultAppClient;
		const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
		const userActivityCollection = mongodb.db('OutOfTheBlue').collection('user_data');

		const query = {"user_id" : loggedInUser,
					   "date" : this.state.date,
					   "startTime" : this.state.tableData[index][0]};

		// delete thingo from DB
		userActivityCollection.deleteOne(query)
            .then(result => console.log(`Successfully deleted activity ${result}`))
			.catch(err => console.error(`Failed to remove the activity: ${err}`))
			
			this.setState({
				tableData: this.state.tableData.filter((item, j) => index !== j)
			});
	}

	/**
	 * @description Checks the this.state.startTime, this.state.endTime and
	 * this.state.activity variables are set correctly before adding them to the
	 * this.state.tableData variable.
	 * @param void
	 * @returns void
	 */
	checkFields() {
		if((this.state.startTime == "") || 
		(this.state.endTime == "") ||
		(this.state.activity == "")) {
			this.setState({
				errorMessage: "Some fields haven't been filled"
			});
			return false
		}

		if (this.valueOfString(this.state.startTime) >= this.valueOfString(this.state.endTime)) {
			this.setState({
				errorMessage: "Start time must be before end time"
			});
			return false
		}
		return true
	}

	/**
	 * @description After user submits the completed activity the data is saved
	 * to this.state.tableData which is then rendered on the table.
	 * @param void
	 * @return void
	 */
	addActivity = () => {

		var tempVal = "";
		if (this.state.switchValueMonitor == true) {
			tempVal = "on";
		} else {
			tempVal = "off";
		}

		this.setState({
			switchValue: tempVal,			
		}, () => {
			this.state.tableData.push([
			this.state.startTime,
			this.state.endTime,
			this.state.activity,
			this.state.switchValue, '']);
		})
		
		// the database stuff
        const stitchApp = Stitch.defaultAppClient;
        const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
        const userActivityCollection = mongodb.db('OutOfTheBlue').collection('user_data');

        const addUserData = {
            user_id: loggedInUser,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            activity: this.state.activity,
			switchValue: tempVal,
			switchValueMonitor: this.state.switchValueMonitor, //dont need this
            date: this.state.date
        }
        userActivityCollection.insertOne(addUserData)
            .then(result => {
                const { matchedCount, modifiedCount } = result;
                if (matchedCount && modifiedCount) {
                    console.log(`Successfully added the activity.`)
                }
            })
            .catch(err => console.error(`Failed to added the activity: ${err}`))

		console.log("------------add pressed------------");
		console.log("start time temp " + this.state.startTime);
		console.log("end time temp " + this.state.endTime);
		console.log("activity temp " + this.state.activity);
		console.log("monitorVal temp " + this.state.switchValue);

		this.setState({
			tableData: this.state.tableData
		}, () => {
			this.forceUpdate();
			this.clearForm();
		})
	}

	/**
	 * @description Clears the form/pop up dialog variables after an activity
	 * has been submitted on cancelled
	 * @param void
	 * @return void
	 */
	clearForm = () => {
		this.setState({
			startTime: false,
			endTime: false,
			activity: false,
			switchValueMonitor: false,
			errorMessage: ""
		});
	}

	/**
	 * @description Sets the this.state.startTime variable when a new activity
	 * start time is chosen
	 * @param itemValue: the new start time formatted as "HH:MM am/pm"
	 * @return void
	 */
	setStartTime = (itemValue) => {
	
		this.setState((state, props) => ({
			startTime: itemValue
		 }), ()=>{
			//after callback
			console.log("picker value " + itemValue);
			console.log("start time " + this.state.startTime);
		 });
		
	}

	/**
	 * @description Sets the this.state.endTime variable when a new activity
	 * end time is chosen
	 * @param itemValue: the new end time formatted as "HH:MM am/pm"
	 * @return void
	 */
	setEndTime = (itemValue) => {
		// this.setState({endTimeTemp: itemValue});
		this.setState((state, props) => ({
			endTime: itemValue
		 }), ()=>{
		   //after callback
			console.log("picker value " + itemValue);
			console.log("end time " + this.state.endTime);
		 });
		
	}

	/**
	 * @description Sets the this.state.activity variable when a new activity
	 * is chosen
	 * @param itemValue: the new activity which is a string
	 * @return void
	 */
	setActivity = (itemValue) => {
		// this.setState({activityTemp: itemValue});
		this.setState((state, props) => ({
			activity: itemValue
		 }), ()=>{
		   //after callback
		   console.log("picker activity: " + itemValue);
		   console.log("activity: " + this.state.activity); 
		 });	
	}
	
	/**
	 * @description Sets the this.state.switchMonitorValue variable when the
	 * toggle bar is changed
	 * @param value: the switch value
	 * @return void
	 */
	setMonitor = (value) => {
		// this.setState({switchValueMonitor: value});
		this.setState((state, props) => ({
			switchValueMonitor: value
		 }), ()=>{
		   //after callback 
		   console.log("monitor value " + this.state.switchValueMonitor);
		 });
	}

	convertDate(str1){
		// str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
		console.log(`iniiiiit: ${str1}`);
		var yr1   = parseInt(str1.substring(0,4));
		var mon1  = parseInt(str1.substring(5,7));
		var dt1   = parseInt(str1.substring(8,10));
		var date1 = new Date(yr1, mon1-1, dt1);
		console.log(`convertDDD: ${date1}`);
		return date1;
	}

	dateStr(date){
		return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
	}

	prettyDate(date){
		let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var weekDay  = days[date.getDay()];
		var month = months[date.getMonth()];
		return `${weekDay} ${date.getDate()} ${month} ${date.getFullYear()}`
	}

	addDays(days) {
		var date = new Date(this.state.date);
		date.setDate(date.getDate() + days);
		return date;
	}


	/**
	 * @description wrapper that will move the calender date on the page forward
	 * @param: void
	 * @returns: void
	 */
	forwardDate = () => {
		// Alert.alert(`move calendar forward`);
		
		this.setState((state, props) => ({
			date: this.addDays(1)
		 }), ()=>{
		   //after callback 
		   console.log(`Forward: ${this.prettyDate(this.state.date)}`);
		   this.initialise();
		 });
	}

	/**
	 * @description wrapper that will move the calender date on the page backward
	 * @param: void
	 * @returns: void
	 */
	backwardDate = () => {
		// Alert.alert(`move calendar backward`);

		this.setState((state, props) => ({
			date: this.addDays(-1)
		 }), ()=>{
		   //after callback 
		   console.log(`Backward: ${this.prettyDate(this.state.date)}`);
		   this.initialise();
		 });
	}

	/**
	 * @description Returns the 24hr time from the string `HH:MM am/pm`
	 * as a number (xxxx)
	 * @param timeString: a string in the form `HH:MM am/pm`
	 * @returns int: an integer in the form xxxx
	 */
	valueOfString = (timeString) => {
		console.log(timeString)
		if (timeString == "12:00 am"){ // hardcoded case
			return 2400;
		} else if (timeString == "00:00 am") {
			return 0;
		}
		
		var addOn = 0;
		timeString = timeString.replace(/^0+/, ''); // removes leading 0's
		timeString = timeString.replace(":", ""); // removes semi-colons

		if (timeString.includes("am")){ // in the am
			timeString = timeString.replace(" am", "");

		} else if (timeString.includes("pm")) { // in the pm
			timeString = timeString.replace(" pm", "");
			if (parseInt(timeString, 10) < 1200) { 
				addOn = 1200;
			}
		}
		console.log(parseInt(timeString, 10) + addOn);
		return parseInt(timeString, 10) + addOn;
	}

	/**
	 * @description Generates the options for the start and end time pickers
	 * when adding a new activity
	 * @param void
	 * @returns items: an array of times
	 */
	getTimeItems() {
		var items = [];
		items.push(<Picker.Item key={1} value={""} label={"Scroll here"} />);
		var key = 1; 
		var increments = 60/this.state.epoch; // 24hours * minutes/hour / minutes
		for (j=0;j<24;j++) { //handles the hours
			for (i=0;i<increments;i++) { // handles the minutes
				key++;
				var value = j*100 + i*this.state.epoch;
				var suffix = "am";
				var labelVal = value;
				if (j >= 12) {
					suffix = "pm";
					if(j > 12) {
						labelVal -= 1200;
					}
				}
				var hours = Math.floor(labelVal/100);
				var minutes = (i*this.state.epoch)
				if (hours < 10) {
					hours = `0${hours}`
				}
				if (minutes < 10) {
					minutes = `0${minutes}`
				}
				var label = `${hours}:${minutes} ${suffix}`;
				// console.log(`key: ${key} \nlabel: ${label}`);
			items.push(<Picker.Item key={key} value={label} label={label} />);
			}
		}
		key++;
		items.push(<Picker.Item key={key} value={"12:00 am"} label={"12:00 am"} />);
		return items; 
	}

	/**
	 * @description Generates the options for the activity picker
	 * when adding a new activity
	 * @param void
	 * @returns items: an array of activities
	 */
	getActivityItems() {
		var items = [];
		items.push(<Picker.Item key={1} value={""} label={"Scroll here"} />);
		var key = 1; 
		var increments = this.state.activities.length;
		for (i=0;i<increments;i++) { // handles the minutes
			key++;
		items.push(<Picker.Item key={key} value={this.state.activities[i].toLowerCase()} label={this.state.activities[i]} />);
		}
		return items; 
	}

	/**
	 * @description The render method which builds the components
	 * @param: void
	 * @returns react native components
	 */
	render() {
		// element used to create the delete button next to a table entry
		const state = this.state;
		const element = (data, index) => (
		<TouchableHighlight
		style={styles.btn}
		onPress={() => this.deleteActivityPrompt(index)}
		>
			<Image
				style={styles.btn}
				source={require('../assets/delete.png')}
				resizeMode='contain'
			/>
		</TouchableHighlight>
		);
	 
		return (
		  <View style={styles.container}>

		  {/* Date label, back and forth buttons*/}
		  <View
		  style={styles.groupDiaryPage}

		  >

		  {/* backward date button*/}
		  <TouchableHighlight
			style={styles.arrowBtn}
			onPress={this.backwardDate}>
				<Image
					style={styles.arrowBtn}
					source={require('../assets/backward.png')}
					resizeMode='contain'
				/>
			</TouchableHighlight>
			
			{/* date text */}
			<Text
			style={{fontSize: 20}}>
				 {this.prettyDate(this.state.date)}
			</Text>

			{/* forward date button*/}
			<TouchableHighlight
			style={styles.arrowBtn}
			onPress={this.forwardDate}>
				<Image
					style={styles.arrowBtn}
					source={require('../assets/forward.png')}
					resizeMode='contain'
				/>
			</TouchableHighlight>

		  </View>

		  	{/* Diary table */}
			<Table borderStyle={{borderColor: 'transparent'}}>
			  <Row data={state.tableHead} style={styles.headDiaryPage} textStyle={styles.textDiaryPage} widthArr={state.widthArr}/>
			  {
				state.tableData.map((rowData, index) => (
				  <TableWrapper key={index} style={styles.rowDiaryPage}>
					{
					  rowData.map((cellData, cellIndex) => (
						<Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.textDiaryPage}/>
					  ))
					}
				  </TableWrapper>
				))
			  }
			</Table>

			{/* Add button */}
			<View
			style={styles.groupDiaryPage}>
				<TouchableHighlight
				style={styles.addBtn}
				onPress={() => {
					this.setState({
						formAnimationDialog: true,
					});
				}}
				>
					<Image
						style={styles.addBtn}
						source={require('../assets/add.png')}
						resizeMode='contain'
					/>
				</TouchableHighlight>
			</View>
			
			{/* pop up dialog for adding a new activity */}
			<Dialog
				// onTouchOutside={() => {
				// 	this.setState({ scaleAnimationDialog: false });
				// }}
				width={0.9}
				height={0.9}
				visible={this.state.formAnimationDialog}
				dialogAnimation={new ScaleAnimation()}
				onHardwareBackPress={() => {
					console.log('onHardwareBackPress');
					this.setState({ formAnimationDialog: false });
					return true;
				}}
				dialogTitle={
					<DialogTitle
						title="Adding new activity"
						hasTitleBar={false}
					/>
				}
				actions={[
					<DialogButton
						text="DISMISS"
						onPress={() => {
							this.setState({ formAnimationDialog: false });
						}}
						key="button-1"
					/>,
				]}>
				<DialogContent>
				<ScrollView>
					<View
					style={styles.group}
					>
						<Text>
							Start Time:
						</Text>
						<Text>
							{this.state.startTime}
						</Text>

						{/* <Picker
							selectedValue={this.state.startTime}
							style={{height: 30, width: 200}}
							onValueChange={
								// this.handleFormChange
								(itemValue, itemIndex) =>
								this.setStartTime(itemValue)
							}
							mode={"dialog"}
							prompt="pick a start time"
							>
							{this.getTimeItems()}
							{/* <Picker.Item label="" value="" />
							<Picker.Item label="11:00am" value="11:00" />
							<Picker.Item label="11:30am" value="11:30" />
							<Picker.Item label="12:00pm" value="12:00" />
							<Picker.Item label="12:30pm" value="12:30" />
						<Picker.Item label="1:00pm" value="13:00" /> */}
						{/* </Picker> */}
					</View>

					<Button
						title="Choose time"
						onPress={() => {
							this.setState({ 
								startTimeDialog: true 
							});
						}}
						key="button-1"
					/>

					<View
					style={styles.group}
					>
						<Text>
							End Time:
						</Text>
						<Text>
							{this.state.endTime}
						</Text>
						{/* <Picker
							selectedValue={this.state.endTime}
							style={{height: 30, width: 200}}
							onValueChange={
								(itemValue, itemIndex) =>
								this.setEndTime(itemValue)
							}
							mode={"dialog"}
							prompt="pick a end time"
							>
							{this.getTimeItems()} */}
							{/* <Picker.Item label="" value="" />
							<Picker.Item label="11:30am" value="11:30" />
							<Picker.Item label="12:00pm" value="12:00" />
							<Picker.Item label="12:30pm" value="12:30" />
							<Picker.Item label="1:00pm" value="13:00" />
							<Picker.Item label="1:30pm" value="13:30" /> */}
						{/* </Picker> */}
					</View>

					<Button
						title="Choose time"
						onPress={() => {
							this.setState({ 
								endTimeDialog: true 
							});
						}}
						key="button-2"
					/>

					<View
					style={styles.group}
					>
						<Text>
							Activity:
						</Text>
						<Text>
							{this.state.activity}
						</Text>
						{/* <Picker
							selectedValue={this.state.activity}
							style={{height: 30, width: 200}}
							onValueChange={
								// this.handleFormChange
								(itemValue, itemIndex) =>
								this.setActivity(itemValue)
							}>
							{this.getActivityItems()} */}
							{/* <Picker.Item label="" value="" />
							<Picker.Item label="Run" value="run" />
							<Picker.Item label="Swim" value="swim" />
							<Picker.Item label="Cycle" value="cycle" />
							<Picker.Item label="Wheel" value="wheel" /> */}
						{/* </Picker> */}
					</View>

					<Button
						title="Choose activity"
						onPress={() => {
							this.setState({ 
								activityDialog: true 
							});
						}}
						key="button-3"
					/>

					<View
					style={styles.group}
					>
						<Text>
							Monitor On/Off:
						</Text>
						<Switch
						onValueChange = {this.setMonitor}
						value = {this.state.switchValueMonitor}
						/>
					</View>

					<View
					style={[styles.group, {padding: 20}]}
					>
						<Button
							title="Cancel"
							onPress={() => {
								this.clearForm();
								this.setState({ 
									formAnimationDialog: false 
								});
							}}
							key="button-1"
						/>

						<Button
							title="Submit"
							onPress={() => {
								if (this.checkFields() == false) {
									this.setState({
										alertVisible: true,
									});
								} else {
									this.addActivity();
									this.setState({ 
										formAnimationDialog: false
									});
								}
							}}
							key="button-2"
						/>
					</View>
					</ScrollView>
				</DialogContent>
			</Dialog>

			{/* pop up dialog for error checking if the user 
			has filled in the form correctly -> has an error message */}
			<Dialog
				onTouchOutside={() => {
					this.setState({ alertVisible: false });
				}}
				width={0.9}
				height={0.3}
				visible={this.state.alertVisible}
				dialogAnimation={new ScaleAnimation()}
				onHardwareBackPress={() => {
					console.log('onHardwareBackPress');
					this.setState({ alertVisible: false });
					return true;
				}}
				dialogTitle={
					<DialogTitle
						title="New activity not finished"
						hasTitleBar={false}
					/>
				}
				actions={[
					<DialogButton
						text="DISMISS"
						onPress={() => {
							this.setState({ alertAnimationDialog: false });
						}}
						key="button-1"
					/>,
				]}>
				
				<DialogContent>
					<View
					style={{alignItems: 'center', padding: 20}}
					>
						<Text>
							{this.state.errorMessage}
						</Text>
					</View>

					<View
					style={{alignItems: 'center', padding: 20}}
					>
						<Button
							title="Ok"
							onPress={() => {
								this.setState({ alertVisible: false });
							}}
							key="button-1"
						/>
					</View>
				</DialogContent>
			</Dialog>

			{/* dialog for start time */}				
			<Dialog
				onTouchOutside={() => {
					this.setState({ startTimeDialog: false });
				}}
				width={0.9}
				height={0.3}
				visible={this.state.startTimeDialog}
				dialogAnimation={new ScaleAnimation()}
				onHardwareBackPress={() => {
					console.log('onHardwareBackPress');
					this.setState({ startTimeDialog: false });
					return true;
				}}
				dialogTitle={
					<DialogTitle
						title="Choose a start time"
						hasTitleBar={false}
					/>
				}
				actions={[
					<DialogButton
						text="DISMISS"
						onPress={() => {
							this.setState({ startTimeDialog: false });
						}}
						key="button-1"
					/>,
				]}>
				
				<DialogContent>
					<View
					style={styles.dialogStyle}
					>
						<Picker
							selectedValue={this.state.startTime}
							style={styles.pickerStyle}
							itemStyle={{height: 80}}
							onValueChange={
								// this.handleFormChange
								(itemValue, itemIndex) =>
								this.setStartTime(itemValue)
							}
							mode={"dialog"}
							prompt="pick a start time"
							>
							{this.getTimeItems()}
						</Picker>

					</View>

					<View
					style={{alignItems: 'center', padding: 20}}
					>
						<Button
							title="Confirm"
							onPress={() => {
								this.setState({ startTimeDialog: false });
							}}
							key="button-1"
						/>
					</View>
				</DialogContent>
			</Dialog>

			{/* dialog for end time */}				
			<Dialog
				onTouchOutside={() => {
					this.setState({ endTimeDialog: false });
				}}
				width={0.9}
				height={0.3}
				visible={this.state.endTimeDialog}
				dialogAnimation={new ScaleAnimation()}
				onHardwareBackPress={() => {
					console.log('onHardwareBackPress');
					this.setState({ endTimeDialog: false });
					return true;
				}}
				dialogTitle={
					<DialogTitle
						title="Choose a end time"
						hasTitleBar={false}
					/>
				}
				actions={[
					<DialogButton
						text="DISMISS"
						onPress={() => {
							this.setState({ endTimeDialog: false });
						}}
						key="button-1"
					/>,
				]}>
				
				<DialogContent>
					<View
					style={styles.dialogStyle}
					>
						<Picker
							selectedValue={this.state.endTime}
							style={styles.pickerStyle}
							itemStyle={{height: 80}}
							onValueChange={
								// this.handleFormChange
								(itemValue, itemIndex) =>
								this.setEndTime(itemValue)
							}
							mode={"dialog"}
							prompt="pick a end time"
							>
							{this.getTimeItems()}
						</Picker>

					</View>

					<View
					style={{alignItems: 'center', padding: 20}}
					>
						<Button
							title="Confirm"
							onPress={() => {
								this.setState({ endTimeDialog: false });
							}}
							key="button-1"
						/>
					</View>
				</DialogContent>
			</Dialog>

			{/* dialog for activity picker */}				
			<Dialog
				onTouchOutside={() => {
					this.setState({ activityDialog: false });
				}}
				width={0.9}
				height={0.3}
				visible={this.state.activityDialog}
				dialogAnimation={new ScaleAnimation()}
				onHardwareBackPress={() => {
					console.log('onHardwareBackPress');
					this.setState({ activityDialog: false });
					return true;
				}}
				dialogTitle={
					<DialogTitle
						title="Choose an activity"
						hasTitleBar={false}
					/>
				}
				actions={[
					<DialogButton
						text="DISMISS"
						onPress={() => {
							this.setState({ activityDialog: false });
						}}
						key="button-1"
					/>,
				]}>
				
				<DialogContent>
					<View
					style={styles.dialogStyle}
					>
						<Picker
							selectedValue={this.state.activity}
							style={styles.pickerStyle}
							itemStyle={{height: 60}}
							onValueChange={
								// this.handleFormChange
								(itemValue, itemIndex) =>
								this.setActivity(itemValue)
							}
							mode={"dialog"}
							prompt="pick an activity"
							>
							{this.getActivityItems()}
						</Picker>

					</View>

					<View
					style={{alignItems: 'center', padding: 20}}
					>
						<Button
							title="Confirm"
							onPress={() => {
								this.setState({ activityDialog: false });
							}}
							key="button-1"
						/>
					</View>
				</DialogContent>
			</Dialog>
			
		</View>
		)}
	}