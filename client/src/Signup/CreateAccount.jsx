import { GoogleLogin } from '@react-oauth/google';

export default function CreateAccount(){
  const handleLogin = response => {
    fetch('http://localhost:3001/users/login', {
      method : 'POST',
      body: JSON.stringify({
        'token' : response.credential
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    });
  };

  return (
    <GoogleLogin
      onSuccess={handleLogin}
  
      onError={() => {
      // do something
      }}
  
    />
  );
}