import { GoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { actionTypes } from '../userStore';
import { redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { config } from '../Config';
import { PublicClientApplication } from '@azure/msal-browser';

export default function Login(){
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const publicClientApplication = new PublicClientApplication({
    auth: {
      clientId: config.appId,
      redirectUri: config.redirectUri,
      authority: config.authority
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: true
    }
  });

  const login = async () => {
    try {
      await publicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account'
      });
      dispatch({ type: actionTypes.SET_LOGIN });
    } catch (err){
      dispatch({ type: actionTypes.SET_LOGOUT });
    }
  };

  // const logout = () => {
  //    publicClientApplication.logout();
  // };
  
  useEffect(() => {
    fetch('/api/users/login').
      then((response) => response.json()).
      then(() => {
        dispatch({ type: actionTypes.SET_LOGIN });
      });
  }, [dispatch]);

  const LOGIN_STATUS = useSelector((state) => state.value);

  const handleLogin = response => {
    fetch('/api/authenticate/google', {
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
          <h1 className="text-3xl font-medium">{t('login.strangerTitle')}</h1>
          <p className="text-md text-gray-400">{t('login.strangerText')}</p>
        </div>
        <div className="mx-8">
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => {
              // do something
            }}
          />
          <button onClick={() => login()}>Log In with microsoft</button>
        </div>
      </div>
    );
  } else {
    return redirect('/');
  }

}