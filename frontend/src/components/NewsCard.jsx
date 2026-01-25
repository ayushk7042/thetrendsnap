


// import { Link } from "react-router-dom";


// const NewsCard = ({ news }) => {
//   return (
//     <div className="news-card">
//       {news?.featuredImage?.url && (
//         <img src={news.featuredImage.url} alt={news.title} />
//       )}

//       <h3>
//         <Link to={`/news/${news.slug}`}>{news.title}</Link>
//       </h3>

//       <p>{news.seoDescription}</p>
//     </div>
//   );
// };



// export default NewsCard;



import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <article className="news-card">
      <Link to={`/news/${news.slug}`} className="news-card-image">
        {news?.featuredImage?.url ? (
          <img src={news.featuredImage.url} alt={news.title} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </Link>

      <div className="news-card-content">
        <h3>
          <Link to={`/news/${news.slug}`}>{news.title}</Link>
        </h3>

        {news.seoDescription && <p>{news.seoDescription}</p>}
      </div>
    </article>
  );
};

export default NewsCard;
