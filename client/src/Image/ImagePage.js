import {useState,useEffect,useRef} from 'react'
import useInput from '../CustomHooks/useInput'

function ImagePage() {
  const [imagePostError, setImagePostError] = useState('')
  const [imageFetchError, setImageFetchError] = useState('')
  const [username, userInput] = useInput({ type: "text" });
  const inputImage = useRef(0)
  const [images, setImages] = useState([])

    useEffect(
        ()=>{
            fetch('/user-image')
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
    )

    async function postImage() {
      let jsonFile = inputImage.current.files[0]
      const blob = await new Blob([jsonFile], { type: "application/json" });
      if(username !== "" && blob) {
          fetch('/user-image', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username: username,
                  image: blob,
              })
          }).then(
              (resp)=>{
                  setImagePostError("Connection Error Occured")
              }
          ).catch(
              (err)=>{
                  setImagePostError("Server Error Occured")
              }
          )
      } else {
          setImagePostError("One or more required fields are empty")
      }
    }

    return (
        <>
            <div>
                <h2>
                    All Images:
                </h2>
                <div>
                UserName<br />
                {userInput}
                </div>
                <div>
                <label for="avatar">Image</label><br />
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" ref={inputImage}/>  
                </div>
                <button onClick={postImage} type="button">Post Comment</button>
                {imagePostError ? <div>{imagePostError}</div> : null}
            </div>
            <div>
                <h2>All Images</h2>
                <ul>
                {images.map((img) => (
                  <li key={img.user}><p>{img.user}</p><img src= {img.uri} alt="userImage"></img></li>
                ))}
                </ul>
                {imageFetchError ? <div>{imageFetchError}</div>:null}
            </div>
        </>
    )
}

export default ImagePage