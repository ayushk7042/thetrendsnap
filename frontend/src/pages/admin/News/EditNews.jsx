// import { useEffect, useState } from "react";
// import { getNews, updateNews } from "../../../api/news.api";
// import { getCategories } from "../../../api/category.api";
// import { useParams } from "react-router-dom";
// import NewsForm from "./NewsForm";

// const EditNews = () => {
//   const { id } = useParams();
//   const [data, setData] = useState(null);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     getCategories().then(res => setCategories(res.data));
//     getNews().then(res => {
//       setData(res.data.find(n => n._id === id));
//     });
//   }, [id]);

//   const handleChange = (e) =>
//     setData({ ...data, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await updateNews(id, data);
//     alert("News updated");
//   };

//   if (!data) return <p>Loading...</p>;

//   return <NewsForm data={data} categories={categories} onChange={handleChange} onSubmit={handleSubmit} />;
// };

// export default EditNews;



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsBySlug } from "../../../api/news.api";
import NewsForm from "./NewsForm";

const EditNews = () => {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewsBySlug(slug)
      .then(res => {
        setNews(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!news) return <p>News not found</p>;

  return <NewsForm editing={news} />;
};

export default EditNews;
