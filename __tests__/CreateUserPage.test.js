/**
 * @format
 */

import 'react-native';
import React from 'react';
import CreateUserPage from '../screens/CreateUserPage';
import { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

// Snapshot testing when the screen is initially loaded. Run with -u to update snapshot if changes are made
test('inital screen snapshot testing', () => {
	const screen = shallow(<CreateUserPage />);
	expect(toJson(screen)).toMatchSnapshot();
});

// Testing Study ID Components
describe('Study ID tests', () => {
	let screen = shallow(<CreateUserPage />);

	// Testing text is correct
	test('Study ID text', () => {
		// Find the View component containing the required elements
		let component = screen.findWhere(node => node.prop('testID') === 'StudyIDView');
		// Check the text
		expect(component.children('BaseText').prop('children')).toEqual("ID:");
	 });

	// Testing text input is updating state correctly
	test('Input field updating', () => {
		// Default state value is empty
		expect(screen.state('inputID')).toEqual("");
		// Find the View component containing the required elements
		let component = screen.findWhere(node => node.prop('testID') === 'StudyIDView');
		// Find TextInput component
		let textInput = component.children('TextInput');
		// Change the text
		textInput.props().onChangeText("test123");
		// Update screen
		screen.update();
		// Check state is updated correctly
		expect(screen.state('inputID')).toEqual("test123");
	 });

});

// Testing Epoch Components
describe('Epoch tests', () => {
	
	// Testing text is correct
	test('Epoch text', () => {
		let screen = shallow(<CreateUserPage />);
		// Find the View component containing the required elements
		let component = screen.findWhere(node => node.prop('testID') === 'DiaryEpochView');
		// Check the text
		expect(component.children('BaseText').prop('children')).toEqual("Diary Epoch:");
	 });

	// Testing picking 5 mins on epoch is working correctly
	test('Picker five mins', () => {
		let screen = shallow(<CreateUserPage />);
		// Default state value is empty
		expect(screen.state('epoch')).toEqual("");
		// Find the View component containing the required elements
		let component = screen.findWhere(node => node.prop('testID') === 'DiaryEpochView');
		// Find Picker component
		let picker = component.children('View').children('Picker');
		// Find required Picker.Item 
		epochValue = picker.childAt(0).prop('value');
		// Change the picker option
		picker.props().onValueChange(epochValue, 0);
		// Update screen
		screen.update();
		// Check state is updated correctly
		expect(screen.state('epoch')).toEqual("5");
	 });

	// Testing picking 15 mins on epoch is working correctly
	test('Picker fifteen mins', () => {
		let screen = shallow(<CreateUserPage />);
		// Default state value is empty
		expect(screen.state('epoch')).toEqual("");
		// Find the View component containing the required elements
		let component = screen.findWhere(node => node.prop('testID') === 'DiaryEpochView');
		// Find Picker component
		let picker = component.children('View').children('Picker');
		// Find required Picker.Item 
		epochValue = picker.childAt(1).prop('value');
		// Change the picker option
		picker.props().onValueChange(epochValue, 1);
		// Update screen
		screen.update();
		// Check state is updated correctly
		expect(screen.state('epoch')).toEqual("15");
	 });

	// Testing picking 30 mins on epoch is working correctly
	test('Picker thirty mins', () => {
		let screen = shallow(<CreateUserPage />);
		// Default state value is empty
		expect(screen.state('epoch')).toEqual("");
		// Find the View component containing the required elements
		let component = screen.findWhere(node => node.prop('testID') === 'DiaryEpochView');
		// Find Picker component
		let picker = component.children('View').children('Picker');
		// Find required Picker.Item 
		epochValue = picker.childAt(2).prop('value');
		// Change the picker option
		picker.props().onValueChange(epochValue, 2);
		// Update screen
		screen.update();
		// Check state is updated correctly
		expect(screen.state('epoch')).toEqual("30");
	 });

});

// Testing adding personalised activities
describe('Adding personalised activities', () => {
	
	// Testing initial value of personalisedActivities
	test('personalisedActivities initial value', () => {
		let screen = shallow(<CreateUserPage />);
		// Default should be empty
		const expected = [];
		expect(screen.state('personalisedActivities')).toEqual(expect.arrayContaining(expected));
	 });

	test('personalisedActivities adding one activity', () => {
		let screen = shallow(<CreateUserPage />);
		// Check starts as empty
		const expectedEmpty = [];
		expect(screen.state('personalisedActivities')).toEqual(expect.arrayContaining(expectedEmpty));
		// Find DialogInput
		let component = screen.children('DialogInput');
		// Call DialogInput.submitInput with a test activity to add
		component.props().submitInput('test');
		// Update screen
		screen.update();
		// Check state is updated
		const expected = ['test'];
		expect(screen.state('personalisedActivities')).toEqual(expect.arrayContaining(expected));
	});

	test('personalisedActivities adding two activities', () => {
		let screen = shallow(<CreateUserPage />);
		// Check starts as empty
		const expectedEmpty = [];
		expect(screen.state('personalisedActivities')).toEqual(expect.arrayContaining(expectedEmpty));
		// Find DialogInput
		let component = screen.children('DialogInput');
		// Call DialogInput.submitInput with a test activity to add
		component.props().submitInput('test');
		component.props().submitInput('test2');
		// Update screen
		screen.update();
		// Check state is updated
		const expected = ['test', 'test2'];
		expect(screen.state('personalisedActivities')).toEqual(expect.arrayContaining(expected));
	});

	test('personalisedActivities adding three activities', () => {
		let screen = shallow(<CreateUserPage />);
		// Check starts as empty
		const expectedEmpty = [];
		expect(screen.state('personalisedActivities')).toEqual(expect.arrayContaining(expectedEmpty));
		// Find DialogInput
		let component = screen.children('DialogInput');
		// Call DialogInput.submitInput with a test activity to add
		component.props().submitInput('test');
		component.props().submitInput('test2');
		component.props().submitInput('test3');
		// Update screen
		screen.update();
		// Check state is updated
		const expected = ['test', 'test2', 'test3'];
		expect(screen.state('personalisedActivities')).toEqual(expect.arrayContaining(expected));
	});

	test('personalisedActivities limited to three activities', () => {
		let screen = shallow(<CreateUserPage />);
		// Check starts as empty
		const expectedEmpty = [];
		expect(screen.state('personalisedActivities')).toEqual(expect.arrayContaining(expectedEmpty));
		// Find DialogInput
		let component = screen.children('DialogInput');
		// Call DialogInput.submitInput with a test activity to add
		component.props().submitInput('test');
		component.props().submitInput('test2');
		component.props().submitInput('test3');
		component.props().submitInput('test4');
		// Update screen
		screen.update();
		// Check state is updated. Limit of 3 activities, so 4th activity should not be added.
		const expected = ['test', 'test2', 'test3'];
		expect(screen.state('personalisedActivities')).toEqual(expect.arrayContaining(expected));
		expect(screen.state('personalisedActivities')).not.toContain('test4');
	});
});

// Testing deleting personalised activities
describe('Deleting personalised activities', () => {
	
	// Testing initial value of personalisedActivities
	test('personalisedActivities initial value', () => {
		let screen = shallow(<CreateUserPage />);
		// Default should be empty
		const expected = [];
		expect(screen.state('personalisedActivities')).toEqual(expect.arrayContaining(expected));
	 });

	test('personalisedActivities deleting activity', () => {
		let screen = shallow(<CreateUserPage />);
		// Find DialogInput
		let component = screen.children('DialogInput');
		// Call DialogInput.submitInput with a test activity to add
		component.props().submitInput('test');
		component.props().submitInput('test2');
		component.props().submitInput('test3');
		// Update screen
		screen.update();
		// Check state is correct before deleting
		const expected = ['test', 'test2', 'test3'];
		expect(screen.state('personalisedActivities')).toEqual(expect.arrayContaining(expected));
		// Find the View component containing the required elements
		let componentView = screen.findWhere(node => node.prop('testID') === 'PersonalisedActivitiesContainer');
		// Set index of activity to delete
		deleteIndex = 1;
		// Find one of the activities to delete
		let testView = componentView.findWhere(node => node.key() === String(deleteIndex));
		// Find the name of the activity
		let name = testView.children('PersonalisedActivity').prop('children');
		// Press the delete button
		testView.children('TouchableHighlight').props().onPress();
		// Update screen
		screen.update();
		// Check activity is deleted from the array
		expect(screen.state('personalisedActivities')).not.toContain(name);
		// Update expected array
		expected.splice(deleteIndex, 1);
		// Check previous elements are not deleted from the array
		expect(screen.state('personalisedActivities')).toEqual(expect.arrayContaining(expected));
	});

});

// Testing DataGraph Components
describe('DataGraph Components', () => {
	let screen = shallow(<CreateUserPage />);

	// Testing text is correct
	test('DataGraph Text', () => {
		// Find the View component containing the required elements
		let component = screen.findWhere(node => node.prop('testID') === 'DataGraphView');
		// Check the text
		expect(component.children('BaseText').prop('children')).toEqual("Data Graph:");
	 });

	// Testing Switch initial value
	test('DataGraph Switch initial value', () => {
		// Default state value of screen should be false
		expect(screen.state('switchValueDataGraph')).toEqual(false);
		// Find the View component containing the required elements
		let component = screen.findWhere(node => node.prop('testID') === 'DataGraphView');
		// Default Switch value should be false
		expect(component.children('Switch').prop('value')).toEqual(false);
	 });

	// Testing Switch changing value
	test('toggleSwitchDataGraph change value', () => {
		// Find the View component containing the required elements
		let component = screen.findWhere(node => node.prop('testID') === 'DataGraphView');
		// Call the onValueChange with true
		component.children('Switch').props().onValueChange(true);
		// Update the screen
		screen.update();
		// state value of screen should be true
		expect(screen.state('switchValueDataGraph')).toEqual(true);
		// Find the View component containing the required elements
		let componentNew = screen.findWhere(node => node.prop('testID') === 'DataGraphView');
		// Switch value should be true
		expect(componentNew.children('Switch').prop('value')).toEqual(true);
	});
});

// Testing Monitor Position Components
describe('Monitor Position Components', () => {
	let screen = shallow(<CreateUserPage />);

	// Testing Wrist Components
	describe('Wrist Components', () => {
		// Testing text is correct
		test('Wrist Text', () => {
			// Find the View component containing the required elements
			let component = screen.findWhere(node => node.prop('testID') === 'WristView');
			// Check the text
			expect(component.children('BaseText').prop('children')).toEqual("Wrist:");
		});

		// Testing Switch initial value
		test('Wrist Switch initial value', () => {
			// Default state value of screen should be false
			expect(screen.state('switchValueWrist')).toEqual(false);
			// Find the View component containing the required elements
			let component = screen.findWhere(node => node.prop('testID') === 'WristView');
			// Default Switch value should be false
			expect(component.children('Switch').prop('value')).toEqual(false);
		});

		// Testing Switch changing value
		test('toggleSwitchWrist change value', () => {
			// Find the View component containing the required elements
			let component = screen.findWhere(node => node.prop('testID') === 'WristView');
			// Call the onValueChange with true
			component.children('Switch').props().onValueChange(true);
			// Update the screen
			screen.update();
			// state value of screen should be true
			expect(screen.state('switchValueWrist')).toEqual(true);
			// Find the View component containing the required elements
			let componentNew = screen.findWhere(node => node.prop('testID') === 'WristView');
			// Switch value should be true
			expect(componentNew.children('Switch').prop('value')).toEqual(true);
		});
	});

	// Testing Hip Components
	describe('Hip Components', () => {
		// Testing text is correct
		test('Hip Text', () => {
			// Find the View component containing the required elements
			let component = screen.findWhere(node => node.prop('testID') === 'HipView');
			// Check the text
			expect(component.children('BaseText').prop('children')).toEqual("Hip:");
		});

		// Testing Switch initial value
		test('Hip Switch initial value', () => {
			// Default state value of screen should be false
			expect(screen.state('switchValueHip')).toEqual(false);
			// Find the View component containing the required elements
			let component = screen.findWhere(node => node.prop('testID') === 'HipView');
			// Default Switch value should be false
			expect(component.children('Switch').prop('value')).toEqual(false);
		});

		// Testing Switch changing value
		test('toggleSwitchHip change value', () => {
			// Find the View component containing the required elements
			let component = screen.findWhere(node => node.prop('testID') === 'HipView');
			// Call the onValueChange with true
			component.children('Switch').props().onValueChange(true);
			// Update the screen
			screen.update();
			// state value of screen should be true
			expect(screen.state('switchValueHip')).toEqual(true);
			// Find the View component containing the required elements
			let componentNew = screen.findWhere(node => node.prop('testID') === 'HipView');
			// Switch value should be true
			expect(componentNew.children('Switch').prop('value')).toEqual(true);
		});
	});
});