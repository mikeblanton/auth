import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';

class App extends Component {
  componentWillMount() {
    console.log('componentWillMount: Initializing firebase');
    firebase.initializeApp({
      apiKey: 'AIzaSyCQFsfp_0Fz3wlrRTtCzpDeincicXAO60s',
      authDomain: 'auth-8919d.firebaseapp.com',
      databaseURL: 'https://auth-8919d.firebaseio.com',
      projectId: 'auth-8919d',
      storageBucket: 'auth-8919d.appspot.com',
      messagingSenderId: '674993967952'
    });
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        <Text>An App</Text>
      </View>
    );
  }
}

export default App;
