import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  Config,
  CognitoIdentityCredentials
} from 'aws-sdk/dist/aws-sdk-react-native';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from '../lib/aws-cognito-identity';
// or react-native-aws-cognito-js
import { Button, Card, CardSection, FormInput, Spinner, FormTextInput } from './common';

const appConfig = {
  region: 'us-east-1',
  IdentityPoolId: 'us-east-1:30e72695-e7b0-4074-a336-5dfde967947c',
  UserPoolId: 'us-east-1_gVQhmP5oF',
  ClientId: '4fnpe8gfohbksqq6oc7fgtorgj',
};

//setting config
Config.region = appConfig.region;

class LoginForm extends Component {
  // State initialization (email, password, error, loading)
  state = { email: '', password: '', error: '', loading: false };

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  onLoginFail() {
    this.setState({
      loading: false,
      error: 'Authentication failed.'
    });
  }

  onButtonPress() {
    console.log('Authenticating user');
    const { email, password } = this.state;

    // Show the spinner
    this.setState({ error: '', loading: true });

    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = {
      UserPoolId: appConfig.UserPoolId,
      ClientId: appConfig.ClientId
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    console.log('Attempting to sign in');
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log(`access token ${result.getAccessToken().getJwtToken()}`);
        this.onLoginSuccess();
      },
      onFailure: (err) => {
        console.log('Sign in failed, attempting to create account');
        console.log(err);
        const attributeList = [
          new CognitoUserAttribute({ Name: 'email', Value: email })
        ];
        userPool.signUp(
          email,
          password,
          attributeList,
          null,
          (err1, result) => {
            if (err1) {
              console.log('Account creating failed');
              console.log(err1);
              this.onLoginFail();
              return;
            }
            console.log('Account creating success');
            console.log(result);
            this.onLoginSuccess();
          }
        );
      },
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <FormInput label="Email">
            <FormTextInput
              placeholder="user@gmail.com"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </FormInput>
        </CardSection>

        <CardSection>
          <FormInput
            label="Password"
          >
            <FormTextInput
              secureTextEntry
              placeholder="password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </FormInput>
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
