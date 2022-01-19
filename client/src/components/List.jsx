import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const List = (props) => {

  const clickHandler = (event) => {
    let noteIndex = event.target.id;
    props.selectNote(noteIndex);
  }

  let count = 0

  if (props.notes.length > 0) {
    return (
      <div>
        <ul>
          {
            props.notes.map(note => {
              let noteIndex = count;
              count++;
              return <li id={noteIndex} onClick={clickHandler}>{note.title}</li>
            })
          }
        </ul>
      </div>
    )
  } else {
    return (
      <div>
        <ul>
        </ul>
      </div>
    )
  }
}

export default hot(module)(List);