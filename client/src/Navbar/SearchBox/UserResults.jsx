import {Link} from 'react-router-dom';

export default function UserResults({users}){
  return (
    <div>
      {
        users.map(
          user => <UserResult key={user.name} user={user} />  
        )
      }    
    </div>
  );
}

function UserResult({user}){
  if (user){
    return(
      <div className="flex flex-row w-full my-6">
        <img className="size-6 my-1 mr-2 rounded-full" src={user.image}></img> 
        <Link to={`/profile/${user.name}`} 
          className="font-semibold pt-2 text-sm">
          {user.name}
        </Link>    
      </div>
    );
  }
  
}