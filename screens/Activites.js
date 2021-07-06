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
import {styles} from '../styles/styles';
import DialogInput from 'react-native-dialog-input';

/**
 * DiaryPage is the component where an admin can edit an existing user.
 */
export default class DiaryPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			tableHead: ['Start', 'End', 'Activity', 'Monitor'],
			tableData: [
			// data will look like
			['9:00', '9:30', 'run', 'on'],
			['10:00', '10:30', 'run', 'off'],
			],
			startTime: "",
			endTime: "",
			activity: "",
			switchValue: false,

			};
	}

	/**
	 * @description wrapper that will move the calender date on the page forward
	 * @param: void
	 * @returns: void
	 */
	forwardDate = () => {
		Alert.alert(`move calender forward`
		);
	}

	/**
	 * @description wrapper that will move the calender date on the page backward
	 * @param: void
	 * @returns: void
	 */
	backwardDate = () => {
		Alert.alert(`move calender backward`
		);
	}

	/**
	 * @description The render method which builds the components
	 * @param: void
	 * @returns react native components
	 */
	render() {
		const state = this.state;
	 
		return (
		  <View style={styles.container}>

		  {/* Date label, back and forth buttons*/}
		  <View
		  style={styles.groupDiaryPage}

		  >
		  <TouchableHighlight
			style={styles.arrowBtn}
			onPress={this.backwardDate}>
				<Image
					style={styles.arrowBtn}
					source={require('../assets/backward.png')}
					resizeMode='contain'
				/>
			</TouchableHighlight>

			<Text
			style={{fontSize: 20}}>
				 {/* bookingDate = day */}
				 { ' 15th September 2019 ' }
			</Text>

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
						<Cell key={cellIndex} data={cellData} textStyle={styles.textDiaryPage}/>
					  ))
					}
				  </TableWrapper>
				))
			  }
			</Table>
		</View>
		)}
	}