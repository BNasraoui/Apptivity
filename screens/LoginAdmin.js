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
import { Stitch, loginWithCredential, UserPasswordCredential } from "mongodb-stitch-react-native-sdk";
import { styles } from '../styles/styles.js';

export default class Login extends Component {

    static navigationOptions = {
        title: 'Login as Admin'
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
        Stitch.initializeDefaultAppClient('outofthebluestitch-nbavr').then(client => {
            this.setState({ client });

            if (client.auth.isLoggedIn) {
                this.setState({ currentUserId: client.auth.user.id })
            }
        });
    }
    _onPressLogin = async () => {

        const { username, password } = this.state
        this.check_is_admin(username)
        try {
            const { auth } = Stitch.defaultAppClient
            const user = await auth.loginWithCredential(new UserPasswordCredential(username, password))
            console.log(`Successfully logged in as user ${user.id}`);
            this.setState({ currentUserId: user.id })
            this.props.navigation.navigate('Admin')
        } catch (err) {
            console.log(`Failed to log in: ${err}`);
            Alert.alert('Error', 'Username or Password is incorrect')
            this.setState({ currentUserId: undefined })
        }
        
        if (this.state.is_admin == false) {
            console.log(`Failed to log in: This user does not have admin privileges`);
            Alert.alert('Error', 'Use the user login to continue')
            this.setState({ currentUserId: undefined })
        }
    }

    check_is_admin(username) {
        const stitchApp = Stitch.defaultAppClient;
        const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');
        const userCredentialsCollection = mongodb.db('OutOfTheBlue').collection('user_research_credentials');
        // Find user whose id = id entered
        const query = {"email": username};

        // Find user details from database
        userCredentialsCollection.findOne(query)
            .then(item => {
                // Update state with values from the database
                this.setState({
                    is_admin: item.is_admin,
                }, () => {
                    if (item.is_admin == false){
                        console.log(`The email ${username} given is for a user account`);
                        // Alert user if there is an error
                        Alert.alert(`The email ${username} given is for a user account. Redirecting to user login`);
                        this.props.navigation.navigate('LoginUser')
                    }
                })
            })
            .catch(err => {
                console.log(`Failed to identify user`);
                // Alert user if there is an error
                Alert.alert("Failed to find user. Please check details and try again.");
            })
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



