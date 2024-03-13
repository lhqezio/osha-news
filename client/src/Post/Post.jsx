// import { Link } from 'react-router-dom';
import React, {useState, useEffect, useRef} from 'react';
// import Navbar from '../Navbar/Navbar.jsx';

/*
keep in mind
author and date are set using current dat and current user logged in
add image upload 
link
headline
text
image
category
*/ 
export default function PostArticle(){
  const [errorMsg, setErrorMsg] = useState('');
  const [categories, setCategories] = useState([]);
  const form = useRef(0);

  useEffect(
    ()=>{
      fetch('/categories').
        then((resp)=>{
          if(!resp.ok) {
            console.error('Error occured');
          }else {
            return resp.json();
          }
        }).
        then ((json)=>{
          setCategories(json);
        }).
        catch (()=>{
          console.error('Server Error Occured');
        });
    }, []
  );  
  
  /*
  post fetch formdata
  yyyy-mm-dd
  */
  function postData(){
    const formData = new FormData(form.current);
    if (formData) {
      fetch('/article/add', {
        method: 'POST',
        body: formData
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
            <div>
              <label htmlFor="article-name" className="text-xl m-2">Article Headline:</label>
              <input type="text" name="article-name" className="border w-2/4 m-1"/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="short-description" className="text-xl m-2">
                Article Description:
              </label>
              <textarea name="w3review" rows="4" cols="50" className="border w-3/4 m-2">
              </textarea>
            </div>
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
            <button type="button" onClick={postData} 
              className="w-full 
              text-center text-white border p-1 bg-blue-500 rounded">Submit</button>
          </feildset>
        </form>
      </div>
    </div>
  );
}