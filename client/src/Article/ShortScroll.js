import { useState } from 'react';
import Article from './ArticleDetail';

export default function ShortScroll(props) {

  const[updateScroll, setUpdateScroll] = useState(false);
  const[articleElems, setArticleElems] = useState(
    [
      <Article />,
      <Article />,
      <Article setUpdateScroll={setUpdateScroll}/>
    ]
  );

  if(updateScroll) {
    const newArr = articleElems.concat(
      [
        <Article />,
        <Article />,
        <Article setUpdateScroll={setUpdateScroll}/>
      ]
    );
    setArticleElems(newArr);
    setUpdateScroll(false);
  }

  return (
    <div className="w-11/12 h-[80vh] snap-mandatory snap-y overflow-auto 
        my-0 mx-auto no-scrollbar::-webkit-scrollbar no-scrollbar scroll-smooth 
        rounded-xl shadow-md">
      
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