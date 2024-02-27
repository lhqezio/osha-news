export default function Article({article}) {
  return (

    <section 
      style={{ backgroundImage : `url('${article.image}')`}}
      class={'snap-start h-[80vh] rounded-xl p-4 bg-no-repeat bg-cover bg-center bg-fixed'} >
      <div className="w-1/2 backdrop-blur-lg p-6 drop-shadow-md rounded-lg">
        <div className="text-4xl font-serif">
          {article.headline}
        </div>
        <div>
          {article.short_description}
        </div>
        <div>
          {article.authors}
        </div>
        <div>
          {article.date}
        </div>
        <div>
          <a className="text-blue-600" href={`${article.link}`}>Read More</a>
        </div>
      </div>
    </section>
  );
}