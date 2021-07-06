import React, {Component} from 'react';
import {
  Image,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Button,
  AppRegistry,
  ScrollView,
  View,
  Text,

} from 'react-native';
import { styles } from '../styles/styles.js';
import backgroundImage from './assets/child.png';
import { Stitch } from "mongodb-stitch-react-native-sdk";
/**
 * Home is the component which works as an intial screen for both users and admin.
 */
console.disableYellowBox = true;

export default class Home extends React.Component {

 /**
 * Hiding the header
 */
  static navigationOptions = {
    header: null
  }

    constructor(props) {
        super(props);
        this.state = {

        }
        try {
            Stitch.initializeDefaultAppClient('outofthebluestitch-nbavr').then(client => {
                this.setState({ client });
                global.clientGlobal = client;
            });
        } catch (err) {
            console.log(`${err}`)
        }
    }


    /**
 * Home Screen UI
 */

  render() {
     return (
	    // Parent Container
       <View style={styles.container}>
           <Image style={ styles.pic } source={backgroundImage}>
           </Image>
           
           {/* Instruction button */}
           <TouchableOpacity
               style={styles.Info}
               onPress={() => this.props.navigation.navigate('Instructions')}>
                   <Image
	                    style={styles.resizeableImage}
	                    source={require('../assets/info.png')}
	                    resizeMode='contain'
                    />
           </TouchableOpacity> 
           {/* Login button */}
           <TouchableOpacity
               style={styles.buttonLoginAdmin}
               onPress={() => this.props.navigation.navigate('Login')}>
                   <Text style={{color:'white', alignSelf:'center',fontSize:20}}> Login </Text>
           </TouchableOpacity>
           
           {/* Login as User button */}
           {/* <TouchableOpacity
               style={styles.buttonLoginAdmin}
               onPress={() => this.props.navigation.navigate('LoginUser')}>
                   <Text style={{color:'white', alignSelf:'center',fontSize:20}}> Login as User </Text>
           </TouchableOpacity> */}
          {/* Login as Admin button */}
           {/* <TouchableOpacity
               style={styles.buttonLoginUser}
               onPress={() => this.props.navigation.navigate('LoginAdmin')}>
                   <Text style={{color:'white', alignSelf:'center',fontSize:20}}> Login as Admin</Text>
           </TouchableOpacity> */}
       </View>

  )
}
}




