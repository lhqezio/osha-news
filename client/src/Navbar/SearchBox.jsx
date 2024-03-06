export default function SearchBox(props) {
  return (
    <ul className={ !props.show ? 'hidden' : 
      'block rounded-md mt-4 mx-auto p-2 border border-gray-400' +
        ' overflow-auto w-[70vw] h-[70vh] absolute bg-white md:bg-opacity-95 z-20 font-bold' +
        ' top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    } >
      
    </ul>
  );
}