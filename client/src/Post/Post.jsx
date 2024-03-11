// import { Link } from 'react-router-dom';
import React, {useState, useEffect, useRef} from 'react';
import Navbar from '../Navbar/Navbar.jsx';

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
  
  
  function postData(){
    const formData = new FormData(form.current);
    if (formData) {
      fetch('/article/add', {
        method: 'POST',
        body: formData
      }).then(
        (resp)=>{
          if (resp.ok){
            setErrorMsg("New Article Added");
          }else {
            setErrorMsg("Respone Error Occured");
          }
        }
      )
    } else {
      setErrorMsg("Missing Fields from form")
    }
  }
  
  return (
    <div>
      <Navbar/>
      <div className="w-screen h-screen">
        <form className="flex flex-col border m-auto absolute inset-1/4" ref={ form }>
          <feildset className="flex flex-col p-3">
            <legend>Upload Article</legend>
            <label htmlFor="article-name" className="text-xl m-1">Article Headline:</label>
            <input type="text" name="article-name" className="border w-1/4 m-1"/>
            <label htmlFor="short-description" className="text-xl m-1">Article Description:</label>
            <textarea id="w3review" name="w3review" rows="4" cols="50" className="border w-3/4 m-1">
            </textarea>
            <label htmlFor="category" className="text-xl m-1">Category:</label>
            <select name="category" className="border w-1/4 m-1">
              {categories.map((cat, i) =>
                <option key={i} value={cat}>{cat}</option>
              )}
            </select>
            <label htmlFor="file" className="text-xl m-1">Upload image</label>
            <input type="file" id="avatar" name="file" className="w-1/3 m-1"></input>  
            <button type="button" onClick={postData} className="w-1/5 m-1 text-left">Submit</button>
          </feildset>
        </form>
      </div>
    </div>
  );
}