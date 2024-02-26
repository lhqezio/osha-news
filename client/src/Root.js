import { Outlet, Link } from 'react-router-dom';
import ShortScroll from './Article/ShortScroll';
import home from './images/home.png';
import search from './images/search.png';
import avatar from './images/avatar.png';

export default function Root(){
  return (
    <div>
      <nav>
        <ul class="flex flex-row justify-between">
          <li class="inline w-1/3">
            <div class="flex flex-row">
              <Link to={`/`}><img class="w-8 h-7 p-1" src={home} alt="home icon"/></Link>
              <img class="w-8 h-7 p-1" src={search} alt="search icon"/>
              <input class="border" type="text" value="Search"/>
            </div>
          </li>
          <li class="inline w-1/3">
            <h1>OSHA News</h1>
          </li>
          <li class="inline w-1/3">
            <div class="flex flex-row items-end">
              <h1>User</h1>
              <img class="w-9 h-7" src={avatar} alt="profile picture"/>
            </div>
          </li>
        </ul>
      </nav>
      <ul>
        <li>
          <Link to={`articles`}>Politics</Link>
        </li>
        <li>Wellness</li>
        <li>Entertainment</li>
        <li>Travel</li>
        <li>Style & Beauty</li>
        <li>Parenting</li>
        <li>Healthy Living</li>
        <li>Queer Voices</li>
        <li>Food & Drinks</li>
        <li>Buisness</li>
        <li>Comedy</li>
        <li>Sports</li>
        <li>Black Voices</li>
        <li>Home & Living</li>
        <li>Parents</li>
      </ul>
      <div>
        <ShortScroll />
      </div>
    </div>
  );
}