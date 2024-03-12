import { Link } from 'react-router-dom';
import home from '../images/home.png';
import search from '../images/search.png';
// import avatar from '../images/avatar.png';
import { useTranslation } from 'react-i18next';
import LANGUAGE from '../constants/lang';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { actionTypes } from '../userStore';
import { useState } from 'react';

export default function Navbar({currentLang, setCurrentLang}) {
  const { t } = useTranslation();
  const [user, setUser] = useState('');

  const onChangeLang = (e) => {
    const langCode = e.target.value;
    setCurrentLang(langCode);
    localStorage.setItem('lang', langCode);
  };

  const dispatch = useDispatch();
  
  useEffect(() => {
    fetch('/users/login').
      then((response) => response.json()).
      then((user) => setUser(user.email)).
      then(() => {
        dispatch({ type: actionTypes.SET_LOGIN });
      });
  }, [dispatch]);

  const logout = () => {
    fetch('/users/logout', { method: 'DELETE' }).
      then((response) => response.json()).
      then((data) => console.log(data)).
      then(() => {
        dispatch({ type: actionTypes.SET_LOGOUT });
      });
  };

  const LOGIN_STATUS = useSelector((state) => state.value);

  if (!LOGIN_STATUS){
    return (
      <nav className="py-1">
        <ul className="flex flex-row justify-between">
          <li className="inline w-1/3">
            <div className="flex flex-row justify-items-start">
              <Link to={`/`}><img className="size-7 p-1" src={home} alt="home icon"/></Link>
              <img className="size-7 p-1 rounded-md" src={search} alt="search icon"/>
              <input className="border my-px" type="text"/>
            </div>
          </li>
          <li className="inline w-1/3 flex justify-items-end">
            <h1 className="text-center w-full">{t('home.title')}</h1>
          </li>
          <li className="inline w-1/3">
            <div className="grid grid-rows-1 justify-items-end">
              <div className="flex flex-row">
                <div>
                  <select 
                    name="selectLanguage"
                    defaultValue={currentLang}
                    onChange={onChangeLang}
                  >
                    {LANGUAGE.map(({key, displayName}) => 
                      <option key={key} value={key}>
                        {displayName}
                      </option>
                    )}
                  </select>
                </div>
                <Link to={`/signup`}><h1>Login</h1></Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="py-1">
        <ul className="flex flex-row justify-between">
          <li className="inline w-1/3">
            <div className="flex flex-row justify-items-start">
              <Link to={`/`}><img className="size-7 p-1" src={home} alt="home icon"/></Link>
              <img className="size-7 p-1 rounded-md" src={search} alt="search icon"/>
              <input className="border my-px" type="text"/>
            </div>
          </li>
          <li className="inline w-1/3 flex justify-items-end">
            <h1 className="text-center w-full">{t('home.title')}</h1>
          </li>
          <li className="inline w-1/3">
            <div className="grid grid-rows-1 justify-items-end">
              <div className="flex flex-row">
                <div>
                  <select 
                    name="selectLanguage"
                    defaultValue={currentLang}
                    onChange={onChangeLang}
                  >
                    {LANGUAGE.map(({key, displayName}) => 
                      <option key={key} value={key}>
                        {displayName}
                      </option>
                    )}
                  </select>
                </div>
                <div>{user}</div>
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}