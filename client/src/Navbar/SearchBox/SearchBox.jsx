import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArticleResults from './ArticleResults';
export default function SearchBox(props) {

  const [articleResults, setArticleResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchErrMsg, setFetchErrMsg] = useState('');
  const { t } = useTranslation();

  useEffect(()=>{
    if(props.searchTerm.trim() !== '') {
      setFetchErrMsg('');
      setLoading(true);
      fetch(`/article/search?search=${props.searchTerm}&page=1&amount=15`).
        then((resp) => {
          if(!resp.ok){
            setFetchErrMsg(t('error.connection'));
          } else {
            return resp.json();
          }
        }).
        then((json) => {
          setFetchErrMsg('');
          setArticleResults(json.result);
          setLoading(false);
        }
        ).catch (
          ()=>{
            setFetchErrMsg(t('error.fetch'));
          }
        );
    }
    
  }, [props.searchTerm, t]);

  return (
    <div className={ !props.show ? 'hidden' : 
      'flex rounded-md mt-4 mx-auto border border-gray-400' +
        ' overflow-auto w-[70vw] h-[70vh] absolute bg-white md:bg-opacity-95 z-20 font-bold' +
        ' top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 '
    } 
    onMouseDown={
      (e)=>{
        e.preventDefault();
      }
    }
    >
      <div className="w-[50vw] border-r border-gray-400 p-8 overflow-y-scroll">
        <p className="font-semibold text-sm">
          {fetchErrMsg !== '' ? fetchErrMsg : 
            loading ? 'LOADING...' : 
              articleResults.length + ` ${t('search.found')}`}
        </p>
        {articleResults !== null && !loading && 
          <ArticleResults articles = {articleResults}/>}
      </div>
      <div className="grow p-8 overflow-y-scroll">

      </div>
    </div>
  );
}