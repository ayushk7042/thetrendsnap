import { useEffect, useState } from "react";
import { createNews } from "../../../api/news.api";
import { getCategories } from "../../../api/category.api";
import NewsForm from "./NewsForm";

const AddNews = () => {
  //const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createNews(data);
    setLoading(false);
    alert("News created");
  };

 // return <NewsForm data={data} categories={categories} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />;
  return <NewsForm />;
};

export default AddNews;
