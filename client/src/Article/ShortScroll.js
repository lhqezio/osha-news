import { useEffect, useState } from 'react';

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
          setFetchErrMsg('server fetching err');
        }
      );
  }

  return (
    <div>
      {fetchErrMsg ? <div>{fetchErrMsg}</div> : null}
      {true ? 
        <div className="w-3/4 h-screen snap-mandatory snap-y overflow-auto 
        my-0 mx-auto no-scrollbar::-webkit-scrollbar no-scrollbar">
          <section class="snap-start h-screen bg-red-900">
            Page one
          </section>
          <section class="snap-start h-screen bg-green-600">
            Page two
          </section>
        </div> : null}
      <p>ShortScroll</p>
    </div>
  );
}