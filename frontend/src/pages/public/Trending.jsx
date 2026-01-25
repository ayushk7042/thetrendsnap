


import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./Trending.css";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";


const getImageUrl = (featuredImage) => {
  if (!featuredImage) return "/placeholder-news.jpg";

  if (typeof featuredImage === "object" && featuredImage.url) return featuredImage.url;
  if (typeof featuredImage === "object" && featuredImage.path) return featuredImage.path;
  if (typeof featuredImage === "string") {
    if (featuredImage.startsWith("http")) return featuredImage;
    return `http://localhost:5000/uploads/${featuredImage}`;
  }
  return "/placeholder-news.jpg";
};

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [subTrending, setSubTrending] = useState([]);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const { data } = await axios.get("/news");

      const mainTrending = [...data]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);

      const sub = [...data]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(5, 11);

      setTrending(mainTrending);
      setSubTrending(sub);

    } catch (err) {
      console.error("Trending fetch error:", err);
    }
  };

  const RowNewsItem = ({ news }) => {
    const imageUrl = getImageUrl(news.featuredImage);

    return (


      <div className="row-news-item">
        <img src={imageUrl} alt={news.title} />
        <div className="row-news-content">
          <h3>{news.title}</h3>
          {news.seoDescription && <p>{news.seoDescription.slice(0, 80)}...</p>}
        </div>
      </div>
    );
  };

  return (

 <>
      <Header />
    
    <div className="trending-page">

      {/* 🔥 MAIN TRENDING */}
      <section>
        <h2>🔥 Trending Now</h2>
        <div className="row-news-list">
          {trending.map(item => <RowNewsItem key={item._id} news={item} />)}
        </div>
      </section>

      {/* ⚡ SUB TRENDING */}
      <section>
        <h2>⚡ Sub Trending</h2>
        <div className="row-news-list">
          {subTrending.map(item => <RowNewsItem key={item._id} news={item} />)}
        </div>
      </section>

    </div>
     <Footer/>
     </>
  );
};

export default Trending;
