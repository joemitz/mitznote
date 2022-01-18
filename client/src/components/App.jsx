import React from 'react';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import * as request from '../requests.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      signUp: false,
      error: ''
    }
  }

  renderSignUp() {
    this.setState({ signUp: true });
  }

  onSignUp(username, password) {
    request.signup(username, password, (err) => {
      err ? this.setState({ error: err }) : this.setState({ error: '', signUp: false });
    });
  }

  onLogin(username, password) {
    request.login(username, password, (err) => {
      err ? this.setState({ error: err }) : this.setState({ error: '', loggedIn: true });
    });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <h1>You're logged in, hurray!</h1>
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

export default App;