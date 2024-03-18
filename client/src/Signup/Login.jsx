import { GoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { actionTypes } from '../userStore';
import { redirect } from 'react-router-dom';

export default function Login(){

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
      <div className="w-96 mx-auto flex flex-col h-[30vh] justify-between mt-10">
        <div>
          <h1 className="text-3xl font-medium">Hello Stranger</h1>
          <p className="text-md text-gray-400">
            Sign in to discover great news, post thoughtful comments and more!
          </p>
        </div>
        <div className="mx-8">
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => {
              // do something
            }}
          />
        </div>
      </div>
    );
  } else {
    return redirect('/');
  }

}