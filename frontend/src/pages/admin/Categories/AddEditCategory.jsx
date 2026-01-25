import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createCategory,
  updateCategory,
  getCategories,
} from "../../../api/category.api";
import "./Category.css";

const AddEditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    showOnHome: true,
  });

  useEffect(() => {
    if (id) {
      getCategories().then((res) => {
        const cat = res.data.find((c) => c._id === id);
        if (cat) setForm(cat);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    id ? await updateCategory(id, form) : await createCategory(form);
    navigate("/admin/categories");
  };

  return (
    <div className="category-form">
      <h2>{id ? "Edit" : "Add"} Category</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Category Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            name="showOnHome"
            checked={form.showOnHome}
            onChange={handleChange}
          />
          Show on Homepage
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddEditCategory;
