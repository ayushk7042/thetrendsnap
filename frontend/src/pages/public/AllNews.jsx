


import { useEffect, useState } from "react";
import axios from "../../api/axios";
import NewsCard from "../../components/public/NewsCard";
import BigNewsCard from "../../components/public/BigNewsCard";
import Footer from "../../components/public/Footer";
import Header from "../../components/public/Header";

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data } = await axios.get("/news");

    // 🔥 FEATURED = MOST VIEWED
    const sorted = [...data].sort(
      (a, b) => (b.views || 0) - (a.views || 0)
    );

    setFeatured(sorted[0]);
    setNews(sorted.slice(1));
  };

  return (

 <>
      <Header />

    <div className="all-news-page">

      {/* 🔥 TRENDING HERO */}
      {featured && (
        <section className="news-hero">
          <BigNewsCard news={{ ...featured, isTrending: true }} />
        </section>
      )}

      {/* 📰 ALL NEWS */}
      <section className="news-grid-section">
        <h2>Latest Updates</h2>
        <div className="news-grid">
          {news.map(item => (
            <NewsCard key={item._id} news={item} />
          ))}
        </div>
      </section>

    </div>
     <Footer/>
     </>
  );
};

export default AllNews;

