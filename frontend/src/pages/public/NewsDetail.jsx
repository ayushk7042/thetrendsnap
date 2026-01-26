

// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchNewsBySlug, getNews } from "../../api/news.api";
// import Header from "../../components/public/Header";
// import NewsCard from "../../components/public/NewsCard";

// import "./NewsDetail.css";

// const NewsDetail = () => {
//   const { slug } = useParams();
//   const [news, setNews] = useState(null);
//   const [latestNews, setLatestNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//  useEffect(() => {
//   const getData = async () => {
//     try {
//       setLoading(true);
//       const res = await fetchNewsBySlug(slug);
//       setNews(res.data);

//       // latest news for sidebar
//       const latestRes = await getNews();
//       setLatestNews(latestRes.data.slice(0, 10));
//     } catch (err) {
//       console.error(err);
//       setNews(null);
//     } finally {
//       setLoading(false);
//     }
//   };
//   getData();
// }, [slug]);


//   if (loading) return <p className="loading">Loading...</p>;
//   if (!news) return <p className="loading">News not found.</p>;

//   const readingTime = (text = "") =>
//     Math.max(1, Math.ceil(text.split(" ").length / 200));

//   return (
//     <>
//       <Header />

//       <div className="news-detail-wrapper">

//         {/* ===== MAIN CONTENT ===== */}
//         <article className="news-main">
//           {/* HERO */}
//           <section className="news-hero">
//             <h1>{news.title}</h1>
//             {news.subtitle && <h3>{news.subtitle}</h3>}
//             <div className="news-meta">
//               {news.category && (
//                 <Link to={`/category/${news.category.slug}`} className="news-category">
//                   {news.category.name}
//                 </Link>
//               )}
//               <span>⏱ {readingTime(news.contentBlocks.map(b => b.value).join(" "))} min read</span>
//             </div>
//           </section>

//           {/* FEATURED IMAGE */}
//           {news.featuredImage?.url && (
//             <div className="featured-image">
//               <img src={news.featuredImage.url} alt={news.title} />
//             </div>
//           )}

//           {/* CONTENT BLOCKS */}
//           <section className="news-content">
//             {news.contentBlocks?.map((block, idx) => {
//               switch (block.type) {
//                 case "text":
//                   return <p key={idx}>{block.value}</p>;

//                 case "image":
//                   return (
//                     <div className="content-image" key={idx}>
//                       <img src={block.value} alt={block.meta?.alt || `image-${idx}`} />
//                     </div>
//                   );

//                 case "link":
//                   return (
//                     <p key={idx} className="content-link-block">
//                       🔗 <a href={block.value} target="_blank" rel="noreferrer">{block.meta?.anchor || block.value}</a>
//                     </p>
//                   );

//                 case "affiliate":
//                   return (
//                     <div key={idx} className="affiliate-block">
//                       {block.value.productImage && <img src={block.value.productImage} alt={block.value.title} />}
//                       <div className="affiliate-info">
//                         <p className="affiliate-title">{block.value.title}</p>
//                         <p className="affiliate-price">{block.value.price}</p>
//                         <a href={block.value.link} target="_blank" rel="noreferrer" className="affiliate-btn">
//                           {block.value.buttonText || "Buy Now"}
//                         </a>
//                       </div>
//                     </div>
//                   );

//                 default:
//                   return null;
//               }
//             })}
//           </section>

//           {/* RELATED POSTS */}
//           {news.relatedNews?.length > 0 && (
//             <section className="related-news">
//               <h2>Related News</h2>
//               <div className="news-grid">
//                 {news.relatedNews.map(item => (
//                   <NewsCard key={item._id} news={item} />
//                 ))}
//               </div>
//             </section>
//           )}
//         </article>

//         {/* ===== SIDEBAR ===== */}
//         <aside className="news-sidebar">
//           <h3>Latest Posts</h3>
//           {latestNews.map((n) => (
//             <Link key={n._id} to={`/news/${n.slug}`} className="sidebar-news">
//               <img src={n.featuredImage?.url || "/no-image.jpg"} alt={n.title} />
//               <div>
//                 <p>{n.title}</p>
//                 <span>{n.category?.name}</span>
//               </div>
//             </Link>
//           ))}
//         </aside>
//       </div>
//     </>
//   );
// };

// export default NewsDetail;




// src/pages/public/NewsDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchNewsBySlug, getNews } from "../../api/news.api";
import Header from "../../components/public/Header";
import NewsCard from "../../components/public/NewsCard";
import "./NewsDetail.css";
import Footer from "../../components/public/Footer";

const NewsDetail = () => {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
const [relatedPosts, setRelatedPosts] = useState([]);


  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetchNewsBySlug(slug);
  //       setNews(res.data);

  //       const latestRes = await getNews();
  //       // exclude current news from latest
  //       const latest = latestRes.data.filter(n => n.slug !== slug).slice(0, 10);
  //       setLatestNews(latest);
  //     } catch (err) {
  //       console.error(err);
  //       setNews(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getData();
  // }, [slug]);

useEffect(() => {
  const getData = async () => {
    try {
      setLoading(true);

      // 1️⃣ Current news
      const res = await fetchNewsBySlug(slug);
      const currentNews = res.data;
      setNews(currentNews);

      // 2️⃣ All news
      const allNewsRes = await getNews();
      const allNews = allNewsRes.data;

      // 3️⃣ Latest news (sidebar)
      const latest = allNews
        .filter(n => n.slug !== slug)
        .slice(0, 15);
      setLatestNews(latest);

      // 4️⃣ Related posts (same category)
      if (currentNews.category) {
        const related = allNews.filter(
          n =>
            n.slug !== slug &&
            n.category &&
            n.category.slug === currentNews.category.slug
        ).slice(0, 6);

        setRelatedPosts(related);
      }

    } catch (err) {
      console.error(err);
      setNews(null);
    } finally {
      setLoading(false);
    }
  };

  getData();
}, [slug]);



  if (loading) return <p className="loading">Loading News...</p>;
  if (!news) return <p className="loading">News not found.</p>;

  const readingTime = (text = "") =>
    Math.max(1, Math.ceil(text.split(" ").length / 200));

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
    twitter: `https://twitter.com/intent/tweet?url=${window.location.href}&text=${news.title}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${news.title}`
  };

  return (
    <>
      <Header />

      <div className="news-detail-page">
        {/* ===== MAIN CONTENT ===== */}
        <article className="news-detail-container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/">Home</Link> /{" "}
            {news.category && <Link to={`/category/${news.category.slug}`}>{news.category.name}</Link>} /{" "}
            <span>{news.title}</span>
          </div>

          {/* Hero / Title */}
          <section className="news-hero">
            <h1>{news.title}</h1>
            {news.subtitle && <h3>{news.subtitle}</h3>}
            <div className="news-meta">
              {news.category && (
                <Link to={`/category/${news.category.slug}`} className="news-category">
                  {news.category.name}
                </Link>
              )}
              <span className="reading-time">
                ⏱ {readingTime(news.contentBlocks.map(b => b.value).join(" "))} min read
              </span>
            </div>
          </section>

          {/* Featured Image */}
          {news.featuredImage?.url && (
            <div className="featured-image">
              <img src={news.featuredImage.url} alt={news.title} />
            </div>
          )}

          {/* Content Blocks */}
          <section className="news-content">
            {news.contentBlocks?.map((block, idx) => {
              switch (block.type) {
                case "text":
                  return <p key={idx}>{block.value}</p>;

                case "image":
                  return (
                    <div className="content-image" key={idx}>
                      <img src={block.value} alt={block.meta?.alt || `image-${idx}`} />
                    </div>
                  );

                case "link":
                  return (
                    <p key={idx} className="content-link-block">
                      🔗 <a href={block.value} target="_blank" rel="noreferrer">{block.meta?.anchor || block.value}</a>
                    </p>
                  );

                case "affiliate":
                  return (
                    <div key={idx} className="affiliate-block">
                      {block.value.productImage && <img src={block.value.productImage} alt={block.value.title} />}
                      <div className="affiliate-info">
                        <p className="affiliate-title">{block.value.title}</p>
                        <p className="affiliate-price">{block.value.price}</p>
                        <a
                          href={block.value.link}
                          target="_blank"
                          rel="noreferrer"
                          className="affiliate-btn"
                        >
                          {block.value.buttonText || "Buy Now"}
                        </a>
                      </div>
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </section>

          {/* Social Share */}
          <section className="social-share">
            <span>Share:</span>
            <a href={shareLinks.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={shareLinks.twitter} target="_blank" rel="noreferrer">Twitter</a>
            <a href={shareLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </section>

          {/* Related News */}
          {/* {news.relatedNews?.length > 0 && (
            <section className="related-news">
              <h2>Related News</h2>
              <div className="news-grid">
                {news.relatedNews.map(item => (
                  <NewsCard key={item._id} news={item} />
                ))}
              </div>
            </section>
          )} */}

{relatedPosts.length > 0 && (
  <section className="related-news">
    <h2>Related Posts</h2>
    <div className="news-grid">
      {relatedPosts.map(item => (
        

        <NewsCard key={item._id} news={item} />
      ))}
      

    </div>
  </section>
)}



        </article>

        {/* ===== SIDEBAR ===== */}
        <aside className="news-sidebar">
          <h3>Latest News</h3>
          {latestNews.map(item => (
            <Link key={item._id} to={`/news/${item.slug}`} className="sidebar-item">
              {item.featuredImage?.url && <img src={item.featuredImage.url} alt={item.title} />}
              <p>{item.title}</p>
            </Link>
          ))}
        </aside>
      </div>
<Footer />

    </>
  );
};

export default NewsDetail;
