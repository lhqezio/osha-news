import React, { useState } from 'react';
import Article from './ArticleDetail';

export default function ShortScroll({selectedCategories, currentLang}) {

  const[updateScroll, setUpdateScroll] = useState(false);
  const [page, setPage] = useState(0);
  const[articleElems, setArticleElems] = useState([
    <Article 
      setUpdateScroll={setUpdateScroll} 
      selectedCategories={selectedCategories} 
      currentLang={currentLang} 
      page={page}
      key={0}
    />
  ]);

  if(updateScroll) {
    const newArr = articleElems.concat([
      <Article 
        setUpdateScroll={setUpdateScroll} 
        selectedCategories={selectedCategories} 
        currentLang={currentLang} 
        page={page}
        key={0}
      />
    ]);
    setArticleElems(newArr);
    setPage(page + 1);
    setUpdateScroll(false);
  }

  return (
    <div className="w-11/12 h-[80vh] snap-mandatory snap-y overflow-auto 
        my-0 mx-auto no-scrollbar::-webkit-scrollbar no-scrollbar scroll-smooth 
        rounded-xl shadow-md border-t-2 border-slate-100">
      {
        articleElems.map(
          (elem) => elem
        )
      }
    </div>
  );
}