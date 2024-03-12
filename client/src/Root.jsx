import { useState } from 'react';
import ShortScroll from './Article/ShortScroll';
// import NavBar from './Navbar/Navbar';
import CategoriesList from './Navbar/CategoriesList';
// import { useTranslation } from 'react-i18next';

export default function Root(){
  // const { i18n } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const [currentLang, setCurrentLang] = useState(
  //   localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'
  // );

  // useEffect(() => {
  //   i18n.changeLanguage(currentLang);
  // }, [i18n, currentLang]);

  function addSelectedCategory(categoryName){
    setSelectedCategories(selectedCategories => [...selectedCategories, categoryName]);
  }

  function removeSelectedCategory(categoryName){
    const i = selectedCategories.indexOf(categoryName);
    setSelectedCategories((cat) => cat.filter((_, index) => index !== i));
  }

  return (
    <div className="px-8">
      <CategoriesList 
        addSelectedCategory={addSelectedCategory}
        removeSelectedCategory={removeSelectedCategory}
        selectedCategories={selectedCategories}
      />
      <div>
        <ShortScroll 
          selectedCategories={selectedCategories}
        />
      </div>
    </div>
  );
}