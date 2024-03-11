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
  return(
    <div className="my-6">
      <p className="font-semibold text-sm">{article.category}</p>
      <p className="text-xl font-serif font-normal my-1">{article.headline}</p>
      {article.authors.trim() !== '' &&
      <p className="text-sm font-sans font-normal">{` by ${article.authors}`}</p> }      
    </div>
  );
}