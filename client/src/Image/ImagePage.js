import {useState,useEffect,useRef} from 'react'
import useInput from '../CustomHooks/useInput'

function ImagePage() {
  const [imagePostError, setImagePostError] = useState('');
  const [imageFetchError, setImageFetchError] = useState('');
  const [username, userInput] = useInput({ type: "text" });
  const inputImage = useRef(0);
  const inputUser = useRef(0);
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
      console.log(inputUser.current.value);
      let jsonFile = inputImage.current.files[0];
      const blob = await new Blob([jsonFile], { type: "application/json" });
      if(inputUser.current.value !== "" && blob) {
          fetch('/user-images', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username: inputUser.current.value,
                  image: blob,
              })
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
        <>
            <div>
                <h2>
                    All Images:
                </h2>
                <div>
                </div>
                <div>
                    <form>
                        <input type="text" ref={inputUser}/>
                        <input type="file" id="avatar" name="file" ref={inputImage}/>  
                        <button onClick={postImage}>Submit</button>
                    </form>
                </div>
            </div>
            <div>
                <h2>All Images</h2>
                <ul>
                {images.map((img) => (
                  <li key={img.user}><p>{img.user}</p><img src= {img.url} alt="userImage"></img></li>
                ))}
                </ul>
                {imageFetchError ? <div>{imageFetchError}</div>:null}
            </div>
        </>
    )
}

export default ImagePage