import React, {useState, useEffect} from 'react';

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
        <button type="button" 
          className="text-xs font-bold border border-black rounded-xl mx-2 p-2"
          onClick={showCategories}>FILTER</button>
        <ul className="flex flex-row">
          {props.selectedCategories.map((cat, i) =>
            <li key={i}>
              <button onClick={removeCategory} type="button"
                className={
                  'flex flex-row border border-black rounded-xl' + 
                ' text-xs mx-2 p-2 font-bold'
                }
              >
                <p>{cat}</p>
              </button>
            </li>
          )}
        </ul>
      </div>
      <ul className={ hidden ? 'hidden' : 
        'block border rounded-md mt-1 mx-2 p-2' +
        ' overflow-auto w-80 h-52 absolute bg-white md:bg-opacity-90 z-10 font-bold' } >
        {categories.map((cat, i) =>
          <li key={i}>
            <button onClick={addCategory} type="button">{cat}</button>
          </li>
        )}
      </ul>
    </div>
  );
}