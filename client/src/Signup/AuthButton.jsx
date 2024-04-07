import React from 'react';
import { config } from '../Config';

function AuthButton({ msalInstance }) {
  const login = async () => {
    try {
      await msalInstance.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account'
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default AuthButton;