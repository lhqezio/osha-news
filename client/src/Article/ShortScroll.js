import { useEffect, useState } from 'react';
import Article from './ArticleDetail';

export default function ShortScroll(props) {
  const [fetchErrMsg, setFetchErrMsg] = useState();
  const [article, setArticle] = useState(null);

  useEffect(
    ()=>{
      fetchArticle();
    }, []
  );

  function fetchArticle() {
    fetch('http://localhost:3001/article').
      then(
        (resp)=>{
          if(!resp.ok){
            setFetchErrMsg('Connection issue occured');
          } else {
            return resp.json();
          }
        }
      ).
      then(
        (json)=> {
          setArticle(json);
        }
      ).catch (
        (err)=>{
          setFetchErrMsg('server fetching error');
        }
      );
  }

  return (
    <div>
      {fetchErrMsg ? <div>{fetchErrMsg}</div> : null}
      {article !== null ? 
        <div className="w-11/12 h-[80vh] snap-mandatory snap-y overflow-auto 
        my-0 mx-auto no-scrollbar::-webkit-scrollbar no-scrollbar scroll-smooth 
        rounded-xl shadow-md">
          <Article article={article}></Article>
        </div> : null}
    </div>
  );
}