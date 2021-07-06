import React from 'react';
import { StyleSheet,Button, Text,TouchableOpacity, View } from 'react-native';
import { createStackNavigator,createBottomTabNavigator, createAppContainer } from "react-navigation";
import Calender from '../screens/Calender'
import DataGraph from '../screens/DataGraphPage'
import User from '../screens/User'
import UserSettings from '../screens/UserAccountSettings'
import Monitor from '../screens/Monitor'
import DiaryPage from '../screens/DiaryPage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home'
// TabsUser is a bottom tab navigation for Users
export default class TabsUser extends React.Component{
    static navigationOptions = {
        header: null
      }

render() {
    return (
        <AppUserContainer />
  );
}
}
// Creating a  Home stack navigator and nesting it to the tab navigator
const HomeStack = createStackNavigator({
    User: {screen: User},
    UserSettings: {screen: UserSettings},
    Home: {screen:Home},
  
})
// Creating a  Calendar stack navigator and nesting it to the tab navigator
const CalenderStack2 = createStackNavigator({
    Calender:{ 
        screen : Calender,
        navigationOptions:() => ({
        header: null,
    }),
  },

    DiaryPage:{ 
        screen : DiaryPage,
    },
    
  });
// Creating bottom tab navigator and nesting it to above Stack navigators
const AppUserNavigator = createBottomTabNavigator(
  { 
    Profile :{screen: HomeStack},
    Calender : {screen: CalenderStack2},
    DataGraph: {screen: DataGraph},
    Monitor : {screen:Monitor},
    
  },{
    // Specifying the dafault navigation options
    defaultNavigationOptions:({navigation}) =>{
        return{
           // IonIcons are import from react-native-vector-icons/Ionicons library
            tabBarIcon:({tintColor})=>{
                const{routeName} = navigation.state
                let IconComponent = Ionicons;
                let iconName;
                if(routeName === "Profile"){
                    iconName ='md-home'
				} 
				else if(routeName === "Calender"){
                    iconName='md-calendar'
				}
				else if(routeName === "DataGraph"){
                    iconName='ios-pulse'
				} 
			    else if(routeName === "Monitor"){
                    iconName='md-bluetooth'
        } 
         //  Displaying IconComponent with chanalizing size and color
        return <IconComponent name={iconName} size={25} color={tintColor} />
      },

    }
  },
  // Tab bar styles
    tabBarOptions: {
        style: {backgroundColor: '#3366CC'},
        activeTintColor: '#FF9800',
        inactiveTintColor: 'white',
  } 
  }
);

const AppUserContainer = createAppContainer(AppUserNavigator);

