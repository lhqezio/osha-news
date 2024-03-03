import React from 'react';
import ReactLoading from 'react-loading';
 
const LoadingAnimation = ({type, color}) => 
  <ReactLoading type={type} color={color} height={'10vw'} width={'10vw'} 
    className="my-0 mx-auto self-center"/>
;
 
export default LoadingAnimation;