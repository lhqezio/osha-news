import { useState } from 'react';
import Article from './ArticleDetail';

export default function ShortScroll({selectedCategories}) {

  const[updateScroll, setUpdateScroll] = useState(false);
  const[articleElems, setArticleElems] = useState(
    [
      <Article setUpdateScroll={setUpdateScroll} selectedCategories={selectedCategories}/>
    ]
  );

  if(updateScroll) {
    const newArr = articleElems.concat(
      [
        <Article setUpdateScroll={setUpdateScroll} selectedCategories={selectedCategories}/>
      ]
    );
    setArticleElems(newArr);
    setUpdateScroll(false);
  }

  return (
    <div className="w-11/12 h-[80vh] snap-mandatory snap-y overflow-auto 
        my-0 mx-auto no-scrollbar::-webkit-scrollbar no-scrollbar scroll-smooth 
        rounded-xl shadow-md border-t-2 border-slate-100">
      
      {
        articleElems.map(
          (elem) => {
            return elem;
          }
        )
      }
    </div>
  );
}