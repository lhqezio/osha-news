import {useState, useEffect, useRef} from 'react';
import { Outlet, Link } from 'react-router-dom';
import ShortScroll from './Article/ShortScroll';
import home from './images/home.png';
import search from './images/search.png';
import avatar from './images/avatar.png';

export default function Root(){
  const [hidden, setHidden] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(
    ()=>{
      fetch('/categories')
        .then((resp)=>{
          if(!resp.ok) {
            console.error('Error occured');
          }else {
            return resp.json();
          }
        })
        .then ((json)=>{
          setCategories(json);
        })
        .catch ((err)=>{
          console.error('Server Error Occured');
        });
    }, []
  );  

  function addSelectedCategory(e){
    setSelectedCategories(selectedCategories => [...selectedCategories, e.target.innerText]);
  }

  function removeSelectedCategory(e){
    let i = selectedCategories.indexOf(e.target.innerText);
    setSelectedCategories((cat) => cat.filter((_, index) => index !== i));
  }

  function showCategories(){
    if (hidden == true){
      console.log('is true');
      setHidden(false);
    }else{
      setHidden(true);
    }
  }

  return (
    <div>
      <nav class="py-1">
        <ul class="flex flex-row justify-between">
          <li class="inline w-1/3">
            <div class="flex flex-row justify-items-start">
              <Link to={`/`}><img class="size-7 p-1" src={home} alt="home icon"/></Link>
              <img class="size-7 p-1 rounded-md" src={search} alt="search icon"/>
              <input class="border my-px" type="text" value="Search"/>
            </div>
          </li>
          <li class="inline w-1/3 flex justify-items-end">
            <h1 class="text-center w-full">OSHA News</h1>
          </li>
          <li class="inline w-1/3">
            <div class="grid grid-rows-1 justify-items-end">
              <div class="flex flex-row">
                <h1>User</h1>
                <img class="size-7" src={avatar} alt="profile picture"/>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <div class="relative">
        <div class="flex flex-row">
          <button type="button" class="border-2 rounded-md bg-gray-200 mx-2 p-2"
            onClick={showCategories}>Categories</button>
          <ul class="flex flex-row">
            {selectedCategories.map(cat =>
              <li><button onClick={removeSelectedCategory} type="button"
                class="border-2 rounded-md bg-gray-200 mx-2 p-2">{cat}</button></li>
            )}
          </ul>
        </div>
        <ul class={ hidden ? 'hidden' : 
          'block border rounded-md mx-2 p-2 overflow-auto w-80 h-52 absolute bg-gray-200 z-10' } >
          {categories.map(cat =>
            <li><button onClick={addSelectedCategory} type="button">{cat}</button></li>
          )}
        </ul>
      </div>
      <div>
        <ShortScroll />
      </div>
    </div>
  );
}