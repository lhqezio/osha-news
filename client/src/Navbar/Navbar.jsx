import search from '../images/search.png';
import avatar from '../images/avatar.png';
import { useState } from 'react';
import SearchBox from './SearchBox/SearchBox';
import { useTranslation } from 'react-i18next';
import LANGUAGE from '../constants/lang';

export default function Navbar({currentLang, setCurrentLang}){
  const { t } = useTranslation();
  const defaultSearchValue = '';
  const[searchTerm, setSearchTerm] = useState(defaultSearchValue);
  const [showSearchBox, setShowSearchBox] = useState(false);


  function handleShowSearchBox(e){
    setSearchTerm(e.target.value);
    if(e.target.value.trim() !== defaultSearchValue) {
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

  function hideSearchBox(){
    setShowSearchBox(false);
  }

  return (
    <nav className="my-4">
      <ul className="flex flex-row justify-between">
        <li className="inline w-1/3">
          <div className="flex flex-row justify-items-start">
            <img className="size-6 my-1 mr-2" src={search} alt="search icon"/>
            <input className="border rounded-sm border-gray-400 p-1 font-light" 
              type="text" value={searchTerm}
              onChange={handleShowSearchBox}
              onBlur={hideSearchBox}
              onFocus={handleShowSearchBox}
            />
          </div>
        </li>
        <li className="w-1/3 flex justify-items-end">
          <a href="/" className="text-xl text-center w-full my-1">{t('home.title')}</a>
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
              <h1 className="my-1">{t('home.user')}</h1>
              <img className="size-7 my-1" src={avatar} alt="profile"/>
            </div>
          </div>
        </li>
      </ul>
      <SearchBox show={showSearchBox} searchTerm={searchTerm}> </SearchBox>
    </nav>
  );
}

