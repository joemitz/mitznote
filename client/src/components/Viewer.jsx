import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const Viewer = (props) => {

  const clickHandler = (event) => {
    event.preventDefault();
    props.onDelete(props.noteID);
  }

  let title = '';
  let text = '';

  if (props.notes.length && props.noteID) {

    props.notes.forEach(note => {
      if (note.id === props.noteID) {
        title = note.title;
        text = note.text;
      }
    })
  }

  return (
    <div>
      <form>
        <input id='title' name='title' value={title}></input>
        <br></br><br></br>
        <textarea id='text' name='text' rows='10' value={text}></textarea>
      </form>
      <button onClick={clickHandler}>Delete</button>
    </div>
  )
}

export default hot(module)(Viewer);