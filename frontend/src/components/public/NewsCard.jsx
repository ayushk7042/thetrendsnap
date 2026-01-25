// import { Link } from "react-router-dom";

// const NewsCard = ({ news }) => {
//   return (
//     <div className="news-card">
//       <img src={news.image} alt={news.title} />
//       <h3>
//         <Link to={`/news/${news.slug}`}>{news.title}</Link>
//       </h3>
//       <p>{news.seoDescription}</p>
//     </div>
//   );
// };

// export default NewsCard;



import { Link } from "react-router-dom";
import "./NewsCard.css";

const getImageUrl = (featuredImage) => {
  if (!featuredImage) return null;

  // case 1: populated object { url }
  if (typeof featuredImage === "object" && featuredImage.url) {
    return featuredImage.url;
  }

  // case 2: object but different key
  if (typeof featuredImage === "object" && featuredImage.path) {
    return featuredImage.path;
  }

  // case 3: string (filename or id)
  if (typeof featuredImage === "string") {
    // agar already full URL hai
    if (featuredImage.startsWith("http")) return featuredImage;

    // 👇 yahan apna uploads base path daalo
    return `http://localhost:5000/uploads/${featuredImage}`;
  }

  return null;
};

const NewsCard = ({ news }) => {
  const imageUrl = getImageUrl(news.featuredImage);

  return (
    <article className="news-card">
      <Link to={`/news/${news.slug}`} className="news-card-image">
        {imageUrl ? (
          <img src={imageUrl} alt={news.title} />
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
