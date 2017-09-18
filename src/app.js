import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { authenticated: null }
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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    });
  }

  // Make the spinner centered on the screen
  renderContent() {
    switch (this.state.authenticated) {
      case true:
        return (
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}


export default App;
