import React from 'react';

const Login = (props) => {
  return (
    <div>
      <h1>you need to login</h1>
      <button onClick={props.onSignUp}>sign up</button>
    </div>
  );
}

export default Login;