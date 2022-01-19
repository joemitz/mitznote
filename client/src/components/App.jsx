import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import * as request from '../requests.js';
import * as cookies from '../cookies.js';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import Editor from './Editor.jsx';
import List from './List.jsx';
import Viewer from './Viewer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      signUp: false,
      error: '',
      currentUser: '',
      notes: [],
      selectedNote: 0
    };
    this.getNotes = this.getNotes.bind(this);
  }

  componentDidMount() {
    cookies.check((username) => {
      this.setState({ currentUser: username, loggedIn: true, error: '' });
      this.getNotes(username);
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
      err ? this.setState({ error: err })
      : this.setState({ currentUser: username, loggedIn: true, error: '' });
      this.getNotes(username)
    });
  }

  onLogout() {
    cookies.clear(() => {
      this.setState({ loggedIn: false });
    });
  }

  onCreate(title, text) {
    request.create(this.state.currentUser, title, text, err => {
      err ? console.log(err) : this.getNotes(this.state.currentUser);
    })
  }

  getNotes(username) {
    request.read(username)
      .then(notes => {
        notes = notes.data.reverse();
        this.setState({ notes })
      })
      .catch(err => console.log(err));
  }

  selectNote(index) {
    this.setState({ selectedNote: index });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <p>Welcome, {this.state.currentUser}!</p>
          <List notes={this.state.notes} selectNote={this.selectNote.bind(this)}/>
          <Viewer notes={this.state.notes} selectedNote={this.state.selectedNote}/>
          <Editor onCreate={this.onCreate.bind(this)}/>
          <br></br>
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