import { useEffect, useState } from 'react';

export default function ShortScroll(props) {
  const [fetchErrMsg, setFetchErrMsg] = useState();
  const [article, setArticle] = useState();

  useEffect(
    ()=>{
      fetchArticle();
    }, []
  );

  function fetchArticle() {
    fetch('/article').
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
      {article ? 
        <div>
          {article}
        </div> : null}
    </div>
  );
}