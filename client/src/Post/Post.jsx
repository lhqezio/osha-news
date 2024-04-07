import React, {useState, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';

/*
fetch article and current user
fill out form and post article
*/ 
export default function PostArticle(){
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState('');
  const [categories, setCategories] = useState([]);
  const form = useRef(0);
  const { t } = useTranslation();

  useEffect(
    ()=>{
      fetch('/api/categories').
        then((resp)=>{
          if(!resp.ok) {
            setErrorMsg('Error occured');
          }else {
            return resp.json();
          }
        }).
        then ((json)=>{
          setCategories(json);
        }).
        catch (()=>{
          setErrorMsg('Server Error Occured');
        });
      fetch('/api/users/user-info').
        then((response) => response.json()).
        then((user) => {
          setUser(user.name);
        }).
        catch (()=>{
          setErrorMsg('Server Error Occured');
        });
    }, []
  );  
  
  /*
  post fetch to add article
  need to upload image first
  */
  async function postData(e){
    e.preventDefault();
    if (form.current.checkValidity()) {
      const formData = new FormData(form.current);
      const currentDate = new Date().toISOString().split('T')[0];
      const articleData = {
        link: formData.get('url'),
        headline: formData.get('headline'),
        category: formData.get('category'),
        text: formData.get('descript'),
        authors: user,
        date: currentDate,
        image: ''
      };
      const imageFormData = new FormData();
      imageFormData.append('file', formData.get('file'));
      if (formData) {
        try {
          //upload image to azure
          const imageResp = await fetch('/api/image', {
            method: 'POST',
            body: imageFormData
          });
          if (imageResp.ok){
            const imageData = await imageResp.json();
            articleData.image = imageData.url;
          }else {
            setErrorMsg('Respone Error Occured');
          }

          // post article
          const articleResp = await fetch('/api/article/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(articleData)
          });
          if (articleResp.ok){
            setErrorMsg('New Article Added');
          }else {
            setErrorMsg('Respone Error Occured');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        setErrorMsg('Missing Fields from form');
      }
    }else {
      form.current.reportValidity();
    }
  }
  
  return (
    <div >
      <div className="w-screen h-screen">
        <p>{ errorMsg }</p>
        <form ref={ form } 
          className="flex flex-col border-2 border-gray-300 overflow-x-hidden
          m-auto absolute inset-x-1/4 inset-y-[20%] rounded shadow-lg overflow-y-auto" >
          <fieldset className="flex flex-col justify-between h-full">
            <legend className="text-2xl m-2">{t('post.upload')}</legend>
            {/* headline */}
            <div>
              <label htmlFor="headline" className="text-xl m-2">{t('post.headline')}</label>
              <input type="text" name="headline" className="border w-2/4 m-1" required/>
            </div>
            {/* description */}
            <div className="flex flex-col">
              <label htmlFor="descript" className="text-xl m-2">
                {t('post.description')}
              </label>
              <textarea name="descript" rows="4" cols="50" className="border w-3/4 m-2" required>
              </textarea>
            </div>
            {/* url */}
            <div className="flex flex-col">
              <label htmlFor="url" className="text-xl m-2">{t('post.url')}</label>
              <input type="url" name="url" className="border w-4/5 m-2" 
                placeholder="https://example.com" pattern="https://.*" size="30" required/>
            </div>
            {/* category */}
            <div>
              <label htmlFor="category" className="text-xl m-2">{t('post.category')}</label>
              <select name="category" className="border w-1/4">
                {categories.map((cat, i) =>
                  <option key={i} value={cat}>{cat}</option>
                )}
              </select>
            </div>
            <div>
              {/* image */}
              <label htmlFor="file" className="text-xl m-2 block w-full text-sm text-gray-900"
              >{t('post.uploadImage')}</label>
              <input type="file" id="avatar" name="file" 
                className="w-1/3 m-2 block text-sm text-gray-900 border border-gray-300 
                rounded cursor-pointer bg-gray-100 " required></input>  
            </div>
            <input type="submit" value="Submit" onClick={postData} 
              className="w-full 
              text-center text-white border p-1 bg-blue-500 rounded" />
          </fieldset>
        </form>
      </div>
    </div>
  );
}