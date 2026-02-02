

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../api/category.api";
import { getNews } from "../../api/news.api";
import "./Header.css";

const getImageUrl = (news) => {
  if (!news?.featuredImage?.url) return "/no-image.jpg";
  if (news.featuredImage.url.startsWith("http"))
    return news.featuredImage.url;
  return `${import.meta.env.VITE_API_URL}${news.featuredImage.url}`;
};



const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showAllCats, setShowAllCats] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  // SEARCH LOGIC
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    getNews().then(res => {
      const q = query.toLowerCase();

      const newsMatches = res.data.filter(n =>
        n.title.toLowerCase().includes(q)
      );

      const categoryMatches = categories.filter(c =>
        c.name.toLowerCase().includes(q)
      );

      setResults([
        ...newsMatches.map(n => ({ type: "news", data: n })),
        ...categoryMatches.map(c => ({ type: "category", data: c }))
      ]);
    });
  }, [query, categories]);

  return (


<header className="site-header">
  <div className="header-inner">

    {/* LEFT */}
    <div className="left-box">
      <button
        className="menu-btn"
        onClick={() => setShowAllCats(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      <Link to="/" className="logo">
        The<span>Trend</span>Snap
      </Link>
    </div>

    {/* CENTER */}
    <nav className="category-bar">
      {categories.slice(0, 6).map(cat => (
        <Link key={cat._id} to={`/category/${cat.slug}`} className="cat-link">
          {cat.name}
        </Link>
      ))}
    </nav>





    {/* RIGHT */}
    <div className="search-box">
      <input
        placeholder="Search news, categories..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      {/* CLEAR BUTTON */}
      {query && (
        <button
          className="clear-btn"
          onClick={() => {
            setQuery("");
            setResults([]);
          }}
        >
          ✕
        </button>
      )}

      {/* {results.length > 0 && (
        <div className="search-results">
          {results.map((r, i) => (
            <div
              key={i}
              className="search-item"
              onClick={() => {
                navigate(
                  r.type === "news"
                    ? `/news/${r.data.slug}`
                    : `/category/${r.data.slug}`
                );
                setQuery("");
                setResults([]);
              }}
            >
              <span className="badge">
                {r.type === "news" ? "NEWS" : "CATEGORY"}
              </span>
              <p>{r.type === "news" ? r.data.title : r.data.name}</p>
            </div>
          ))}
        </div>
      )} */}

{results.length > 0 && (
  <div className="search-results">
    {results.map((r, i) => (
      <div
        key={i}
        className="search-item premium"
        onClick={() => {
          navigate(
            r.type === "news"
              ? `/news/${r.data.slug}`
              : `/category/${r.data.slug}`
          );
          setQuery("");
          setResults([]);
        }}
      >
        {/* IMAGE */}
        {r.type === "news" ? (
          <img
            src={getImageUrl(r.data)}
            alt={r.data.title}
            className="search-thumb"
          />
        ) : (
          <div className="cat-thumb">#</div>
        )}

        {/* TEXT */}
        <div className="search-text">
          <span className={`badge ${r.type}`}>
            {r.type === "news" ? "NEWS" : "CATEGORY"}
          </span>
          <p>
            {r.type === "news" ? r.data.title : r.data.name}
          </p>
        </div>
      </div>
    ))}
  </div>
)}




    </div>
  </div>

  {/* PREMIUM DRAWER */}
  {showAllCats && (
    <div className="drawer-overlay" onClick={() => setShowAllCats(false)}>
      <aside
        className="cat-drawer "
        onClick={e => e.stopPropagation()}
      >
        <div className="drawer-head">
          <h4>Explore</h4>
          <button onClick={() => setShowAllCats(false)}>✕</button>
        </div>

        <div className="drawer-list">
          {categories.map(cat => (
            <Link
              key={cat._id}
              to={`/category/${cat.slug}`}
              onClick={() => setShowAllCats(false)}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </aside>
    </div>
  )}
</header>



  );
};

export default Header;
