import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

const Viewer = (props) => {

  const deleteHandler = (event) => {
    event.preventDefault();
    props.onDelete(props.noteID);
  }

  const changeHandler = (event) => {
    props.onUpdate(event.target.value);
  }

  return (
    <div>
      <form>
        <input type='text' value={props.title}></input>
        <br></br><br></br>
        <textarea rows='10' value={props.text} onChange={changeHandler}></textarea>
      </form>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  )
}

export default hot(module)(Viewer);