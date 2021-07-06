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
//  Calendar Page is the page where the user can select different dates
export default class Calender extends Component {

    constructor(props) {
    super(props);
    this.state = {};
    // Binding the onDayPress function
    this.onDayPress = this.onDayPress.bind(this);
  }
  // onDayPress(day) is function 
    onDayPress(day) {
        // global.dateSelectedDiaryPage = day.dateString;
        global.dateSelectedDiaryPage = day;
      // Will navigate to the diary page when any date is selected, with a bookingDate (value)
        this.props.navigation.navigate('DiaryPage', { bookingDate : day }),
        this.setState({
            selected: day.dateString
    }
    );
  }
  
    render() {
        return (
          // Calendar Title
            <View style={styles.container}>
                <View style={styles.containerAdmin}>
                    <Text style={styles.title12} >
                        Calendar
                    </Text>
            </View>
            {/* Calendar component is imported from react-native-calendars */}
            <Calendar
                onDayPress={this.onDayPress}
                style={styles.calendar}
                hideExtraDays
                // Marks the selected date
                markedDates={{[this.state.selected]: {selected: true}}}
                // Calendar styles
                theme={{
                selectedDayBackgroundColor: 'blue',
                todayTextColor: 'blue',
                arrowColor: 'blue',
          }}
        />
      </View>
    );
  }
}
 
