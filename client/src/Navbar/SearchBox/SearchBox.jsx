import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArticleResults from './ArticleResults';
import UserResults from './UserResults';
export default function SearchBox(props) {

  const [articleResults, setArticleResults] = useState(null);
  const [userResults, setUserResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchErrMsg, setFetchErrMsg] = useState('');
  const [selectedCategories, setSelectedCategories] = useState('');
  const { t } = useTranslation();
  const [page, setPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(()=>{
    const categories = sessionStorage.getItem('sCategories');
    if(props.searchTerm.trim() === '') {
      setSearchTerm(props.searchTerm);
    }
    if(props.searchTerm !== searchTerm || categories !== selectedCategories) {
      setLoading(true);
      setArticleResults(null);
      const delaySearch = setTimeout(
        ()=>{
          const params = {
            category: categories.trim() !== '' ? categories.split(',') : null,
            amount: 15,
            page:1,
            search: props.searchTerm
          };
          const requestBody = JSON.stringify(params);
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: requestBody
          };
          setFetchErrMsg('');
          //fetch both users and articles for search
          Promise.all([
            fetch(`/api/article/search?lang=${props.currentLang}`, options).
              then((resp) => {
                if(!resp.ok){
                  setFetchErrMsg(t('error.connection'));
                } else {
                  return resp.json();
                }
              }),
            fetch(`/api/users/search?name=${props.searchTerm}`).
              then((resp) => {
                if(!resp.ok){
                  setFetchErrMsg(t('error.connection'));
                } else {
                  return resp.json();
                }
              }),
          ]).
            then(([foundArticles, users]) => {
              setFetchErrMsg('');
              setArticleResults(foundArticles);
              setSearchTerm(props.searchTerm);
              setSelectedCategories(categories);
              setPage(1);
              setUserResults(users[0].data);
              setLoading(false);
            }).catch(
              ()=>{
                setFetchErrMsg(t('error.fetch'));
              }
            );
        }, 1500
      );
      return () => clearTimeout(delaySearch);
    }
  }, [props.searchTerm, t, selectedCategories, props.currentLang, props.show, searchTerm]);

  function loadMore() {
    const params = {
      category: selectedCategories.trim() !== '' ? selectedCategories.split(',') : null,
      amount: 15,
      page:page + 1,
      search: props.searchTerm
    };
    const requestBody = JSON.stringify(params);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    };
    fetch(`/api/article/search?lang=${props.currentLang}`, options).
      then((resp) => {
        if(!resp.ok){
          setFetchErrMsg(t('error.connection'));
        } else {
          return resp.json();
        }
      }). then(
        (foundArticles)=>{
          setFetchErrMsg('');
          foundArticles.result.unshift(...articleResults.result);
          setArticleResults(foundArticles);
          setPage(page + 1);
        }
      );
  }

  console.log(articleResults);

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
              articleResults?.result !== undefined ? 
                <span>
                  {articleResults?.amount + ' ' + t('search.found')}
                  <br></br>
                  {selectedCategories !== '' ? selectedCategories.replaceAll(',', ' · ') : null}
                </span> : null
          }
        </p>
        {articleResults?.result  !== null && articleResults?.result  !== undefined && !loading && 
          <ArticleResults articles = {articleResults?.result}/>}
        {articleResults?.next_page ? 
          <button
            onClick={loadMore}
            className={'text-sm mx-auto font-light p-2 border border-gray-600 rounded-full ' + 
            'hover:opacity-75'}
          >
          LOAD MORE
          </button>  : null 
        }
      </div>
      <div className="grow p-8 overflow-y-scroll">
        {userResults !== null && userResults !== undefined && !loading &&
        <UserResults users= {userResults} />}
      </div>
    </div>
  );
}