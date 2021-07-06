import React from 'react';
import { createStackNavigator,createBottomTabNavigator, createAppContainer,HeaderBackButton } from "react-navigation";
import CalenderAdmin from '../screens/CalenderAdmin'
import DataGraph from '../screens/DataGraphPage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Activities from '../screens/Activites'
import Admin from '../screens/Admin'
// TabsAdmin is the Bottom Tab navigator for Admin
export default class TabsAdmin extends React.Component {
    // Hiding the header
    static navigationOptions = {
        header: null
    }
  
  
    render() {
        const { goBack } = this.props.navigation;
        return <AppContainer/>;
  }
}
// Creating a stack navigation for calendar and nesting it to the TabNavigator
const CalenderStack = createStackNavigator({
    Calender:{ 
      // Specifying the screen for the calendar page and giving it a back button 
        screen : CalenderAdmin,
        navigationOptions:() => ({
        headerLeft:(<HeaderBackButton onPress={()=> goBack()}/>)
 
    }),
  },
  // Specifying screens for Activites 
    Activities:{ 
        screen : Activities,}
});
// Creating a bottom tab navigator
const AppNavigator = createBottomTabNavigator({ 
    Calender:{ screen: CalenderStack,
      navigationOptions:() => ({
      header: null,
      }),
    },
    DataGraph: {screen : DataGraph},
  },
  {
    // Setting default navigation icons 
      defaultNavigationOptions:({navigation}) =>{
          return{
            // IonIcons are import from react-native-vector-icons/Ionicons library
              tabBarIcon:({tintColor})=>{
              const{routeName} = navigation.state
              let IconComponent = Ionicons;
              let iconName;
              if(routeName === "Calender"){
              iconName='md-calendar'
            }
              else if(routeName === "DataGraph"){
                  iconName='ios-pulse'}
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

const AppContainer = createAppContainer(AppNavigator);