import {useState,useEffect} from 'react';

function useInput({ type /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <input className='border' value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }

  export default useInput