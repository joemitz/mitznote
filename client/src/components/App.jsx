import React, { Component } from 'react';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import * as request from '../requests.js';
import { hot } from 'react-hot-loader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      signUp: false,
      error: ''
    }
  }

  componentDidMount() {
    request.checkCookies(() => {
      this.setState({ error: '', loggedIn: true });
    });
  }

  renderSignUp() {
    this.setState({ signUp: true, error: '' });
  }

  onSignUp(username, password) {
    request.signup(username, password, err => {
      err ? this.setState({ error: err }) : this.setState({ error: '', signUp: false });
    });
  }

  onLogin(username, password) {
    request.login(username, password, err => {
      err ? this.setState({ error: err }) : this.setState({ error: '', loggedIn: true });
    });
  }

  onLogout() {
    request.deleteCookies(() => {
      this.setState({ loggedIn: false });
    });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <h1>You're logged in, hurray!</h1>
          <button onClick={this.onLogout.bind(this)}>Logout</button>
        </div>
      );

    } else if (this.state.signUp) {
      return (
        <SignUp onSignUp={this.onSignUp.bind(this)} error={this.state.error} />
      );

    } else {
      return (
        <Login onLogin={this.onLogin.bind(this)} renderSignUp={this.renderSignUp.bind(this)} error={this.state.error} />
      );
    }
  }
}

export default hot(module)(App);