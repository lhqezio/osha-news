import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ShortScroll from '../Article/ShortScroll';
import home from '../images/home.png';
import search from '../images/search.png';
import avatar from '../images/avatar.png';

export default function CategoryList(props){
  const [hidden, setHidden] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(
    ()=>{
      fetch('/categories').
        then((resp)=>{
          if(!resp.ok) {
            console.error('Error occured');
          }else {
            return resp.json();
          }
        }).
        then ((json)=>{
          setCategories(json);
        }).
        catch ((err)=>{
          console.error('Server Error Occured');
        });
    }, []
  );  

  //on button press shows or hides the list
  function showCategories(){
    if (hidden === true){
      console.log('is true');
      setHidden(false);
    }else{
      setHidden(true);
    }
  }
  
  //use the handler functions
  function addCategory(e){
    props.addSelectedCategory(e.target.innerText);
  }

  function removeCategory(e){
    props.removeSelectedCategory(e.target.innerText);
  }

  return (
    <div class="relative">
      <div class="flex flex-row">
        <button type="button" class="border-2 rounded-md bg-gray-200 mx-2 p-2"
          onClick={showCategories}>Categories</button>
        <ul class="flex flex-row">
          {props.selectedCategories.map(cat =>
            <li><button onClick={removeCategory} type="button"
              class="border-2 rounded-md bg-gray-200 mx-2 p-2">{cat}</button></li>
          )}
        </ul>
      </div>
      <ul class={ hidden ? 'hidden' : 
        'block border rounded-md mx-2 p-2 overflow-auto w-80 h-52 absolute bg-gray-200 z-10' } >
        {categories.map(cat =>
          <li><button onClick={addCategory} type="button">{cat}</button></li>
        )}
      </ul>
    </div>
  );
}