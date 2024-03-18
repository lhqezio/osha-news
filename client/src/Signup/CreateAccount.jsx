import { GoogleLogin } from '@react-oauth/google';
import home from '../images/home.svg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { actionTypes } from '../userStore';

export default function CreateAccount(){

  const dispatch = useDispatch();
  
  useEffect(() => {
    fetch('/users/login').
      then((response) => response.json()).
      then(() => {
        dispatch({ type: actionTypes.SET_LOGIN });
      });
  }, [dispatch]);

  const LOGIN_STATUS = useSelector((state) => state.value);

  const handleLogin = response => {
    fetch('/authenticate/google', {
      method : 'POST',
      body: JSON.stringify({
        'token' : response.credential
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).
      then(() => window.location = '/');
  };
  if (!LOGIN_STATUS){
    return (
      <div>
        <Link to={`/`}><img className="size-7 p-1" src={home} alt="home icon"/></Link>
  
        <h1>Sign Up to OSHA News!</h1>
        <form action="/authenticate" method="POST">
          <label htmlFor="name">Name: </label>
          <input name="name" type="text"></input>
          <label htmlFor="email">Email: </label>
          <input name="email" type="email"></input>
          <label htmlFor="password">Password: </label>
          <input name="password" type="password"></input>
          <label htmlFor="confirm-password">Confirm Password: </label>
          <input name="confirm-password" type="password"></input>
          <input type="submit"></input>
        </form>
        <h3>OR</h3>
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => {
          // do something
          }}
      
        />
      </div>
    );
  } else {
    return (
      <div>
        <Link to={`/`}><img className="size-7 p-1" src={home} alt="home icon"/></Link>
        <h1>You are already signed in</h1>
      </div>
    );
  }

}