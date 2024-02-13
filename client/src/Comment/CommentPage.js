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
                        console.log(json)
                    }
                )
                .catch (
                    (err)=>{
                        setCommentFetchError("Server Error Occured")
                    }
                ).finally(
                    setButtonClicked(false)
                )
        },
        [buttonClicked,]
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
                    name: username,
                    comment: comment,
                })
            }).then(
                (resp)=>{
                    if(!resp.ok){
                        setCommentPostError("Connection Error Occured")
                    }
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
        <div className='m-4'>
            <div>
                <h2 className='font-bold text-4xl mb-2'>
                    New Comment:
                </h2>
                <div className='mb-2'>
                Username<br />
                {userInput}
                </div>
                <div className='mb-2'>
                Comment<br />
                {commentInput}
                </div>
                <button onClick={()=>{
                    postComment()
                    setButtonClicked(true)
                }} type="button" className='border border-black p-1 mt-2 mb-4'>Post Comment</button>
                {commentPostError ? <div>{commentPostError}</div> : null}
            </div>
            <div>
                <h2 className='font-bold text-4xl mb-2'>
                    All comments
                </h2>
                {comments.map(
                    (comment) => 
                        <Comment comment={comment} />
                )}
                {commentFetchError ? <div className='text-red-700'>{commentFetchError}</div>:null}
            </div>
        </div>
    )
}

function Comment({comment}) {
    return(
        <div>
            <div className='font-extrabold'>
                {comment.name}
            </div>
            <div className='font-light'>
                {comment.comment}
            </div>
        </div>
    )
}
export default CommentPage