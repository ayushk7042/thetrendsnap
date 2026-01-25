import { useState } from "react";
import { createCategory } from "../../../api/category.api";
import CategoryForm from "./CategoryForm";

const AddCategory = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createCategory(data);
    setLoading(false);
    alert("Category created");
  };

  return <CategoryForm data={data} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />;
};

export default AddCategory;
