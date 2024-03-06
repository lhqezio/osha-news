import { Link } from 'react-router-dom';
import home from '../images/home.png';
import search from '../images/search.png';
import avatar from '../images/avatar.png';
import { useTranslation } from 'react-i18next';
import LANGUAGE from '../constants/lang';
import { useEffect, useState } from 'react';

export default function Navbar(){
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(
    localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'
  );

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const onChangeLang = (e) => {
    const langCode = e.target.value;
    setLang(langCode);
    localStorage.setItem('lang', langCode);
  };

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
                  defaultValue={lang}
                  onChange={onChangeLang}
                >
                  {LANGUAGE.map(({key, displayName}) => 
                    <option key={key} value={key}>
                      {displayName}
                    </option>
                  )}
                </select>
              </div>
              <h1>{t('home.user')}</h1>
              <img className="size-7" src={avatar} alt="profile"/>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}