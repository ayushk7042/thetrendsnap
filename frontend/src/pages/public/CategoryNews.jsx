

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

const readingTime = (text = "") =>
  Math.max(1, Math.ceil((text?.split(" ") || []).length / 200));

const CategoryNews = () => {
  const { slug } = useParams();
  const [categoryNews, setCategoryNews] = useState([]);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    getNews().then(res => {
      const all = res.data || [];
      const filtered = all.filter(n => n.category?.slug === slug);
      setCategoryNews(filtered);
      setLatest(all.slice(0, 15));
    });
  }, [slug]);

  const featured = categoryNews[0];
  const remaining = categoryNews.slice(1);

  return (
    <>
      <Header />

      {/* PREMIUM HERO */}
      <section className="category-hero reveal">
        <div className="hero-content">
          <div className="hero-breadcrumb">
            <Link to="/">Home</Link> / <span>{slug.replace(/-/g, " ").toUpperCase()}</span>
          </div>
          <h1 className="hero-title">{slug.replace(/-/g, " ")}</h1>
          <p className="hero-subtitle">Explore {categoryNews.length} articles in this category</p>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {featured && (
        <section className="featured-section reveal">
          <Link to={`/news/${featured.slug}`} className="featured-card">
            <div className="featured-image">
              <img src={getImageUrl(featured)} alt={featured.title} />
              <div className="featured-overlay"></div>
            </div>
            <div className="featured-content">
              <div className="featured-badge">Featured</div>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <div className="featured-meta">
                <span>⏱ {readingTime(featured.content)} min read</span>
                <span className="featured-cat">{featured.category?.name}</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* MAIN LAYOUT */}
      <section className="category-layout reveal">
        {/* LEFT: News Grid */}
        <div className="news-main">
          <h3 className="section-title">Latest Articles</h3>
          {remaining.length > 0 ? (
            <div className="news-grid">
              {remaining.map(n => (
                <Link
                  to={`/news/${n.slug}`}
                  key={n._id}
                  className="news-card"
                >
                  <div className="news-image">
                    <img src={getImageUrl(n)} alt={n.title} />
                  </div>
                  <div className="news-content">
                    <span className="news-badge">{n.category?.name}</span>
                    <h3>{n.title}</h3>
                    <p>{n.excerpt}</p>
                    <div className="news-footer">
                      <span className="read-time">⏱ {readingTime(n.content)} min</span>
                      <span className="read-more">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No articles found in this category</p>
            </div>
          )}
        </div>

        {/* RIGHT: Sidebar */}
        <aside className="category-sidebar">
          <div className="sidebar-card">
            <h4 className="sidebar-title">Recent Posts</h4>
            <div className="sidebar-list">
              {latest.map((n, idx) => (
                <Link
                  to={`/news/${n.slug}`}
                  key={n._id}
                  className="sidebar-item"
                >
                  <div className="sidebar-index">{idx + 1}</div>
                  <div className="sidebar-content">
                    <div className="sidebar-title-text">{n.title}</div>
                    <div className="sidebar-cat">{n.category?.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="sidebar-card sidebar-cta">
            <h4>Trending Now</h4>
            <p>Stay updated with the latest news and insights</p>
            <Link to="/category" className="sidebar-btn">Browse All Categories</Link>
          </div>
        </aside>
      </section>

      <Footer />
    </>
  );
};

export default CategoryNews;
