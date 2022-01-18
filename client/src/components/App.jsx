import React from 'react';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loggedIn: false,
      signUp: false
    }
  }

  onSignUp() {
    this.setState({ signUp: true });
  }

  onLogin() {
    this.setState({ loggedIn: true });
  }

  render() {

    if (this.state.loggedIn) {
      return (
        <div>
          <h1>you're logged in, hurray!</h1>
        </div>
      );

    } else if (this.state.signUp) {
      return (
        <SignUp onLogin={this.onLogin.bind(this)} />
      );

    } else {
      return (
        <Login onSignUp={this.onSignUp.bind(this)} />
      );
    }
  }
}

export default App;