import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import * as request from '../requests.js';
import * as cookies from '../cookies.js';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import Nav from './Nav.jsx';
import Create from './Create.jsx';
import List from './List.jsx';
import Editor from './Editor.jsx';
import css from '../styles.css';

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
    this.selectNote = this.selectNote.bind(this);
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
    request.create(this.state.username, title, text)
      .then(res => {
        this.getNotes(this.state.username, res.data);
      })
      .catch(err => console.log(err));
  }

  onDelete(noteID) {
    this.setState({ title: '', text: '' })
    request.destroy(this.state.username, noteID)
      .then(() => this.getNotes(this.state.username))
      .catch((err) => console.log(err));
  }

  getNotes(username, newNoteID = '') {
    request.read(username)
      .then(notes => {
        notes = notes.data.reverse();
        this.setState({ notes })
        this.selectNote(newNoteID);
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
        <div id='app-container'>
          <Nav onLogout={this.onLogout.bind(this)} username={this.state.username}/>
          <div id='columns-container'>
            <div id='left-container'>
              <Create onCreate={this.onCreate.bind(this)}/>
              <List notes={this.state.notes}
                    selectNote={this.selectNote.bind(this)}/>
            </div>
            <div id='right-container'>
              <Editor notes={this.state.notes}
                      noteID={this.state.noteID}
                      onDelete={this.onDelete.bind(this)}
                      title={this.state.title}
                      text={this.state.text}
                      onUpdate={this.onUpdate.bind(this)}/>
            </div>
          </div>
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