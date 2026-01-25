


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createNews,
  updateNews,
  getNewsBySlug,
} from "../../../api/news.api";
import { getCategories } from "../../../api/category.api";
import "./News.css";

const AddEditNews = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    image: "",
    seoTitle: "",
    seoDescription: "",
    status: "draft",
  });

  useEffect(() => {
    // load categories
    getCategories().then((res) => setCategories(res.data));

    // edit mode
    if (slug) {
      getNewsBySlug(slug)
        .then((res) => setForm(res.data))
        .catch((err) => console.error(err));
    }
  }, [slug]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (slug) {
      await updateNews(slug, form);
    } else {
      await createNews(form);
    }

    navigate("/admin/news");
  };

  return (
    <div className="news-form">
      <h2>{slug ? "Edit" : "Add"} News</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="News Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="slug"
          placeholder="Slug (SEO URL)"
          value={form.slug}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option value={c._id} key={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          name="content"
          placeholder="News Content"
          rows="6"
          value={form.content}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <h4>SEO</h4>

        <input
          name="seoTitle"
          placeholder="SEO Title"
          value={form.seoTitle}
          onChange={handleChange}
        />

        <textarea
          name="seoDescription"
          placeholder="SEO Description"
          value={form.seoDescription}
          onChange={handleChange}
        />

        <button type="submit">Save News</button>
      </form>
    </div>
  );
};

export default AddEditNews;
