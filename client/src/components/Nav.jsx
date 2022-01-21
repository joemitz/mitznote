import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const Nav = (props) => {
  return (
    <div id='nav-container'>
      <span>Welcome, {props.username}! </span>
      <button onClick={props.onLogout}>Logout</button>
    </div>
  )
}

export default hot(module)(Nav);