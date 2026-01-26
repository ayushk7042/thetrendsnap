


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




  if (loading) return <div className="loader">Loading Premium News…</div>;
  if (!homepage) return null;

  const hero = homepage.mainTrending;

  return (
    <>
      <Header />

     


{hero && (
  <section className="hero-layout">
    {/* MAIN TRENDING */}
    <Link to={`/news/${hero.slug}`} className="hero-main">
      <img src={getImageUrl(hero)} alt={hero.title} />
      <div className="hero-overlay">



        <span className="hero-badge">🔥 Trending</span>
        <h1>{hero.title}</h1>
        <p>{hero.excerpt}</p>
      </div>
    </Link>

    {/* SUB TRENDING */}
    <div className="hero-side">
      {homepage.subTrending?.slice(0, 5).map(n => (
        <Link to={`/news/${n.slug}`} key={n._id} className="side-card">
          <img src={getImageUrl(n)} />
          <div>
            <span>{n.category?.name}</span>
            <h4>{n.title}</h4>
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
      {(homepage.editorPicks || latestNews.slice(0,30)).map((n, i) => (
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



<section className="news-snapshot reveal">

  <div className="snapshot-item">
    <div className="snapshot-icon">📰</div>
    <div>
      <strong>{latestNews.length}+</strong>
      <span>Stories Published Today</span>
    </div>
  </div>

  <div className="snapshot-item">
    <div className="snapshot-icon">📂</div>
    <div>
      <strong>{homepage.categorySections.length}</strong>
      <span>Active Categories</span>
    </div>
  </div>

  <div className="snapshot-item live">
    <div className="snapshot-icon pulse">🔴</div>
    <div>
      <strong>24×7</strong>
      <span>Live News Updates</span>
    </div>
  </div>

</section>




      {/* ================= LATEST ================= */}
      <section className="latest reveal">
        <h2>Latest News</h2>
        <div className="latest-grid">
          {latestNews.map(n => (
            <Link to={`/news/${n.slug}`} key={n._id} className="latest-card">
              <img src={getImageUrl(n)} />
              <div>
                <h4>{n.title}</h4>
                <span>{n.category?.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
<button
  className="to-top"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
>
  ↑
</button>

<Footer />

    </>
  );
};

export default Home;
