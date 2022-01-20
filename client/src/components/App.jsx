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
      username: '',
      notes: [],
      noteID: '',
      title: '',
      text: ''
    };
    this.getNotes = this.getNotes.bind(this);
  }

  componentDidMount() {
    cookies.check((username) => {
      this.setState({ username: username, loggedIn: true, error: '' });
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
      : this.setState({ username: username, loggedIn: true, error: '' });
      this.getNotes(username)
    });
  }

  onLogout() {
    cookies.clear(() => {
      this.setState({ loggedIn: false });
    });
  }

  onCreate(title, text) {
    request.create(this.state.username, title, text, err => {
      err ? console.log(err) : this.getNotes(this.state.username);
    })
  }

  onDelete(noteID) {
    this.setState({ title: '', text: '' })
    request.destroy(this.state.username, noteID)
      .then(() => this.getNotes(this.state.username))
      .catch((err) => console.log(err));
  }

  getNotes(username) {
    request.read(username)
      .then(notes => {
        notes = notes.data.reverse();
        this.setState({ notes })
      })
      .catch(err => console.log(err));
  }

  selectNote(noteID) {
    this.setState({ noteID });
    this.state.notes.forEach(note => {
      if (noteID === note.id) {
        this.setState({ title: note.title, text: note.text });
      }
    });
  }

  onUpdate(text) {
    this.setState({ text });
    request.put(this.state.username, this.state.noteID, text)
      .then(() => this.getNotes(this.state.username))
      .catch((err) => console.log('err'));
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <p>Welcome, {this.state.username}!</p>
          <button onClick={this.onLogout.bind(this)}>Logout</button>
          <List notes={this.state.notes}
                selectNote={this.selectNote.bind(this)
          }/>
          <Viewer notes={this.state.notes}
                  noteID={this.state.noteID}
                  onDelete={this.onDelete.bind(this)}
                  title={this.state.title}
                  text={this.state.text}
                  onUpdate={this.onUpdate.bind(this)}
          />
          <Editor onCreate={this.onCreate.bind(this)}/>
          <br></br>
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