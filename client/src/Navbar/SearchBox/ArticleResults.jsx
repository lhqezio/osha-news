import {Link} from 'react-router-dom';

export default function ArticleResults({articles}){
  return (
    <div>
      {
        articles.map(
          article => <ArticleResult key={article.id} article={article} />  
        )
      }    
    </div>
  );
}

function ArticleResult({article}){
  console.log(article);
  return(
    article._id ? 
      <div className="my-6">
        <p className="font-semibold text-sm">{article.category}</p>
        <Link to={`/article/${article._id}`}
          className="text-xl font-serif font-normal my-1 cursor-pointer hover:text-gray-500">
          {article.headline}
        </Link>
        {article.authors.trim() !== '' &&
        <p className="text-sm font-sans font-normal">{` by ${article.authors}`}</p> }      
      </div>
      :
      <div className="my-6">
        <p className="font-semibold text-sm">{article.category}</p>
        
        <a className="text-xl font-serif font-normal my-1 cursor-pointer hover:text-gray-500"
          href={article.link}
        >
          {article.headline}
        </a>
        {article.authors.trim() !== '' &&
        <p className="text-sm font-sans font-normal">{` by ${article.authors}`}</p> }      
      </div>
  );
}