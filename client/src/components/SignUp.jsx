import React from 'react';

const SignUp = (props) => {
  return (
    <div>
      <h1>you're signing up</h1>
      <button onClick={props.onLogin}>log in</button>
    </div>
  );
}

export default SignUp;