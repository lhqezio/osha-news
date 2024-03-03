import { Link } from 'react-router-dom';
import home from '../images/home.png';
import search from '../images/search.png';
import avatar from '../images/avatar.png';

export default function Navbar(){
  return (
    <nav className="py-1">
      <ul className="flex flex-row justify-between">
        <li className="inline w-1/3">
          <div className="flex flex-row justify-items-start">
            <Link to={`/`}><img className="size-7 p-1" src={home} alt="home icon"/></Link>
            <img className="size-7 p-1 rounded-md" src={search} alt="search icon"/>
            <input className="border my-px" type="text"/>
          </div>
        </li>
        <li className="inline w-1/3 flex justify-items-end">
          <h1 className="text-center w-full">OSHA News</h1>
        </li>
        <li className="inline w-1/3">
          <div className="grid grid-rows-1 justify-items-end">
            <div className="flex flex-row">
              <h1>User</h1>
              <img className="size-7" src={avatar} alt="profile"/>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}