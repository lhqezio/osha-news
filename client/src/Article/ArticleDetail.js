import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import LoadingAnimation from './LoadingAnimation';

export default function Article({setUpdateScroll, selectedCategories}) {
  const [fetchErrMsg, setFetchErrMsg] = useState('');
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
    }, [inView, articles, setUpdateScroll, selectedCategories]
  );

  function fetchArticles() {
    if (selectedCategories.length === 0){
      fetch('article/random').
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
            setFetchErrMsg('');
            setArticles(json);
          }
        ).catch (
          (err)=>{
            setFetchErrMsg('server fetching error');
          }
        );
    } else {
      const params = {
        category: selectedCategories
      };
      const requestBody = JSON.stringify(params);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      };
      fetch('article/search', options).
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
            setFetchErrMsg('');
            const random = Math.floor((Math.random() * 10));
            const newArray = [json.result[random]];
            setArticles(newArray);
          }
        ).catch (
          (err)=>{
            setFetchErrMsg('server fetching error BOB');
          }
        );      
    }
  }
  return (
    articles !== null && inView && fetchErrMsg === '' ? 
      <section
        ref={ref}
        style={{ backgroundImage : `url('${articles[0].image}')`}}
        className={'snap-start h-[80vh] rounded-xl p-4 bg-no-repeat bg-cover bg-center bg-fixed' +
        'my-30 snap-always'} >
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
        {
          fetchErrMsg !== '' ? <div>{fetchErrMsg}</div> : 
            <LoadingAnimation type={'spokes'} color={'black'} />
        }
      </section>
  );
}