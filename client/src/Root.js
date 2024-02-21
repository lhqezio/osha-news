import { Outlet, Link } from 'react-router-dom';

export default function Root(){
  return (
    <div>
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
        <Outlet />
      </div>
    </div>
  );
}