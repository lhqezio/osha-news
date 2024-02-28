import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Article({setUpdateScroll}) {
  const [fetchErrMsg, setFetchErrMsg] = useState();
  const [articles, setArticles] = useState(null);
  const [ref, inView] = useInView();

  useEffect(
    ()=>{
      if(inView && articles === null) {
        fetchArticles();
        if(setUpdateScroll !== undefined) {
          setUpdateScroll(true); 
        }
      }
    }, [inView, articles, setUpdateScroll]
  );

  function fetchArticles() {
    fetch('http://localhost:3001/article/random').
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
    articles !== null && inView ? 
      <section
        ref={ref}
        style={{ backgroundImage : `url('${articles[0].image}')`}}
        className={'snap-start h-[80vh] rounded-xl p-4 bg-no-repeat bg-cover bg-center bg-fixed' +
        'my-30'} >
        <div className="w-1/2 backdrop-blur-lg p-6 drop-shadow-md rounded-lg">
          <div className="text-4xl font-serif">
            {articles[0].headline}
          </div>
          <div>
            {articles[0].short_description}
          </div>
          <div>
            {articles[0].authors}
          </div>
          <div>
            {articles[0].date}
          </div>
          <div>
            <a className="text-blue-600" href={`${articles[0].link}`}>Read More</a>
          </div>
        </div>
      </section> :
      <section ref={ref} className="snap-start h-[80vh] rounded-xl p-4">
        Loading...
      </section>
  );
}