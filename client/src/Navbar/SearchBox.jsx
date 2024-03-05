export default function SearchBox(props) {
  return (
    <ul className={ !props.show ? 'hidden' : 
      'block border rounded-md mt-1 mx-2 p-2' +
        ' overflow-auto w-80 h-52 absolute bg-white md:bg-opacity-90 z-10 font-bold' } >
      
    </ul>
  );
}