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
    const fetchCategory = async () => {
      const res = await fetch(`/api/categories?lang=${currentLang}`);
      const data = await res.json();
        
      setCategories(data);
    };
    fetchCategory();
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
    <div className=" bg-white md:mt-0 border-b md:border-none border-gray-400">
      <div className="flex flex-row">
        <button type="button" 
          className={'text-lg font-bold md:border border-gray-400 rounded-xl '
          + 'mb-2 md:mb-4 p-2 mr-2'
          }
          onClick={showCategories}>{t('home.categories')}</button>
        <ul className="flex flex-row overflow-scroll">
          {selectedCategories.map((cat, i) =>
            <li key={i}>
              <button onClick={removeCategory} type="button"
                className={
                  'flex flex-row md:border border-b-2 border-gray-400 md:rounded-xl' + 
                ' text-lg mx-2 pt-2 md:p-2 font-bold whitespace-nowrap'
                }
              >
                <p>{cat}</p>
              </button>
            </li>
          )}
        </ul>
      </div>
      <ul ref={ref} className={ hidden ? 'hidden' : 
        'block md:border md:rounded-md p-2 -ml-2 md:ml-0 md:-mt-2 text-lg h-[60vh] md:h-60' +
        ' overflow-auto w-[100vw] md:w-80 absolute bg-white md:bg-opacity-95 z-10 font-bold' } >
        {categories.map((cat, i) =>
          <li key={i}>
            <button className="mb-8 md:mb-4" onClick={addCategory} type="button">{cat}</button>
          </li>
        )}
      </ul>
    </div>
  );
}