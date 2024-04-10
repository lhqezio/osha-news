import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import LoadingAnimation from './LoadingAnimation';
import Comment from './Comment';
import { useTranslation } from 'react-i18next';

export default function Article({
  setUpdateScroll, 
  selectedCategories,
  currentLang,
  page
}) {
  const [fetchErrMsg, setFetchErrMsg] = useState('');
  const [articles, setArticles] = useState(null);
  const [ref, inView] = useInView();
  const { t } = useTranslation();
  const amount = 1;

  useEffect(() => {
    if(inView && articles === null) {
      if (selectedCategories.length === 0){
        fetchRandomArticles();
      }else{
        fetchArticleByCategory(selectedCategories);
      }
      if(setUpdateScroll !== undefined) {
        setUpdateScroll(true); 
      }
    }

    function fetchRandomArticles() {
      fetch(`/api/article/random?lang=${currentLang}`).
        then((resp) => {
          if(!resp.ok){
            setFetchErrMsg(t('error.connection'));
          } else {
            return resp.json();
          }
        }).
        then((json) => {
          setFetchErrMsg('');
          if(json[0] === undefined){
            setFetchErrMsg(t('error.unexpected'));
          } else {
            setFetchErrMsg('');
            setArticles(json);
          }
        }
        ).catch (
          ()=>{
            setFetchErrMsg(t('error.fetch'));
          }
        );
    }

    function fetchArticleByCategory(categories){
      const params = {
        category: categories
      };
      const requestBody = JSON.stringify(params);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      };
      fetch(`/api/article/search?amount=${amount}&page=${page}&lang=${currentLang}`, options).
        then((resp) => {
          if(!resp.ok){
            setFetchErrMsg(t('error.connection'));
          } else {
            return resp.json();
          }
        }).
        then((json) => {
          setFetchErrMsg('');
          const newArray = [json.result[0]];
          setArticles(newArray);
        }).
        catch (() => {
          setFetchErrMsg(t('error.fetch'));
        });      
    }
  }, [inView, articles, setUpdateScroll, t, currentLang, page, selectedCategories]);

  return (
    articles !== null && articles[0] !== undefined  && inView && fetchErrMsg === '' ? 
      <section
        ref={ref}
        style={{ backgroundImage : `url('${articles[0].image}')`}}
        className={'snap-start md:h-[80vh] md:p-4 bg-no-repeat bg-cover bg-center bg-fixed' +
        'my-30 snap-always flex flex-col h-[93vh]'} >
        <div 
          className={'md:w-1/2 backdrop-blur-lg p-6 drop-shadow-md' 
          + ' md:rounded-lg bg-white opacity-75'}>
          <div className="text-2xl md:text-4xl font-serif">
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
            <a className="text-blue-600" href={`${articles[0].link}`}>{t('article.moreInfo')}</a>
          </div>
        </div>
        <div className="flex items-end self-end h-full">
          <Comment articleId={articles[0]._id}/>
        </div>
      </section> :
      <section ref={ref} className="snap-start h-[93vh] md:h-[80vh] rounded-xl pb-16 pr-4 md:p-4">
        {
          fetchErrMsg !== '' ? <div className="text-red-700">{fetchErrMsg}</div> : 
            <LoadingAnimation type={'spokes'} color={'black'} />
        }
      </section>
  );
}