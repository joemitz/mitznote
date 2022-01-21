import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const Account = (props) => {
  return (
    <div id='account-container'>
      <span>Welcome, {props.username}! </span>
      <br></br>
      <button onClick={props.onLogout}>Logout</button>
    </div>
  )
}

export default hot(module)(Account);