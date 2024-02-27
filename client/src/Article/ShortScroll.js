import { useEffect, useState } from 'react';
import Article from './ArticleDetail';

export default function ShortScroll(props) {
  const [fetchErrMsg, setFetchErrMsg] = useState();
  const [articles, setArticles] = useState(null);

  useEffect(
    ()=>{
      fetchArticles();
    }, []
  );

  function fetchArticles() {
    fetch('http://localhost:3001/article/random?amount=5').
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
          setArticles(json);
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
      {articles !== null ? 
        <div className="w-11/12 h-[80vh] snap-mandatory snap-y overflow-auto 
        my-0 mx-auto no-scrollbar::-webkit-scrollbar no-scrollbar scroll-smooth 
        rounded-xl shadow-md">
          {
            articles.map(
              (article) =>{
                return(
                  <Article article={article} />
                );
              }
            )
          }
        </div> : null}
    </div>
  );
}