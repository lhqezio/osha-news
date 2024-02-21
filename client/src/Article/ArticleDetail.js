export default function ArticleDetail({article}) {
  return (
    <div>
      <h1>
        {article['headline']}
      </h1>
      <p>
        {article['category']}
      </p>
      <p>
        {article['authors']}
      </p>
      <p>
        {article['date']}
      </p>
    </div>
  );
}