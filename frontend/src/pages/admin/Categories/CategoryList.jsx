
import { useEffect, useState } from "react";
import {
  getCategories,
  deleteCategory
} from "../../../api/category.api";
import CategoryForm from "./CategoryForm";
import "./category.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Delete category?")) return;
    await deleteCategory(id);
    fetchCategories();
  };

  return (
    <div className="category-page">
      <h2>Categories</h2>

      <CategoryForm
        editing={editing}
        onDone={() => {
          setEditing(null);
          fetchCategories();
        }}
      />

      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Auto Update</th>
            <th>Daily Limit</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>{cat.autoUpdateEnabled ? "ON" : "OFF"}</td>
              <td>{cat.dailyAutoUpdateLimit}</td>
              <td>{cat.status}</td>
              <td>
                <button onClick={() => setEditing(cat)}>Edit</button>
                <button onClick={() => onDelete(cat._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
