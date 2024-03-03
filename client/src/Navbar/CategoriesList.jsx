import React, {useState, useEffect} from 'react';
import x from '../images/x_icon.png';

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
        catch (()=>{
          console.error('Server Error Occured');
        });
    }, []
  );  

  //on button press shows or hides the list
  function showCategories(){
    if (hidden === true){
      setHidden(false);
    }else{
      setHidden(true);
    }
  }
  
  //use the handler functions
  function addCategory(e){
    if (!props.selectedCategories.includes(e.target.innerText) && 
      props.selectedCategories.length !== 5){
      props.addSelectedCategory(e.target.innerText);
    } 
  }

  function removeCategory(e){
    props.removeSelectedCategory(e.target.innerText);
  }

  return (
    <div className="relative">
      <div className="flex flex-row">
        <button type="button" className="text-xs border-2 rounded-md mx-2 p-2"
          onClick={showCategories}>Categories</button>
        <ul className="flex flex-row">
          {props.selectedCategories.map((cat, i) =>
            <li key={i}>
              <button onClick={removeCategory} type="button"
                className="flex flex-row border-2 rounded-md bg-white text-xs mx-2 p-2">
                <p>{cat}</p>
                <img className="size-4 p-1 rounded-md" src={x} alt="search icon"/>
              </button>
            </li>
          )}
        </ul>
      </div>
      <ul className={ hidden ? 'hidden' : 
        'block border rounded-md mx-2 p-2 overflow-auto w-80 h-52 absolute bg-white z-10' } >
        {categories.map((cat, i) =>
          <li key={i}>
            <button onClick={addCategory} type="button">{cat}</button>
          </li>
        )}
      </ul>
    </div>
  );
}