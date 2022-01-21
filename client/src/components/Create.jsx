import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const Create = (props) => {

  const clickHandler = (event) => {
    event.preventDefault();
    let title = event.currentTarget.form[0].value;
    props.onCreate(title, '');
  }

  return (
    <div id='create-container'>
      <form>
        <input name='title'></input>
        <br></br>
        <button onClick={clickHandler}>New Note</button>
      </form>
    </div>
  )
}

export default hot(module)(Create);