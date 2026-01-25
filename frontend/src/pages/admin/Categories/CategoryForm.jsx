

import { useEffect, useState } from "react";
import {
  createCategory,
  updateCategory
} from "../../../api/category.api";
import "./category.css";


const emptyForm = {
  name: "",
  description: "",
  icon: "",
  seoTitle: "",
  seoDescription: "",
  showOnHome: true,
  maxSubTrending: 5,
  order: 0,
  status: "active",
  autoUpdateEnabled: false,
  dailyAutoUpdateLimit: 10
};

const CategoryForm = ({ editing, onDone }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
   // if (editing) setForm(editing);
if (editing) {
  const {
    _id,
    slug,
    createdAt,
    updatedAt,
    __v,
    ...cleanCategory
  } = editing;

  setForm(cleanCategory);
}



    else setForm(emptyForm);
  }, [editing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (editing) {
      await updateCategory(editing._id, form);
    } else {
      await createCategory(form);
    }

    onDone();
    setForm(emptyForm);
  };

  return (
    <form className="category-form" onSubmit={submit}>
      <h3>{editing ? "Edit Category" : "Add Category"}</h3>

      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />

      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

      <input name="icon" placeholder="Icon / Image URL" value={form.icon} onChange={handleChange} />

      <input name="seoTitle" placeholder="SEO Title" value={form.seoTitle} onChange={handleChange} />

      <textarea name="seoDescription" placeholder="SEO Description" value={form.seoDescription} onChange={handleChange} />

      <label>
        <input type="checkbox" name="showOnHome" checked={form.showOnHome} onChange={handleChange} />
        Show on Home
      </label>

      <label>
        Max Sub Trending
        <input type="number" name="maxSubTrending" value={form.maxSubTrending} onChange={handleChange} />
      </label>

      <label>
        Order
        <input type="number" name="order" value={form.order} onChange={handleChange} />
      </label>

      <label>
        <input type="checkbox" name="autoUpdateEnabled" checked={form.autoUpdateEnabled} onChange={handleChange} />
        Enable Daily Auto Update 🤖
      </label>

      {form.autoUpdateEnabled && (
        <label>
          Daily Auto Update Limit
          <input
            type="number"
            name="dailyAutoUpdateLimit"
            value={form.dailyAutoUpdateLimit}
            onChange={handleChange}
          />
        </label>
      )}

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button type="submit">
        {editing ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default CategoryForm;
