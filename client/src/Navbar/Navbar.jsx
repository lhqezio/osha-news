import search from '../images/search.png';
import SearchBox from './SearchBox/SearchBox';
import { useTranslation } from 'react-i18next';
import LANGUAGE from '../constants/lang';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { actionTypes } from '../userStore';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function Navbar(){
  const { i18n, t } = useTranslation();
  const[searchTerm, setSearchTerm] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);  
  const [showUserBox, setShowUserBox] = useState(false);
  const [user, setUser] = useState('');
  const [userIcon, setUserIcon] = useState('');
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'
  );

  useEffect(() => {
    i18n.changeLanguage(currentLang);
  }, [i18n, currentLang]);

  function handleShowSearchBox(e){
    setSearchTerm(e.target.value);
    if(e.target.value.trim() !== '') {
      setShowSearchBox(true);
    } else {
      setShowSearchBox(false);
    }
  }

  const onChangeLang = (e) => {
    const langCode = e.target.value;
    setCurrentLang(langCode);
    localStorage.setItem('lang', langCode);
  };

  const dispatch = useDispatch();
  
  useEffect(() => {
    fetch('/api/users/user-info').
      then((response) => response.json()).
      then((user) => {
        setUser(user.name);
        setUserIcon(user.image);
      }).
      then(() => {
        dispatch({ type: actionTypes.SET_LOGIN });
      });
  }, [dispatch]);

  const logoutUser = () => {
    fetch('/api/users/logout', { method: 'DELETE' }).
      then(() => {
        dispatch({ type: actionTypes.SET_LOGOUT });
        window.location.reload();
      });
  };

  function hideSearchBox(){
    setShowSearchBox(false);
  }

  const LOGIN_STATUS = useSelector((state) => state.value);

  function LoginLinks({className, linkName}) {
    return (
      <>
        <img className={`size-7 mb-4 lg:mb-0 lg:mx-2 rounded-full ${className}`} 
          src={userIcon}></img>

        <Link to={`/profile/${user}`} 
          className={`${className} mb-4 lg:mb-0`}>{linkName}</Link>

        <Link to={'/post'} className={`lg:mx-2 mb-4 lg:mb-0 ${className}`}>
          {t('home.newArticle')}
        </Link>
        <Link to={'/'} className={`${className} mb-4 lg:mb-0`} button 
          onClick={logoutUser}>
          {t('home.logout')}
        </Link>
      </>
    );
  }

  return (
    <div>
      <nav className="my-4">
        <ul className="flex flex-row justify-between">
          <li className="inline w-1/3">
            <div className="flex flex-row justify-items-start">
              <Link to="/search" className="block md:hidden">
                <img className="size-5 md:size-6 my-1 mr-2"  
                  src={search} alt="search icon"/>
              </Link>
              <img className="size-5 md:size-6 my-1 mr-2 hidden md:block" 
                src={search} alt="search icon"/>
              <input className="border rounded-sm border-gray-400 p-1 font-light hidden md:block" 
                type="text" value={searchTerm}
                onChange={handleShowSearchBox}
                onBlur={hideSearchBox}
                onFocus={handleShowSearchBox}
              />
            </div>
          </li>
          <li className="w-1/3 flex justify-items-end">
            <Link to="/" className="text-lg md:text-xl text-center w-full my-1">
              {t('home.title')}</Link>
          </li>
          <li className="inline w-1/3">
            <div className="grid grid-rows-1 justify-items-end">
              <div className="flex flex-row">
                <div>
                  <select
                    className="mr-2 my-1"
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
                {
                  !LOGIN_STATUS ? 
                    <Link to={`/login`}><h1>{t('home.login')}</h1></Link> :
                    <>
                      <LoginLinks 
                        linkName = {user}
                        className={'hidden lg:block'}/>
                      <button
                        className="block lg:hidden" 
                        onClick={
                          ()=>{
                            setShowUserBox(!showUserBox);
                          }
                        }>
                        {user}
                      </button>
                      <div
                        className={ !showUserBox ? 'hidden' : 
                          'block lg:hidden p-2 text-black' +
                        ' overflow-auto  absolute bg-white right-2 rounded-lg' +
                        ' md:bg-opacity-95 z-10 border border-gray-500'
                        }
                        onMouseDown={
                          (e)=>{
                            e.preventDefault();
                          }
                        }
                      >
                        <LoginLinks 
                          className={'block lg:hidden'}
                          linkName={'GO TO PROFILE'}
                        />
                        <button
                          className="block lg:hidden"
                          onClick={
                            ()=>{
                              setShowUserBox(false);
                            }
                          }>
                          {t('home.close')}
                        </button>
                      </div>
                    </>
                }                
              </div>
            </div>
          </li>
        </ul>
        <SearchBox show={showSearchBox} searchTerm={searchTerm}
          className = {'flex rounded-md mt-4 mx-auto border border-gray-400' +
            ' overflow-auto w-[70vw] h-[70vh] absolute bg-white md:bg-opacity-95 z-20 font-bold' +
            ' top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 '}
          onMouseDown = {
            (e)=>{
              e.preventDefault();
            }
          }
        > </SearchBox>
      </nav>
      <div>
        <Outlet context={[currentLang]}/>
      </div>
    </div>
  );
} 

