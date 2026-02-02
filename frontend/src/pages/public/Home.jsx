


import { useEffect, useState } from "react";
import { getHomepage } from "../../api/homepage.api";
import { getNews } from "../../api/news.api";
import Header from "../../components/public/Header";
import { Link } from "react-router-dom";
import "./Home.css";
import Footer from "../../components/public/Footer";

const getImageUrl = (news) => {
  if (!news?.featuredImage?.url) return "/no-image.jpg";
  if (news.featuredImage.url.startsWith("http")) return news.featuredImage.url;
  return `http://localhost:5000${news.featuredImage.url}`;
};

const readingTime = (text = "") =>
  Math.max(1, Math.ceil(text.split(" ").length / 200));


const Home = () => {
  const [homepage, setHomepage] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [homeRes, newsRes] = await Promise.all([
          getHomepage(),
          getNews()
        ]);

        setHomepage(homeRes?.data);
        setLatestNews(newsRes?.data || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    els.forEach(el => el.classList.add("pending"));

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            e.target.classList.remove("pending");
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (loading) return (
    <div className="loader-container">
      <div className="premium-loader">
        <div className="loader-spinner"></div>
        <p>Loading Premium News…</p>
      </div>
    </div>
  );
  if (!homepage) return null;

  const hero = homepage.mainTrending;

  return (
    <div className="home-wrapper">
      <Header />

      {/* ULTRA PREMIUM HERO SECTION */}
      {hero && (
        <section className="hero-premium reveal">
          <div className="hero-main-grid">
            {/* LEFT: Featured Article Card */}
            <div className="hero-card-left">
              <div className="hero-badge">{hero.category?.name || "TRENDING"}</div>
              <h1 className="hero-headline">{hero.title}</h1>
              <p className="hero-desc">{hero.excerpt}</p>
              <div className="hero-meta">
                <span>⏱ {readingTime(hero.content)} min read</span>
                <span>Published Today</span>
              </div>
              <div className="hero-btns">
                <Link to={`/news/${hero.slug}`} className="btn-cta">Read Article</Link>
                <Link to={`/category/${hero.category?.slug || ""}`} className="btn-outline">View Category</Link>
              </div>
            </div>

            {/* RIGHT: Featured Image */}
            <div className="hero-image-main">
              <img src={getImageUrl(hero)} alt={hero.title} />
            </div>
          </div>

          {/* TRENDING ITEMS BELOW */}
          <div className="hero-trending-row">
            {homepage.subTrending?.slice(0, 4).map((n) => (
              <Link key={n._id} to={`/news/${n.slug}`} className="trending-item-card">
                <img src={getImageUrl(n)} alt={n.title} />
                <div className="trending-item-content">
                  <div className="trending-cat">{n.category?.name}</div>
                  <h3>{n.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}








{/* ================= BREAKING TICKER ================= */}
{/* ================= BREAKING TICKER ================= */}
{(homepage.breaking?.length > 0 || latestNews.length > 0) && (
  <div className="breaking-wrap">
    <span className="breaking-label">BREAKING</span>

    <div className="breaking-track">
      <div className="breaking-move">
        {(homepage.breaking || latestNews.slice(0,10)).map((n, i) => (
          <Link key={i} to={`/news/${n.slug}`}>
            {n.title}
          </Link>
        ))}
      </div>
    </div>
  </div>
)}


{/* ================= EDITOR PICKS ================= */}
{(homepage.editorPicks?.length > 0 || latestNews.length > 0) && (
  <section className="editor-picks reveal">
    <h3>Editor’s Picks</h3>

    <div className="pick-row">
      {(homepage.editorPicks || latestNews.slice(0,8)).map((n, i) => (
        <Link to={`/news/${n.slug}`} key={i} className="pick-card">
          <img src={getImageUrl(n)} />
          <p>{n.title}</p>
        </Link>
      ))}
    </div>
  </section>
)}




{/* ================= TRENDING TOPICS ================= */}
{(homepage.trendingTopics?.length > 0 || homepage.categorySections?.length > 0) && (
  <div className="topic-wrap">
    {(homepage.trendingTopics ||
      homepage.categorySections.map(c => ({
        name: c.category?.name,
        slug: c.category?.slug
      }))
    ).map((t, i) => (
      <Link key={i} to={`/category/${t.slug}`} className="topic-pill">
        #{t.name}
      </Link>
    ))}
  </div>
)}




      {/* ================= CATEGORY BLOCKS ================= */}
      {/* {homepage.categorySections?.map((sec, i) => (
        <section key={i} className="category">
          <div className="cat-head">
            <h2>{sec.category?.name}</h2>
            <Link to={`/category/${sec.category?.slug}`}>View All →</Link>
          </div>

          <div className="cat-grid">
            {sec.trending && (
              <Link to={`/news/${sec.trending.slug}`} className="cat-main">
                <img src={getImageUrl(sec.trending)} />
                <div>
                  <span className="chip">Trending</span>
                  <h3>{sec.trending.title}</h3>
                </div>
              </Link>
            )}

            <div className="cat-side">
              {sec.subTrending?.map(n => (
                <Link to={`/news/${n.slug}`} key={n._id}>
                  <img src={getImageUrl(n)} />
                  <p>{n.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))} */}


      {/* ================= CATEGORY SPOTLIGHT ================= */}
{homepage.categorySections?.map((sec, i) => (
  <section key={i} className="category-spotlight reveal">
    
    <div className="spotlight-head">
      <h2>{sec.category?.name}</h2>
      <Link to={`/category/${sec.category?.slug}`}>
        View All →
      </Link>
    </div>

    <div className="spotlight-grid">
      
      {/* FEATURED STORY */}
      {sec.trending && (
        <Link
          to={`/news/${sec.trending.slug}`}
          className="spotlight-featured"
        >
          <img src={getImageUrl(sec.trending)} />
          <div className="spotlight-overlay">
            <span className="spotlight-badge">Editor’s Pick</span>
            <h3>{sec.trending.title}</h3>
          </div>
        </Link>
      )}

      {/* QUICK READS */}
      <div className="spotlight-list">
        {sec.subTrending?.slice(0, 4).map(n => (
          <Link to={`/news/${n.slug}`} key={n._id} className="spotlight-item">
            <img src={getImageUrl(n)} />
            <div>
              <span className="quick">Quick Read</span>
              <p>{n.title}</p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  </section>
))}



<section className="premium-stats-section reveal">

  <h2 className="stats-title">The Trends Snapshot</h2>

  <div className="stats-grid">
    <div className="stat-card">
      <div className="stat-icon">📰</div>
      <div>
        <strong>{latestNews.length}+</strong>
        <span>Stories Today</span>
      </div>
    </div>

    <div className="stat-card">
      <div className="stat-icon">🎯</div>
      <div>
        <strong>{homepage.categorySections?.length || 0}</strong>
        <span>Categories</span>
      </div>
    </div>

    <div className="stat-card live">
      <div className="stat-icon"><span className="live-pulse">🔴</span></div>
      <div>
        <strong>24/7</strong>
        <span>Live Coverage</span>
      </div>
    </div>

    <div className="stat-card">
      <div className="stat-icon">⚡</div>
      <div>
        <strong>Real-time</strong>
        <span>Updates</span>
      </div>
    </div>
  </div>

</section>

      {/* LATEST NEWS */}
      <section className="premium-latest-news reveal">
        <div className="latest-header">
          <h2>📋 Latest News</h2>
          <p className="section-subtitle">Freshly published stories</p>
        </div>

        <div className="latest-news-grid">
          {latestNews.map((n, i) => (
            <Link to={`/news/${n.slug}`} key={n._id} className="latest-news-card">
              <div className="latest-card-image">
                <img src={getImageUrl(n)} alt={n.title} />
                <span className="latest-card-index">{i + 1}</span>
              </div>
              <div className="latest-card-content">
                <h4>{n.title}</h4>
                <div className="latest-card-meta">
                  <span className="cat-badge">{n.category?.name}</span>
                  <span className="time-badge">{readingTime(n.content)} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <button
        className="premium-scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Back to top"
      >
        <span>↑</span>
      </button>

      <Footer />

    </div>
  );
};

export default Home;
