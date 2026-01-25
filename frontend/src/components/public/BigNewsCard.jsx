// import { Link } from "react-router-dom";
// import "./BigNewsCard.css";

// const BigNewsCard = ({ news }) => {
//   if (!news) return null;

//   return (
//     <Link to={`/news/${news.slug}`} className="big-news-card">
//       <div className="big-news-image">
//         <img
//           src={news.image || "/placeholder-news.jpg"}
//           alt={news.title}
//         />
//         <span className="big-news-category">
//           {news.category?.name || "News"}
//         </span>
//       </div>

//       <div className="big-news-content">
//         <h1>{news.title}</h1>
//         <p>{news.excerpt || news.description?.slice(0, 120)}...</p>

//         <div className="big-news-meta">
//           <span>{news.author || "TrendSnap"}</span>
//           <span>•</span>
//           <span>
//             {new Date(news.createdAt).toLocaleDateString()}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default BigNewsCard;



import { Link } from "react-router-dom";
import "./BigNewsCard.css";

const getImageUrl = (featuredImage) => {
  if (!featuredImage) return "/placeholder-news.jpg";

  if (typeof featuredImage === "object" && featuredImage.url) {
    return featuredImage.url;
  }

  if (typeof featuredImage === "object" && featuredImage.path) {
    return featuredImage.path;
  }

  if (typeof featuredImage === "string") {
    if (featuredImage.startsWith("http")) return featuredImage;
    return `http://localhost:5000/uploads/${featuredImage}`;
  }

  return "/placeholder-news.jpg";
};

const BigNewsCard = ({ news }) => {
  if (!news) return null;

  const imageUrl = getImageUrl(news.featuredImage);

  return (
    <Link to={`/news/${news.slug}`} className="big-news-card">
      <div className="big-news-image">
        <img src={imageUrl} alt={news.title} />
        {news.category && (
          <span className="big-news-category">{news.category.name}</span>
        )}
      </div>

      <div className="big-news-content">
        <h1>{news.title}</h1>
        {news.seoDescription && (
          <p>{news.seoDescription.slice(0, 150)}...</p>
        )}
        <div className="big-news-meta">
          <span>{news.author || "TrendSnap"}</span> •{" "}
          <span>{new Date(news.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default BigNewsCard;

