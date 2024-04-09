import comment from '../images/chat.png';
import React, {useEffect, useState} from 'react';
import { useClickAway } from '@uidotdev/usehooks';

export default function Comment({articleId}){
  const [hidden, setHidden] = useState(true);
  const [closeByClickedAway, setCloseByClickedAway] = useState(false);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [send, setSend] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(`/api/comment?id=${articleId}`);
      const data = await res.json();
      setComments(data);
    };

    if (commentText === '') {
      getComments();
    }
  }, [articleId, commentText]);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch('/api/users/user-info');
      const data = await res.json();
      setUser(data);
    };
    getUser();
  }, []);

  useEffect(() => {
    const addComment = async () => {
      if (commentText.length && user !== null) {
        const currentComment = {
          postId: articleId,
          email: user.email,
          name: user.name,
          comment: commentText
        };
        await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({comment: currentComment}),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setCommentText('');
      }
    };
    if (send) {
      addComment();
      setSend(false);
    }
    forceUpdate();
  }, [send, commentText, articleId, user, forceUpdate]);

  const ref = useClickAway(() => {
    if(!hidden) {
      setHidden(true);
      setCloseByClickedAway(true);
    }
  });

  //on button press shows or hides the comments
  function showCategories(){
    if(!closeByClickedAway) {
      setHidden(false);
    }
    setCloseByClickedAway(false);
  }

  return (
    <div className="relative">
      <div className="flex flex-row ">
        <div className="size-8 backdrop-blur-lg bg-white/30 rounded-full drop-shadow-md">
          <img className="size-6 m-auto mt-1" 
            onClick={showCategories} 
            src={comment} alt="comment icon"/>
        </div>
        <ul ref={ref} className={ hidden ? 'hidden' : 
          'block border rounded-md p-2 -mt-2' +
          ' overflow-auto w-80 h-52 absolute md:bg-opacity-95 z-10 font-bold' +
          ' absolute bottom-0 right-0 backdrop-blur-lg bg-white/30' }>
          {comments && comments.length ? 
            comments.map((com, i) =>
              <li key={i} className="m-2">
                <p className="text-xl">{com.name}</p>
                <p>{com.comment}</p>
              </li>
            )
            :
            <li className="m-2">
              <p className="text-xl">No Comments</p>
            </li>
          }
          {user ?
            <div>
              <input 
                className="mr-2"
                type="text" 
                value={commentText} 
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDownCapture={(e) => {
                  if (e.key === 'Enter') {
                    setSend(true);
                  }
                }}
              />
              <button type="submit" onClick={() => setSend(true)}>
                Comment
              </button>
            </div>
            :
            <></>
          }
        </ul>
      </div>
    </div>
  );
}