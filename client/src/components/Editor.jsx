import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const Editor = (props) => {

  const clickHandler = (event) => {
    event.preventDefault();
    let title = event.currentTarget.form[0].value;
    let text = event.currentTarget.form[1].value;
    props.onCreate(title, text);
  }

  return (
    <div>
      <form>
        <input id='title' name='title'></input>
        <br></br><br></br>
        <textarea id='text' name='text' rows='10'></textarea>
        <br></br><br></br>
        <button onClick={clickHandler}>Create</button>
        <br></br>
      </form>
    </div>
  )
}

export default hot(module)(Editor);