import {useState,useEffect,useRef} from 'react'
import useInput from '../CustomHooks/useInput'

function ImagePage() {
  const [imagePostError, setImagePostError] = useState('');
  const [imageFetchError, setImageFetchError] = useState('');
  const [username, userInput] = useInput({ type: "text" });
  const form = useRef(0);
  const [images, setImages] = useState([]);

    useEffect(
        ()=>{
            fetch('/user-images')
                .then((resp)=>{
                    if(!resp.ok) {
                        setImageFetchError("Connection Error Occurred")
                    }
                    else {
                        return resp.json()
                    }
                })
                .then ((json)=>{
                    setImages(json)
                })
                .catch ((err)=>{
                    setImageFetchError("Server Error Occured")
                })
        },[]
    );

    async function postImage() {
        const formdata = new FormData(form.current);
        if(formdata) {
            fetch('/user-images', {
                method: 'POST',
                body: formdata
            }).then(
                (resp)=>{
                    setImagePostError("Connection Error Occured");
                }
            ).catch(
                (err)=>{
                    setImagePostError("Server Error Occured");
                }
            );
        } else {
            setImagePostError("One or more required fields are empty");
        }
    }

    return (
        <div>
            <div>
                <h2>
                    All Images:
                </h2>
                <div>
                </div>
                <div>
                    <form ref={form}>
                        <input type="text" name="user"/>
                        <input type="file" id="avatar" name="file"/>  
                        <input type="submit"/>
                        <button type="button" onClick={postImage}>Submit</button>
                    </form>
                </div>
            </div>
            <div>
                <h2>All Images</h2>
                <ul>
                {images.map((img) => (
                    
                  <li key={img.user}><p>{img.username}</p><img src= {img.url} alt="userImage"></img></li>
                ))}
                </ul>
                {imageFetchError ? <div>{imageFetchError}</div>:null}
            </div>
        </div>
    )
}

export default ImagePage