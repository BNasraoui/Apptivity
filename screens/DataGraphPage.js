import React from 'react';
import { Image, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import { styles, BaseText, PersonalisedActivity } from '../styles/styles.js';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit'
import { array } from 'prop-types';
import { Stitch, RemoteMongoClient, BSON } from "mongodb-stitch-react-native-sdk";
// const screenWidth = Dimensions.get('window').width


/**
 * DataGraph is the component where an user and admin can see the users activity.
 */
export default class DataGraphPage extends React.Component {

	// Setting state variables for this page
	constructor(props) {
		super(props);
    	this.state = {
			epoch: "Weekly",
			activities: ["cycle", "run", "swim", "wheel"],
			activitiesCount: [0,0],
			analysisText: "",
			color1: 'white',
			color2: 'black',
			color3: 'black',
			backgroundColor1: 'grey',
			backgroundColor2: 'white',
			backgroundColor3: 'white',
			selected: 1,
			styleIndex: 1
		};
		this.getUserActivities();		
	}

	/**
	 * @description This function changes the colour of the "weekly", "monthly" & 
	 * "total" buttons on the data graph page used to switch the graphs
	 * x axis units
	 * @param selection a value 1, 2, 3 used to indicate "weekly", "monthly" & 
	 * "total" respectively
	 * @returns void
	 */
    changeColor = (selection) => {
        switch (selection) {
            case 1:
                this.setState({
                    selected: selection,
                    color1: 'white',
                    color2: 'black',
                    color3: 'black',
                    backgroundColor1: 'grey',
                    backgroundColor2: 'white',
                    backgroundColor3: 'white',
                    epoch: "Weekly",
                    styleIndex: 1
                });
                break;

            case 2:
                this.setState({
                    selected: selection,
                    color1: 'black',
                    color2: 'white',
                    color3: 'black',
                    backgroundColor1: 'white',
                    backgroundColor2: 'grey',
                    backgroundColor3: 'white',
                    epoch: "Monthly",
                    styleIndex: 2
                });
                break;

            case 3:
                this.setState({
                    selected: selection,
                    color1: 'black',
                    color2: 'black',
                    color3: 'white',
                    backgroundColor1: 'white',
                    backgroundColor2: 'white',
                    backgroundColor3: 'grey',
                    epoch: "Yearly",
                    styleIndex: 3
                });
				break;
		}
		this.getActivitiesCount();
    }
     //Returns an array of the users activities that appends the default activities
    getUserActivities = () => {
        const stitchApp = Stitch.defaultAppClient;
        const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');

        // Get collection from MongoDB
        const userCredentialsCollection = mongodb.db('OutOfTheBlue').collection('user_research_credentials');

        // Find user whose id = id entered
        const query = { "user_id": loggedInUser };

        // Find user details from database
        userCredentialsCollection.findOne(query)
            .then(item => {
                //Update actvities array with user's personalised activities stored in the database
                var arrayTemp = this.state.activities.concat(item.personalised_activities);
				this.setState({ activities: arrayTemp }, 
					() => {
						console.log(`acts: ${this.state.activities}`)
						this.getActivitiesCount();
					}
				)
            })
            .catch(err => {
                console.log(`Failed to update the item: ${err}`);
                // Alert user if there is an error
                Alert.alert("Failed to find user. Please check details and try again.");
            })
    }

     // Returns a date containing the minimum date of the epoch range
    setMinDateEpoch = (epochRange) => {
        var dateValue = new Date();
        dateValue.setDate(dateValue.getDate() - epochRange);

        return dateValue;
    }

    getActivitiesCount = () => {

		const stitchApp = Stitch.defaultAppClient;
        const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');

        // Get collection from MongoDB
		const userActivitiesCollection = mongodb.db('OutOfTheBlue').collection('user_data');
		
        // initialise activities
		var tempArray1 = [];
		
		//Get date value ranges the epoch
		console.log(`EPOCH: ${this.state.epoch}`);
		var currentDate = new Date();
		var minDate = new Date();
		if (this.state.epoch == "Weekly") { minDate = this.setMinDateEpoch(7) }
		else if (this.state.epoch == "Monthly") { minDate = this.setMinDateEpoch(30) }
		else { minDate = this.setMinDateEpoch(365) }

		console.log(currentDate);
		console.log(minDate);

		// Get the value 
		console.log(`activs: ${this.state.activities}`)
		for (let i = 0; i < this.state.activities.length; i++) {
			const query = {
				"user_id": loggedInUser,
				"activity": this.state.activities[i],
				"date" : {
					$lte : currentDate, 
					$gte : minDate
				}
		    }

			userActivitiesCollection.count(query)
				.then(item => {
                    console.log(`i: ${i}, count: ${item}`)
                    if (item == null) { tempArray1.push(0) }
                    else { tempArray1.push(item) }
				})
        }

		this.setState({
			activitiesCount : tempArray1
		})
    }

	/**
	 * @description The render method which builds the components
	 * @param: void
	 * @returns react native components
	 */
    render() {
        return (
            <View style={styles.container}>

                {/* Data Graph Text */}
                <View style={styles.groupDataGraphPage}>
                    <Text style={styles.titleDataGraph} >
                        Activities Completed
					</Text>
                </View>

                {/* Data Graph box */}
                <View style={styles.groupDataGraphPage}>
					{/* {this.getUserActivities()} */}
					{/* {this.getActivitiesCount()} */}
          
                    <BarChart
                        data={{
                            labels: this.state.activities,
                            
                            datasets: [
                                {
                                data: this.state.activitiesCount
                                },
                            ],           
                        }}
                        width={0.95 * Dimensions.get('window').width} // from react-native
                        height={0.5 * Dimensions.get('window').height}
                        chartConfig={{
                            backgroundColor: '#4184cc',
                            backgroundGradientFrom: '#599feb',
                            backgroundGradientTo: '#2c69ab',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>

                {/* Data epoch buttons */}
                <View style={styles.groupDataGraphPage}>
                    <TouchableHighlight
                        onPress={() => this.changeColor(1)}
                        style={this.state.styleIndex === 1 ? styles.dataEpochSelected : styles.dataEpochUnselected}>
                        <Text style={[{
                            color: this.state.color1,
                            backgroundColor: this.state.backgroundColor1,
                            fontSize: 20,
                            padding: 10
                        }]} >
                            Weekly
						</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={() => this.changeColor(2)}
                        style={this.state.styleIndex === 2 ? styles.dataEpochSelected : styles.dataEpochUnselected}>
                        <Text style={[{
                            color: this.state.color2,
                            backgroundColor: this.state.backgroundColor2,
                            fontSize: 20,
                            padding: 10
                        }]} >
                            Monthly
						</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={() => this.changeColor(3)}
                        style={this.state.styleIndex === 3 ? styles.dataEpochSelected : styles.dataEpochUnselected}>
                        <Text style={[{
                            color: this.state.color3,
                            backgroundColor: this.state.backgroundColor3,
                            fontSize: 20,
                            padding: 10
                        }]} >
                            Yearly
						</Text>
                    </TouchableHighlight>
                </View>

                {/* Personalised Activity UI */}
                <BaseText>
                    Analysis: You have done the required amount of exercise for this period.
                </BaseText>

            </View>
        );
    }
}