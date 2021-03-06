import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const Login = (props) => {

  const clickHandler = (event) => {
    event.preventDefault();
    let username = event.currentTarget.form[0].value;
    let password = event.currentTarget.form[1].value;
    props.onLogin(username, password)
  }

  return (
    <div id='login-container'>
      <h3>Log in:</h3>
      <form>
        <label>Username: </label>
        <input type='text' name='username' id='username'></input>
        <br></br>
        <label>Password: </label>
        <input type='password' name='password' id='password'></input>
        <br></br><br></br>
        <button onClick={clickHandler}>Submit</button><span> {props.error}</span>
      </form>
      <br></br>
      <span>No account? </span>
      <button onClick={props.renderSignUp}>Sign Up!</button>
    </div>
  );
}

export default hot(module)(Login);