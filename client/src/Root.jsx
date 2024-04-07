import { useEffect, useState } from 'react';
import ShortScroll from './Article/ShortScroll';
// import NavBar from './Navbar/Navbar';
import CategoryList from './Navbar/CategoriesList';
import { useOutletContext } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

export default function Root(){
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentLang] = useOutletContext();

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
    <div>
      <CategoryList 
        currentLang={currentLang}
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
    </div>
  );
}