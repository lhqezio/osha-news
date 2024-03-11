import { useEffect, useState } from 'react';

export default function SearchBox(props) {

  const [articleResults, setArticleResult] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setLoading(true);
    setArticleResult(null);
    
  }, [props.searchTerm]);

  return (
    <div className={ !props.show ? 'hidden' : 
      'flex rounded-md mt-4 mx-auto border border-gray-400' +
        ' overflow-auto w-[70vw] h-[70vh] absolute bg-white md:bg-opacity-95 z-20 font-bold' +
        ' top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    } >
      <div className="grow-[3] border-r border-gray-400 p-8">
        <p className="font-semibold text-sm">
          {loading ? 'LOADING...' : articleResults.length + 'ARTICLE(S) FOUND'}
        </p>
      </div>
      <div className="grow p-8">

      </div>
    </div>
  );
}