


import { useEffect, useState } from "react";
import { getCategories } from "../../../api/category.api";
import "./Homepage.css";

const CategorySection = ({ sections, setSections, newsList }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(res => setCategories(res.data || []));
  }, []);

  const addSection = () => {
    setSections([
      ...sections,
      { category: "", trending: "", subTrending: [] }
    ]);
  };

  const update = (index, field, value) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const removeSection = index => {
    setSections(sections.filter((_, i) => i !== index));
  };

  return (
    <div className="card">
      <h3>Category Sections</h3>
      <p className="hint">Homepage category-wise layout</p>

      {sections.map((sec, i) => (
        <div key={i} className="category-card">
          <div className="category-header">
            <strong>Section #{i + 1}</strong>
            <button onClick={() => removeSection(i)}>❌</button>
          </div>

          <label>Category</label>
          <select
            value={sec.category}
            onChange={e => update(i, "category", e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <label>Trending News</label>
          <select
            value={sec.trending}
            onChange={e => update(i, "trending", e.target.value)}
          >
            <option value="">Select Trending News</option>
            {newsList.map(n => (
              <option key={n._id} value={n._id}>
                {n.title}
              </option>
            ))}
          </select>

          

<label>Sub Trending (Max 5)</label>

<div className="news-multi-select">
  {newsList.map(n => {
    const isSelected = sec.subTrending.includes(n._id);

    return (
      <div
        key={n._id}
        className={`news-chip ${isSelected ? "active" : ""}`}
        onClick={() => {
          let updated = [...sec.subTrending];

          if (isSelected) {
            updated = updated.filter(id => id !== n._id);
          } else {
            if (updated.length >= 5) return;
            updated.push(n._id);
          }

          update(i, "subTrending", updated);
        }}
      >
        <span>{n.title}</span>
        {isSelected && <b>✓</b>}
      </div>
    );
  })}
</div>

<p className="hint">
  Selected: {sec.subTrending.length} / 5
</p>




        </div>
      ))}

      <button className="secondary-btn" onClick={addSection}>
        ➕ Add Category Section
      </button>
    </div>
  );
};

export default CategorySection;
