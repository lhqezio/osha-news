import { useEffect, useState } from 'react';
import ShortScroll from './Article/ShortScroll';
// import NavBar from './Navbar/Navbar';
import CategoriesList from './Navbar/CategoriesList';


export default function FilterScroll() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const currentLang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';

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