import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import { styles } from '../styles/styles.js';
 //  CalendarAdmin Page is the page where the admin can select different dates
export default class CalenderAdmin extends Component {
  
    constructor(props) {
        super(props);
        this.state = {};
        // Binding the onDayPress function
        this.onDayPress = this.onDayPress.bind(this);
  }
  // onDayPress(day) is function 
    onDayPress(day) {
      // Will navigate to the diary page when any date is selected, with a bookingDate (value)
        this.props.navigation.navigate('Activities', { bookingDate : day }),
        this.setState({
            selected: day.dateString
    });
    
  }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerAdmin}>
                    <Text style={styles.title12} >
                        Monitor Activity
                    </Text>
                </View>
         {/* Calendar component is imported from react-native-calendars */}
		        <Calendar
                    // Calls the onDayPress function
                    onDayPress={this.onDayPress}
                    style={styles.calendar}
                    hideExtraDays
                    // Marks any date selected
                    markedDates={{[this.state.selected]: {selected: true}}}
                    // Calendar styles
                    theme={{
                    selectedDayBackgroundColor: 'blue',
                    todayTextColor: 'blue',
                    arrowColor: 'blue',
                }}/>
            
			</View>
    );
  }
}
 
