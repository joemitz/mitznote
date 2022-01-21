import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const Editor = (props) => {

  const deleteHandler = (event) => {
    event.preventDefault();
    props.onDelete(props.noteID);
  }

  const changeHandler = (event) => {
    props.onUpdate(event.target.value);
  }

  return (
    <div id='editor-container'>
      <div id='title'>{props.title}</div>
      <form>
        <textarea value={props.text} onChange={changeHandler}></textarea>
      </form>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  )
}

export default hot(module)(Editor);