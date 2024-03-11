import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


export default function SearchBox(props) {

  const [articleResults, setArticleResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchErrMsg, setFetchErrMsg] = useState('');
  const { t } = useTranslation();

  useEffect(()=>{
    setFetchErrMsg('');
    setLoading(true);
    fetch(`/article/search?search=${props.searchTerm}&page=2&amount=2`).
      then((resp) => {
        if(!resp.ok){
          setFetchErrMsg(t('error.connection'));
        } else {
          return resp.json();
        }
      }).
      then((json) => {
        if(json[0] === undefined){
          setFetchErrMsg(t('error.unexpected'));
        } else {
          setFetchErrMsg('');
          setArticleResults(json);
        }
      }
      ).catch (
        ()=>{
          setFetchErrMsg(t('error.fetch'));
        }
      );
    
  }, [props.searchTerm, t]);

  return (
    <div className={ !props.show ? 'hidden' : 
      'flex rounded-md mt-4 mx-auto border border-gray-400' +
        ' overflow-auto w-[70vw] h-[70vh] absolute bg-white md:bg-opacity-95 z-20 font-bold' +
        ' top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    } >
      <div className="grow-[3] border-r border-gray-400 p-8">
        <p className="font-semibold text-sm">
          {fetchErrMsg !== '' ? fetchErrMsg : 
            loading ? 'LOADING...' : 
              articleResults.length + 'ARTICLE(S) FOUND'}
        </p>
      </div>
      <div className="grow p-8">

      </div>
    </div>
  );
}