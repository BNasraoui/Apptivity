/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Image,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import first from './assets/1.png';
import second from './assets/2.png';
import third from './assets/3.png';
import fourth from './assets/4.png';
import { styles } from '../styles/styles.js';


export default class Instructions extends React.Component {

  // Instruction screen
  static navigationOptions = {
      title: 'Instructions'
  }
  
  render() {
      return (
        // Specifying scroll view for the screen
          <ScrollView>
              <View style={styles.containerInstructions}>
                  <Image style={styles.picIn} source={first}>
                  </Image>
                  <Text style={styles.text7}>1. Wear Monitor</Text>
                  <Image style={styles.picIn1} source={second}>
                  </Image>
                  <Text style={styles.text7}>2. Connect Monitor</Text>
                  <Image style={styles.picIn2} source={third}>
                  </Image>
                  <Text style={styles.text7}>3. Record Data</Text>
                  <Image style={styles.picIn3} source={fourth}>
                  </Image>
                  <Text style={styles.text7}>4. Upload Data</Text>
              </View>
          </ScrollView>
  )
}
}

