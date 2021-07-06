import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { Stitch, RemoteMongoClient, BSON, loginWithCredential, UserPasswordCredential } from "mongodb-stitch-react-native-sdk";
import { styles } from '../styles/styles.js';


export default class Login extends Component {

    static navigationOptions = {
        title: 'Login'
    }

    constructor(props) {
        super(props);
        state = {
            email: '',
            password: '',
        }
    }
    componentDidMount() {
        this._loadClient();
    }
    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    }
    _loadClient() {
        if (clientGlobal.auth.isLoggedIn) {
            this.setState({ currentUserId: clientGlobal.auth.user.id })
        }             
    }
    _onPressLogin = async () => {

        const { username, password } = this.state

        const stitchApp = Stitch.defaultAppClient;
        const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
        const userCredentialsCollection = mongodb.db('OutOfTheBlue').collection('user_research_credentials');
        // Find user whose id = id entered
        // const query = {"email" : username};
        console.log("EMAIL: " + username);
        try {
            const { auth } = Stitch.defaultAppClient
            const user = await auth.loginWithCredential(new UserPasswordCredential(username, password))
            console.log(`Successfully logged in ${user.id}`);
            const query = {"user_id" : user.id};
            global.loggedInUser = user.id;
            this.setState({ currentUserId: user.id })

            // Find user details from database
            userCredentialsCollection.findOne(query)
                .then(item => {
                    console.log(`Found item: ${item}`);
                    // Update state with values from the database
                    if (item.is_admin) {
                        this.props.navigation.navigate('Admin');
                    } else {
                        this.props.navigation.navigate('TabsUser');
                    }
                })
                .catch(err => {
                    console.log(`Failed to identify user: ${username}`);
                    // Alert user if there is an error
                    Alert.alert(`Failed to find user: ${username}`);
                })            
            
        } catch (err) {
            console.log(`Failed to log in: ${err}`);
            Alert.alert('Error', 'Username or Password is incorrect')
            this.setState({ currentUserId: undefined })
        }
        
    }

  render() {
    return (

      <View style={styles.containerLoginAdmin}>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={text => this.setState({ username: text })}/>
        </View>
        
        <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({ password: text })} />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this._onPressLogin()}>
            <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        
      </View>
    );
  }
}



