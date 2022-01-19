import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const List = (props) => {

  if (props.notes.length > 0) {
    return (
      <div>
        <ul>
          {
            props.notes.map(note => {
              return <li>{note.title}</li>
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