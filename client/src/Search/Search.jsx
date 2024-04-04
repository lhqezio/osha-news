import { useEffect, useState } from 'react';
// import NavBar from './Navbar/Navbar';
import CategoriesList from './Navbar/CategoriesList';
// import { useOutletContext } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

export default function Search(){
  const [selectedCategories, setSelectedCategories] = useState([]);
  //   const [currentLang] = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');

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
      <CategoriesList 
        addSelectedCategory={addSelectedCategory}
        removeSelectedCategory={removeSelectedCategory}
        selectedCategories={selectedCategories}
      />
      <input className="border rounded-sm border-gray-400 p-1 font-light" 
        type="text" value={searchTerm}
        onChange={
          (e)=>{
            setSearchTerm(e.target.value);
          }
        }
      />
    </div>
  );
}