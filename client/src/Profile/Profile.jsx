import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


export default function Profile(){  
  const { id } = useParams();
  const [fetchErrMsg, setFetchErrMsg] = useState('');
  const [profile, setProfile] = useState(null);
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(
    ()=>{
      fetch('/api/users/user-info').
        then((response) => response.json()).
        then((user) => {
          setUser(user);
        }).
        catch (()=>{
          // eslint-disable-next-line no-alert
          alert('Server Error Occured');
        });
    }, []
  );

  useEffect(
    ()=>{
      if(!edit || user !== null || reload) {
        Promise.all(
          [
            fetch(`/api/users/user-posts?user=${id}`).
              then((resp) => {
                if(!resp.ok){
                  setFetchErrMsg(t('error.connection'));
                } else {
                  return resp.json();
                }
              }),
            fetch(`/api/users/search?name=${id}`).
              then((resp) => {
                if(!resp.ok){
                  setFetchErrMsg(t('error.connection'));
                } else {
                  return resp.json();
                }
              })  
          ]
        ).then(([posts, json]) => {
          if(json[0].data.length !== 1) {
            setFetchErrMsg('Invalid Username');
          } else {
            setProfile(
              {
                ...json[0].data[0],
                posts : posts.posts || []
              }
            );

            setFetchErrMsg('');
          }
        }
        ).catch (
          ()=>{
            setFetchErrMsg(t('error.fetch'));
          }
        ).finally(
          ()=>{
            setReload(false);
          }
        );
        
      }
    }, [edit, user, id, t, reload]
  );

  function ArticleResult({article}){
    return(
      <div className="mt-4">
        <p className="font-semibold text-sm">{article.category}</p>
        <a className="text-xl font-serif font-normal my-1 cursor-pointer hover:text-gray-500"
          href={article.link}
        >
          {article.headline}
        </a>
        {user?.name === profile.name ?
          <button className="mt-1 block"
            onClick={
              ()=>{
                fetch('/api/article/delete', {
                  method: 'POST',
                  body: JSON.stringify({
                    ...article
                  }),
                  headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                  }
                }).
                  then((res) => {
                    if(res.ok) {
                      setReload(true);
                      return res.json();

                    }
                    throw Error();
                  } 

                  ).
                  catch(()=>{
                    // eslint-disable-next-line no-alert
                    alert('Error Deleting');
                  });
              }
            }
          >
            {t('profile.articleDelete')}
          </button>  : null
        }  
      </div>
    );
  }

  return (
    <div>
      {fetchErrMsg.trim() !== '' ? fetchErrMsg
        : profile === null  ?  t('profile.loading')
          :
          <div>
            <div className="flex mb-10">
              <div>
                <img className="size-28 rounded-full" src={profile.image} alt="profile"/>
              </div>
              <div className="grow inline-block self-end">
                <p className="text-3xl">{profile.name}</p>
              </div>
            </div> 
            <div className="flex md:flex-row flex-col w-full">
              <div className="flex-1 mb-10 md:mb-0 md:mr-8">
                <p className="font-semibold text-2xl mb-6">
                  {t('profile.about')}
                </p>
                <div className="overflow-y-scroll">
                  {!edit ? 
                    <p className="font-light text-xl">
                      {
                        profile.description
                      } 
                    </p> :
                    <textarea
                      className="resize-none border rounded p-2 w-full h-[20rem]"
                      value={profile.description}
                      onChange={
                        (e)=>{
                          setProfile(prevState => ({
                            ...prevState,
                            description: e.target.value
                          }));
                        }
                      }
                    />
                  }
                  {
                    user?.name === profile.name ?
                      <button onClick={
                        ()=>{
                          if(edit){
                            fetch('/api/users/description', {
                              method: 'POST',
                              body: JSON.stringify({
                                description: profile.description,
                              }),
                              headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                              }
                            }).
                              then((res) => {
                                if(!res.ok) {
                                  // eslint-disable-next-line no-alert
                                  alert('Failed to save, error occured');
                                }
                                return res.json();
                              }
                              ).finally (
                                ()=>{
                                  setEdit(!edit);
                                }
                              );
                          } else {
                            setEdit(true);
                          }
                        }
                      }
                      className="p-4 mt-4 border border-black"
                      >
                        {edit ? t('profile.save') : t('profile.edit')}
                      </button> : null
                  }
                </div>
              </div>
              <div className="flex-1 md:ml-8">
                <p className="font-semibold text-2xl mb-8 md:mb-2">
                  {t('profile.allPost')}
                </p>
                <div className="md:overflow-y-scroll h-[50vh]">
                  {
                    profile.posts.map(
                      (article) => <ArticleResult key = {article.id} article={article}/>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  );
}