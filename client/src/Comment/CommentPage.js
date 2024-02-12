import {useState,useEffect} from 'react'
import useInput from '../CustomHooks/useInput'

function CommentPage() {
    const [commentPost, setCommentPost] = useState('')
    const [username, userInput] = useInput({ type: "text" });
    const [comment, commentInput] = useInput({ type: "text" });

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
                    setCommentPost("Connection Error Occured")
                }
            ).catch(
                (err)=>{
                    setCommentPost("Server Error Occured")
                }
            )
        } else {
            setCommentPost("One or more required fields are empty")
        }
    }

    return (
        <div>
            <h2>
                New Comment:
            </h2>
            <form>
                <div>
                UserName<br />
                {userInput}
                </div>
                <div>
                Comment<br />
                {commentInput}
                </div>
                <button onClick={postComment} type="button">Post Comment</button>
                {commentPost ? <h1>{commentPost}</h1> : null}
            </form>
        </div>
    )
}

export default CommentPage