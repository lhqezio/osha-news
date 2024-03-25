// import { Link } from 'react-router-dom';
import React, {useState, useEffect, useRef} from 'react';
// import Article from '../../../server/classes/Article.js';
// import Navbar from '../Navbar/Navbar.jsx';

/*
keep in mind
author and date are set using current dat and current user logged in
link;
headline;
category;
text;
authors;
date;
image;
*/ 
export default function PostArticle(){
  const [errorMsg, setErrorMsg] = useState('');
  const [categories, setCategories] = useState([]);
  const form = useRef(0);

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
    }, []
  );  
  
  /*
  post fetch formdata
  yyyy-mm-dd
  */
  function postData(e){
    e.preventDefault();
    if (form.current.checkValidity()) {
      const formData = new FormData(form.current);

      const currentDate = new Date().toISOString().split('T')[0];
      const articleData = {
        link: formData.get('url'),
        headline: formData.get('headline'),
        category: formData.get('category'),
        text: formData.get('descript'),
        authors: 'Clark Kent',
        date: currentDate,
        image: 'https://s.france24.com/media/display/' +
        'e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1024/p:16x9/news_en_1920x1080.jpg'
      };
      if (formData) {
        fetch('/api/article/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(articleData)
        }).then(
          (resp)=>{
            if (resp.ok){
              setErrorMsg('New Article Added');
            }else {
              setErrorMsg('Respone Error Occured');
            }
          }
        );
      } else {
        setErrorMsg('Missing Fields from form');
      }
    }else {
      form.current.reportValidity();
    }
  }
  
  return (
    <div>
      <div className="w-screen h-screen">
        <p>{ errorMsg }</p>
        <form ref={ form } 
          className="flex flex-col border-2 border-gray-300
          m-auto absolute inset-1/4 rounded shadow-lg" >
          <feildset className="flex flex-col justify-between h-full">
            <legend className="text-2xl m-2">Upload Article</legend>
            {/* headline */}
            <div>
              <label htmlFor="headline" className="text-xl m-2">Article Headline:</label>
              <input type="text" name="headline" className="border w-2/4 m-1" required/>
            </div>
            {/* description */}
            <div className="flex flex-col">
              <label htmlFor="descript" className="text-xl m-2">
                Article Description:
              </label>
              <textarea name="descript" rows="4" cols="50" className="border w-3/4 m-2" required>
              </textarea>
            </div>
            {/* url */}
            <div className="flex flex-col">
              <label htmlFor="url" className="text-xl m-2">Url of original post:</label>
              <input type="url" name="url" className="border w-4/5 m-2" 
                placeholder="https://example.com" pattern="https://.*" size="30" required/>
            </div>
            {/* category */}
            <div>
              <label htmlFor="category" className="text-xl m-2">Category:</label>
              <select name="category" className="border w-1/4">
                {categories.map((cat, i) =>
                  <option key={i} value={cat}>{cat}</option>
                )}
              </select>
            </div>
            <div>
              <label htmlFor="file" className="text-xl m-2 block w-full text-sm text-gray-900"
              >Upload image</label>
              <input type="file" id="avatar" name="file" 
                className="w-1/3 m-2 block text-sm text-gray-900 border border-gray-300 
                rounded cursor-pointer bg-gray-100 "></input>  
            </div>
            <input type="submit" value="Submit" onClick={postData} 
              className="w-full 
              text-center text-white border p-1 bg-blue-500 rounded" />
          </feildset>
        </form>
      </div>
    </div>
  );
}