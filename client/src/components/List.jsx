import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const List = (props) => {

  const clickHandler = (event) => {
    let noteID = event.target.id;
    props.selectNote(noteID);
  }

  if (props.notes.length > 0) {
    return (
      <div id='list-container'>
        <ul>
          {props.notes.map(note => {
            return <li id={note.id} onClick={clickHandler}>{note.title}</li>
          })}
        </ul>
      </div>
    )
  } else {
    return (
      <div id='app-container'>
        <ul>
        </ul>
      </div>
    )
  }
}

export default hot(module)(List);