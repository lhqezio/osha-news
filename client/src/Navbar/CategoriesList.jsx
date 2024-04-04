import React, {useState, useEffect} from 'react';
import { useClickAway } from '@uidotdev/usehooks';
import { useTranslation } from 'react-i18next';

export default function CategoryList({ 
  currentLang, 
  selectedCategories, 
  addSelectedCategory, 
  removeSelectedCategory 
}){
  const [hidden, setHidden] = useState(true);
  const [categories, setCategories] = useState([]);
  const [closeByClickedAway, setCloseByClickedAway] = useState(false);
  const { t } = useTranslation();
  
  const ref = useClickAway(() => {
    if(!hidden) {
      setHidden(true);
      setCloseByClickedAway(true);
    }
  });

  useEffect(()=>{
    fetch(`/api/categories?lang=${currentLang}`).
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
  }, [currentLang]);  

  //on button press shows or hides the list
  function showCategories(){
    if(!closeByClickedAway) {
      setHidden(false);
    }
    setCloseByClickedAway(false);
  }
  
  //use the handler functions
  function addCategory(e){
    if (!selectedCategories.includes(e.target.innerText) && 
      selectedCategories.length !== 5){
      addSelectedCategory(e.target.innerText);
    } 
  }

  function removeCategory(e){
    removeSelectedCategory(e.target.innerText);
  }

  return (
    <div className="relative">
      <div className="flex flex-row">
        <button type="button" 
          className="text-sm font-bold border border-gray-400 rounded-xl mb-2 md:mb-4 p-2 mr-2"
          onClick={showCategories}>{t('home.categories')}</button>
        <ul className="flex flex-row overflow-scroll">
          {selectedCategories.map((cat, i) =>
            <li key={i}>
              <button onClick={removeCategory} type="button"
                className={
                  'flex flex-row border border-gray-400 rounded-xl' + 
                ' text-sm mx-2 p-2 font-bold'
                }
              >
                <p>{cat}</p>
              </button>
            </li>
          )}
        </ul>
      </div>
      <ul ref={ref} className={ hidden ? 'hidden' : 
        'block border rounded-md p-2 -mt-2' +
        ' overflow-auto w-80 h-52 absolute bg-white md:bg-opacity-95 z-10 font-bold' } >
        {categories.map((cat, i) =>
          <li key={i}>
            <button onClick={addCategory} type="button">{cat}</button>
          </li>
        )}
      </ul>
    </div>
  );
}