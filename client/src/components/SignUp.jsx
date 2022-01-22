import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const SignUp = (props) => {

  const clickHandler = (event) => {
    event.preventDefault();
    let username = event.currentTarget.form[0].value;
    let password = event.currentTarget.form[1].value;
    props.onSignUp(username, password)
  }

  return (
    <div>
      <h3>Sign up:</h3>
      <form>
        <label>Username: </label>
        <input type='text' name='username' id='username'></input>
        <br></br>
        <label>Password: </label>
        <input type='password' name='password' id='password'></input>
        <br></br><br></br>
        <button onClick={clickHandler}>Submit</button><span> {props.error}</span>
      </form>
    </div>
  );
}

export default hot(module)(SignUp);