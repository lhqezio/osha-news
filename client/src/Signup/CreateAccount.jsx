import { GoogleLogin } from '@react-oauth/google';
import home from '../images/home.svg';
import { Link } from 'react-router-dom';


export default function CreateAccount(){


  const handleLogin = response => {
    fetch('/authenticate', {
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

  return (
    <div>
      <Link to={`/`}><img className="size-7 p-1" src={home} alt="home icon"/></Link>

      <h1>Sign Up to OSHA News!</h1>
      <form>
        <label htmlFor="name">Name: </label>
        <input name="name" type="text"></input>
        <label htmlFor="email">Email: </label>
        <input name="email" type="email"></input>
        <label htmlFor="password">Password: </label>
        <input name="password" type="password"></input>
        <label htmlFor="confirm-password">Confirm Password: </label>
        <input name="confirm-password" type="password"></input>
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
}