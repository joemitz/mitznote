import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const Viewer = (props) => {

  // const clickHandler = (event) => {
  //   event.preventDefault();
  //   let title = event.currentTarget.form[0].value;
  //   let text = event.currentTarget.form[1].value;
  //   props.onCreate(title, text);
  // }

  let title = '';
  let text = '';

  if (props.notes.length) {
    title = props.notes[props.selectedNote].title;
    text = props.notes[props.selectedNote].text || '';
  }

  return (
    <div>
      <form>
        <input id='title' name='title' value={title}></input>
        <br></br><br></br>
        <textarea id='text' name='text' rows='10' value={text}></textarea>
      </form>
    </div>
  )
}

export default hot(module)(Viewer);