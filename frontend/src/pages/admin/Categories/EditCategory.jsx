import { useEffect, useState } from "react";
import { getCategories, updateCategory } from "../../../api/category.api";
import { useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";

const EditCategory = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((res) => {
      const cat = res.data.find((c) => c._id === id);
      setData(cat);
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCategory(id, data);
    alert("Category updated");
  };

  if (loading) return <p>Loading...</p>;

  return <CategoryForm data={data} onChange={handleChange} onSubmit={handleSubmit} />;
};

export default EditCategory;
