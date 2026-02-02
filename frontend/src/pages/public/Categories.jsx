import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../api/category.api";
import { getNews } from "../../api/news.api";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "./Categories.css";

const getImageUrl = (news) => {
  if (!news?.featuredImage?.url) return "/no-image.jpg";
  if (news.featuredImage.url.startsWith("http")) return news.featuredImage.url;
  return `${import.meta.env.VITE_API_URL}${news.featuredImage.url}`;
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newsByCategory, setNewsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [catRes, newsRes] = await Promise.all([
          getCategories(),
          getNews()
        ]);

        const cats = catRes?.data || [];
        setCategories(cats);

        // Group news by category
        const grouped = {};
        cats.forEach(cat => {
          grouped[cat._id] = newsRes?.data?.filter(n => n.category?._id === cat._id).slice(0, 3) || [];
        });
        setNewsByCategory(grouped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return (
    <div className="loader-container">
      <p>Loading Categories…</p>
    </div>
  );

  return (
    <>
      <Header />

      <div className="categories-wrapper">
        <section className="categories-hero reveal">
          <h1>Explore All Categories</h1>
          <p>Browse news across {categories.length} diverse topics</p>
        </section>

        <section className="categories-grid reveal">
          {categories.map((cat) => (
            <Link key={cat._id} to={`/category/${cat.slug}`} className="category-card">
              <div className="cat-header">
                <h2>{cat.name}</h2>
                <span className="cat-count">{newsByCategory[cat._id]?.length || 0}</span>
              </div>

              {cat.description && (
                <p className="cat-description">{cat.description}</p>
              )}

              <div className="cat-preview">
                {newsByCategory[cat._id]?.map((news) => (
                  <div key={news._id} className="cat-preview-item">
                    <img src={getImageUrl(news)} alt={news.title} />
                    <div className="preview-title">{news.title}</div>
                  </div>
                ))}
              </div>

              <div className="cat-footer">
                <span className="view-all">View All →</span>
              </div>
            </Link>
          ))}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Categories;
