import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import LoadingAnimation from './LoadingAnimation';
import Comment from './Comment';
import { useTranslation } from 'react-i18next';

export default function Article({
  setUpdateScroll, 
  selectedCategories,
  currentLang
}) {
  const [fetchErrMsg, setFetchErrMsg] = useState('');
  const [articles, setArticles] = useState(null);
  const [ref, inView] = useInView();
  const { t } = useTranslation();

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
      fetch(`article/random?lang=${currentLang}`).
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
      fetch(`article/search?lang=${currentLang}`, options).
        then((resp) => {
          if(!resp.ok){
            setFetchErrMsg(t('error.connection'));
          } else {
            return resp.json();
          }
        }).
        then((json) => {
          setFetchErrMsg('');
          const random = Math.floor(Math.random() * 10);
          const newArray = [json.result[random]];
          setArticles(newArray);
        }).
        catch (() => {
          setFetchErrMsg(t('error.fetch'));
        });      
    }
  }, [inView, articles, setUpdateScroll, selectedCategories, t, currentLang]);

  return (
    articles !== null && articles[0] !== undefined  && inView && fetchErrMsg === '' ? 
      <section
        ref={ref}
        style={{ backgroundImage : `url('${articles[0].image}')`}}
        className={'snap-start h-[80vh] rounded-xl p-4 bg-no-repeat bg-cover bg-center bg-fixed' +
        'my-30 snap-always flex flex-col'} >
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
            <a className="text-blue-600" href={`${articles[0].link}`}>{t('article.moreInfo')}</a>
          </div>
        </div>
        <div className="flex items-end self-end h-full">
          <Comment/>
        </div>
      </section> :
      <section ref={ref} className="snap-start h-[80vh] rounded-xl p-4">
        {
          fetchErrMsg !== '' ? <div className="text-red-700">{fetchErrMsg}</div> : 
            <LoadingAnimation type={'spokes'} color={'black'} />
        }
      </section>
  );
}