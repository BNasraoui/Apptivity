import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import Instructions from '../screens/Instructions'
import LoginUser from '../screens/LoginUser'
import LoginAdmin from '../screens/LoginAdmin'
import Login from '../screens/Login'
import Home from '../screens/Home'
import Admin from '../screens/Admin'
import CreateUser from '../screens/CreateUserPage'
import EditUser from '../screens/EditUserPage'
import User from '../screens/User'
import DiaryPage from '../screens/DiaryPage'
import Activities from '../screens/Activites'
import Calender from '../screens/Calender'
import CalenderAdmin from '../screens/CalenderAdmin'
import DataGraph from '../screens/DataGraphPage'
import AdminSettings from '../screens/AdminAccountSettings'
import UserSettings from '../screens/UserAccountSettings'
import Monitor from '../screens/Monitor'
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabsUser from './TabsUser'
import TabsAdmin from './TabsAdmin'
// Navigation page is the Stack navigator for the entire app
export default function Navigation() {
    return (
        <AppContainer />
  );
}

const AuthenticationNavigator = createStackNavigator(
  { 
    Home:{screen: Home},
    Instructions:{screen: Instructions},
    LoginAdmin:{screen: LoginAdmin},
    LoginUser: {screen: LoginUser},
    Login: {screen: Login},
    Admin :{screen: Admin},
    AdminSettings: {screen: AdminSettings},
    UserSettings: {screen: UserSettings},
    User : {screen: User},
    CreateUser:{screen: CreateUser},
    EditUser: {screen :EditUser},
    DiaryPage : {screen :DiaryPage},
    Activities:{ 
        screen : Activities,
        navigationOptions:() => ({
            header: null,
      }),
    },
    Calender : {screen: Calender},
    CalenderAdmin : {screen: CalenderAdmin},
    DataGraph : {screen: DataGraph},
    AppUserNavigator : {screen:TabsUser},
    TabsUser : {screen:TabsUser},
    AppNavigator : {screen:TabsAdmin},
    TabsAdmin: {screen:TabsAdmin},
    
  },
)


 const AppContainer = createAppContainer(AuthenticationNavigator);
    

