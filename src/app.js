import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { authenticated: null };

  componentWillMount() {
    this.setState({ authenticated: false });
  }

  // Make the spinner centered on the screen
  // There's a bug in Flex and we apparently need to wrap these in a
  // CardSection (https://www.udemy.com/the-complete-react-native-and-redux-course/learn/v4/questions/2121342)
  renderContent() {
    switch (this.state.authenticated) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <CardSection><Spinner size="large" /></CardSection>;
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
