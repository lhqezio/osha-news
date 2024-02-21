import { useEffect, useState } from 'react';
import ArticleDetail from './ArticleDetail';

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
      );
  }

  return (
    <div>
      {fetchErrMsg ? <div>{fetchErrMsg}</div> : null}
      {article !== null ? 
        <div>
          {<ArticleDetail article={article} />}
        </div> : null}
      <p>ShortScroll</p>
    </div>
  );
}