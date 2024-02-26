import { Link } from 'react-router-dom';
import ShortScroll from './Article/ShortScroll';

export default function Root(){
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`/`}><img src="../images/home.png" alt="home icon"></img></Link>
          </li>
          <li>
            <img src="../images/search.png" alt="search icon"></img>
          </li>
          <li>
            <input type="text" value="Search"/>
          </li>
          <li>
            <h1>OSHA News</h1>
          </li>
          <li>User</li>
          <li>
            <img src="../images/avatar.png" alt="User Avatar"></img>
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