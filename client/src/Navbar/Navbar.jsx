import { Link } from 'react-router-dom';
import home from '../images/home.png';
import search from '../images/search.png';
import avatar from '../images/avatar.png';
import { useState } from 'react';
import SearchBox from './SearchBox';

export default function Navbar(){
  const defaultSearchValue = '';
  const[searchTerm, setSearchTerm] = useState(defaultSearchValue);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchResult, setSearchResult] = useState(null);


  function handleSearchChange(e){
    setSearchTerm(e.target.value);
    if(e.target.value !== defaultSearchValue) {
      setShowSearchBox(true);
    } else {
      setShowSearchBox(false);
    }
  }

  function hideSearchBox(){
    setShowSearchBox(false);
    setSearchTerm(defaultSearchValue);
  }

  return (
    <nav className="my-4">
      <ul className="flex flex-row justify-between">
        <li className="inline w-1/3">
          <div className="flex flex-row justify-items-start">
            <Link to={`/`}><img className="size-7 p-1" src={home} alt="home icon"/></Link>
            <img className="size-7 p-1 rounded-md" src={search} alt="search icon"/>
            <input className="border rounded-sm border-gray-400 my-px" 
              type="text" value={searchTerm}
              onChange={handleSearchChange}
              onBlur={hideSearchBox}
            />
          </div>
        </li>
        <li className="w-1/3 flex justify-items-end">
          <h1 className="text-xl text-center w-full">OSHA News</h1>
        </li>
        <li className="inline w-1/3">
          <div className="grid grid-rows-1 justify-items-end">
            <div className="flex flex-row">
              <h1>User</h1>
              <img className="size-7" src={avatar} alt="profile"/>
            </div>
          </div>
        </li>
      </ul>
      <SearchBox show={showSearchBox} set={setSearchResult} 
        searchResult={searchResult}> </SearchBox>
    </nav>
  );
}

