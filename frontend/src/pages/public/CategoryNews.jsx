// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getNews } from "../../api/news.api";
// import Header from "../../components/public/Header";
// import NewsCard from "../../components/public/NewsCard";

// const CategoryNews = () => {
//   const { slug } = useParams();
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     getNews().then((res) => {
//       const filtered = res.data.filter(
//         (n) => n.category?.slug === slug
//       );
//       setNews(filtered);
//     });
//   }, [slug]);

//   return (
//     <>
//       <Header />

//       <h2 className="category-title">
//         {slug.toUpperCase()}
//       </h2>

//       <section className="news-grid">
//         {news.length > 0 ? (
//           news.map((n) => (
//             <NewsCard key={n._id} news={n} />
//           ))
//         ) : (
//           <p>No news found</p>
//         )}
//       </section>
//     </>
//   );
// };

// export default CategoryNews;




import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNews } from "../../api/news.api";
import Header from "../../components/public/Header";
import "./CategoryNews.css";
import Footer from "../../components/public/Footer";

const getImageUrl = (news) => {
  if (!news?.featuredImage?.url) return "/no-image.jpg";
  if (news.featuredImage.url.startsWith("http"))
    return news.featuredImage.url;
  return `http://localhost:5000${news.featuredImage.url}`;
};

const CategoryNews = () => {
  const { slug } = useParams();
  const [categoryNews, setCategoryNews] = useState([]);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    getNews().then(res => {
      const all = res.data || [];
      setCategoryNews(all.filter(n => n.category?.slug === slug));
      setLatest(all.slice(0, 10));
    });
  }, [slug]);

  return (
    <>
      <Header />

      {/* ===== LIGHT HERO ===== */}
      {/* <section className="cat-hero">
        <h1>{slug.replace("-", " ")}</h1>
        <p>Latest and trusted news from this category</p>
      </section> */}

      <section className="cat-hero">
  <div className="cat-hero-inner">
    <h1>{slug.replace("-", " ")}</h1>
    <p>Latest and trusted news from this category</p>
  </div>
</section>


      {/* ===== MAIN LAYOUT ===== */}
      <section className="cat-layout">

        {/* LEFT – NEWS LIST */}
        <div className="cat-list">
          {categoryNews.length > 0 ? (
            categoryNews.map(n => (
              <Link
                to={`/news/${n.slug}`}
                key={n._id}
                className="news-row"
              >
                <img src={getImageUrl(n)} alt={n.title} />

                <div className="news-row-content">
                  <span className="news-cat">
                    {n.category?.name}
                  </span>

                  <h3>{n.title}</h3>

                  <p>{n.excerpt}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="empty">No news found</p>
          )}
        </div>

        {/* RIGHT – SIDEBAR */}
        <aside className="cat-sidebar">
          <h4>New Posts</h4>

          {latest.map(n => (
            <Link
              to={`/news/${n.slug}`}
              key={n._id}
              className="side-item"
            >
              <img src={getImageUrl(n)} />
              <p>{n.title}</p>
            </Link>
          ))}
        </aside>

      </section>
      <Footer />
    </>
  );
};

export default CategoryNews;
