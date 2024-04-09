import { useEffect, useState } from 'react';
import LoadingAnimation from './LoadingAnimation';
import Comment from './Comment';
import plus from '../images/plus.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export default function SoloArticle() {
  const [fetchErrMsg, setFetchErrMsg] = useState('');
  const {id} = useParams();
  const [article, setArticle] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchArticle();

    function fetchArticle() {
      fetch(`/api/article/id?id=${id}`).
        then((resp) => {
          if(!resp.ok){
            setFetchErrMsg(t('error.connection'));
          } else {
            return resp.json();
          }
        }).
        then((json) => {
          setFetchErrMsg('');
          if(json === undefined){
            setFetchErrMsg(t('error.unexpected'));
          } else {
            setFetchErrMsg('');
            setArticle(json);
          }
        }
        ).catch (
          ()=>{
            setFetchErrMsg(t('error.fetch'));
          }
        );
    }
  }, []);

  return (
    article !== null && fetchErrMsg === '' ? 
      <div>
        <nav className="my-4">
          <Link to="/" className="text-xl text-center w-full my-1">OSHA News</Link>
        </nav>
        <section
          style={{ backgroundImage : `url('${article.image}')`}}
          className={'snap-start h-[80vh] rounded-xl p-4 bg-no-repeat bg-cover bg-center bg-fixed' +
          'my-30 snap-always flex flex-col mt-6'} > 
          <div className="w-1/2 backdrop-blur-lg p-6 drop-shadow-md rounded-lg">
            <div className="text-4xl font-serif">
              {article.headline}
            </div>
            <div>
              {article.short_description}
            </div>
            <div>
              {article.authors}
            </div>
            <div>
              {article.date}
            </div>
            <div>
              <a className="text-blue-600" href={`${article.link}`}>{t('article.moreInfo')}</a>
            </div>
          </div>
          <div className="flex items-end self-end h-full">
            <Comment/>
          </div>
          <div className="absolute bottom-0 right-0">
            <Link to={`/post`}>
              <img src={plus} alt="add button" className="size-6 my-1 mr-2"/>
            </Link>
          </div>
        </section> 
      </div> :
      <section className="snap-start h-[80vh] rounded-xl p-4">
        {
          fetchErrMsg !== '' ? <div className="text-red-700">{fetchErrMsg}</div> : 
            <LoadingAnimation type={'spokes'} color={'black'} />
        }
      </section>
  );
}