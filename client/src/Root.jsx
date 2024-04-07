import { useEffect, useState } from 'react';
import ShortScroll from './Article/ShortScroll';
// import NavBar from './Navbar/Navbar';
import CategoriesList from './Navbar/CategoriesList';
import { useOutletContext } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

export default function Root(){
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentLang] = useOutletContext();
  const handle = useFullScreenHandle();

  useEffect (
    ()=>{
      sessionStorage.setItem('sCategories', selectedCategories);
    }, [selectedCategories]
  );

  function addSelectedCategory(categoryName){
    setSelectedCategories(selectedCategories => 
      [...selectedCategories, categoryName]
    );
  }

  function removeSelectedCategory(categoryName){
    const i = selectedCategories.indexOf(categoryName);
    setSelectedCategories((cat) => 
      cat.filter((_, index) => index !== i)
    );
  }

  function FilterScroll() {
    return (
      <>
        <CategoriesList 
          addSelectedCategory={addSelectedCategory}
          removeSelectedCategory={removeSelectedCategory}
          selectedCategories={selectedCategories}
        />
        <div>
          <ShortScroll 
            selectedCategories={selectedCategories}
            currentLang={currentLang}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="block md:hidden">
        <button 
          onClick={handle.enter}
          onTouchEnd={handle.enter}
          className = {'absolute top-[40%] left-1/2 transform -translate-x-1/2 '
          + '-translate-y-1/2 font-serif text-2xl'
          }  
        >
        Click Here To Start Scrolling
        </button>
        <FullScreen handle={handle}>
          <div className={ handle.active ? 'block' : 'hidden'}>
            <FilterScroll />
          </div>
        </FullScreen>
      </div>
      <div className="hidden md:block">
        <FilterScroll />
      </div>
    </>
  );
}