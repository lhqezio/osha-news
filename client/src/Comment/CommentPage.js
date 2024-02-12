import {useState,useEffect} from 'react'
import useInput from '../CustomHooks/useInput'

function CommentPage() {
    const [commentPostError, setCommentPostError] = useState('')
    const [commentFetchError, setCommentFetchError] = useState('')
    const [buttonClicked,setButtonClicked] = useState(false)
    const [comments,setComments] = useState([])
    const [username, userInput] = useInput({ type: "text" });
    const [comment, commentInput] = useInput({ type: "text" });

    useEffect(
        ()=>{
            fetch('/user-comment')
                .then(
                    (resp)=>{
                        if(!resp.ok) {
                            setCommentFetchError("Connection Error Occurred")
                        }
                        else {
                            return resp.json()
                        }
                    }
                )
                .then (
                    (json)=>{
                        setComments(json)
                    }
                )
                .catch (
                    (err)=>{
                        setCommentFetchError("Server Error Occured")
                    }
                )
        },
        [buttonClicked]
    )

    function postComment() {
        if(username && comment) {
            fetch('/user-comment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    comment: comment,
                })
            }).then(
                (resp)=>{
                    setCommentPostError("Connection Error Occured")
                }
            ).catch(
                (err)=>{
                    setCommentPostError("Server Error Occured")
                }
            )
        } else {
            setCommentPostError("One or more required fields are empty")
        }
    }

    return (
        <>
            <div>
                <h2>
                    New Comment:
                </h2>
                <div>
                UserName<br />
                {userInput}
                </div>
                <div>
                Comment<br />
                {commentInput}
                </div>
                <button onClick={postComment} type="button" className='border'>Post Comment</button>
                {commentPostError ? <div>{commentPostError}</div> : null}
            </div>
            <div>
                <h2>
                    All comments
                </h2>
                {commentFetchError ? <div>{commentFetchError}</div>:null}
            </div>
        </>
    )
}

export default CommentPage