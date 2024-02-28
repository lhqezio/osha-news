import {useState} from 'react';
import ShortScroll from './Article/ShortScroll';
import NavBar from './Navbar/Navbar';
import CategoriesList from './Navbar/CategoriesList';

export default function Root(){
  const [selectedCategories, setSelectedCategories] = useState([]);

  function addSelectedCategory(categoryName){
    setSelectedCategories(selectedCategories => [...selectedCategories, categoryName]);
  }

  function removeSelectedCategory(categoryName){
    const i = selectedCategories.indexOf(categoryName);
    setSelectedCategories((cat) => cat.filter((_, index) => index !== i));
  }

  return (
    <div>
      <NavBar/>
      <CategoriesList addSelectedCategory={addSelectedCategory} 
        removeSelectedCategory={removeSelectedCategory}
        selectedCategories={selectedCategories}/>
      <div>
        <ShortScroll/>
      </div>
    </div>
  );
}