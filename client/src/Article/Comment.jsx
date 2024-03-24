import comment from '../images/chat.png';
import React, {useState} from 'react';
import { useClickAway } from '@uidotdev/usehooks';

export default function Comment(){
  const [hidden, setHidden] = useState(true);
  const [closeByClickedAway, setCloseByClickedAway] = useState(false);
  const comments = useState([
    {
      user: 'Bob',
      comment: 'This is a comment'
    },
    {
      user: 'Billy',
      comment: 'No way!!!'
    },
    {
      user: 'Sam',
      comment: 'This is crazy'
    },
  ]);

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
        <img className="size-6 my-1 mr-2" onClick={showCategories} 
          src={comment} alt="comment icon"/>
        <ul ref={ref} className={ hidden ? 'hidden' : 
          'block border rounded-md p-2 -mt-2' +
          ' overflow-auto w-80 h-52 absolute bg-white md:bg-opacity-95 z-10 font-bold' +
          ' absolute bottom-0 right-0' }>
          {comments[0].map((com, i) =>
            <li key={i} className="m-2">
              <p className="text-xl">{com.user}</p>
              <p>{com.comment}</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}