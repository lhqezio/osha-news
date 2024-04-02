import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import avatar from '../images/avatar.png';


export default function Profile(){  
  const { id } = useParams();
  const [fetchErrMsg, setFetchErrMsg] = useState('');
  const [profile, setProfile] = useState(null);
  const { t } = useTranslation();

  useEffect(
    ()=>{
      const sample = {
        username: id,
        crediblity: 7,
        about: 'Lorem Ipsum is simply dummy text of the printing and typesetting' + 
            ' industry. Lorem Ipsum has been the industry\'s' +
            ' standard dummy text ever since the 1500s, when an unknown printer took a galley of' +
            ' type and scrambled' + 
            ' it to make a type specimen book. It has survived not only five centuries,'
      };
      fetch(`/api/article/search?search=violent&page=1&amount=15`).
        then((resp) => {
          if(!resp.ok){
            setFetchErrMsg(t('error.connection'));
          } else {
            return resp.json();
          }
        }).
        then((json) => {
          sample.top = json.result;
          setProfile(
            sample
          );
          setFetchErrMsg('');
        }
        ).catch (
          ()=>{
            setFetchErrMsg(t('error.fetch'));
          }
        );       
    }, [id, setProfile, t]
  );

  return (
    <div>
      {fetchErrMsg.trim() !== '' ? fetchErrMsg
        : profile === null  ?  t('profile.loading')
          :
          <>
            <div className="flex mb-10">
              <div>
                <img className="size-28" src={avatar} alt="profile"/>
              </div>
              <div className="grow inline-block self-end">
                <p className="text-3xl">{profile.username}</p>
                <p>
                  {t('profile.credibility')} : {profile.crediblity}/10
                </p>
              </div>
            </div> 
            <div className="flex w-full">
              <div className="flex-1 mr-8">
                <p className="font-semibold text-2xl mb-6">
                  {t('profile.about')}
                </p>
                <div className="overflow-y-scroll">
                  <p className="font-light text-xl">
                    {
                      profile.about
                    } 
                  </p>
                </div>
              </div>
              <div className="flex-1 ml-8">
                <p className="font-semibold text-2xl mb-2">
                  {t('profile.posts')}
                </p>
                <div className="overflow-y-scroll h-[50vh]">
                  {
                    profile.top.map(
                      (article) => <ArticleResult key = {article.id} article={article} />
                    )
                  }
                </div>
              </div>
            </div>
          </>
      }
    </div>
  );
}

function ArticleResult({article}){
  return(
    <div className="mt-4">
      <p className="font-semibold text-sm">{article.category}</p>
      <a className="text-xl font-serif font-normal my-1 cursor-pointer hover:text-gray-500"
        href={article.link}
      >
        {article.headline}
      </a>    
    </div>
  );
}