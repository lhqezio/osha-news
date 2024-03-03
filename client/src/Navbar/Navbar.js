import { Link } from 'react-router-dom';
import home from '../images/home.png';
import search from '../images/search.png';
import avatar from '../images/avatar.png';

export default function Navbar(){
  return (
    <nav class="py-1">
      <ul class="flex flex-row justify-between">
        <li class="inline w-1/3">
          <div class="flex flex-row justify-items-start">
            <Link to={`/`}><img class="size-7 p-1" src={home} alt="home icon"/></Link>
            <img class="size-7 p-1 rounded-md" src={search} alt="search icon"/>
            <input class="border my-px" type="text"/>
          </div>
        </li>
        <li class="inline w-1/3 flex justify-items-end">
          <h1 class="text-center w-full">OSHA News</h1>
        </li>
        <li class="inline w-1/3">
          <div class="grid grid-rows-1 justify-items-end">
            <div class="flex flex-row">
              <h1>User</h1>
              <img class="size-7" src={avatar} alt="profile"/>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}