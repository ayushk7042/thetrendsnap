

import { useEffect, useState } from "react";
import { getHomepage, updateHomepage } from "../../../api/homepage.api";
import { getNews } from "../../../api/news.api";
import CategorySection from "./CategorySection";
import "./Homepage.css";

const HomepageManager = () => {
  const [homepage, setHomepage] = useState({
    mainTrending: "",
    subTrending: [],
    categorySections: []
  });
  const [newsList, setNewsList] = useState([]);



useEffect(() => {
  getHomepage().then(res => {
    if (!res.data) return;

    setHomepage({
      mainTrending: res.data.mainTrending?._id || "",
      subTrending: res.data.subTrending?.map(n => n._id) || [],
      categorySections: res.data.categorySections?.map(sec => ({
        ...sec,
        category: sec.category?._id,
        trending: sec.trending?._id || "",
        subTrending: sec.subTrending?.map(n => n._id) || []
      })) || []
    });
  });



    getNews().then(res => setNewsList(res.data || []));
  }, []);

  const saveHomepage = async () => {
    await updateHomepage(homepage);
    alert("✅ Homepage updated successfully");
  };

  return (
    <div className="homepage-manager">

      <h2>🏠 Homepage Manager</h2>

      {/* MAIN TRENDING */}
      <div className="card">
        <h3>Main Trending News</h3>
        <p className="hint">Hero news shown at top of homepage</p>

        <select
          value={homepage.mainTrending}
          onChange={e =>
            setHomepage({ ...homepage, mainTrending: e.target.value })
          }
        >
          <option value="">Select News</option>
          {newsList.map(n => (
            <option key={n._id} value={n._id}>
              {n.title}
            </option>
          ))}
        </select>
      </div>

      {/* SUB TRENDING */}
      <div className="card">
        <h3>Sub Trending News</h3>
        <p className="hint">Maximum 5 news</p>

       


<div className="news-multi-select">
  {newsList.map(n => {
    const isSelected = homepage.subTrending.includes(n._id);

    return (
      <div
        key={n._id}
        className={`news-chip ${isSelected ? "active" : ""}`}
        onClick={() => {
          let updated = [...homepage.subTrending];

          if (isSelected) {
            updated = updated.filter(id => id !== n._id);
          } else {
            if (updated.length >= 5) return;
            updated.push(n._id);
          }

          setHomepage({ ...homepage, subTrending: updated });
        }}
      >
        <span>{n.title}</span>
        {isSelected && <b>✓</b>}
      </div>
    );
  })}
</div>

<p className="hint">
  Selected: {homepage.subTrending.length} / 5
</p>



      </div>

      {/* CATEGORY SECTIONS */}
      <CategorySection
        sections={homepage.categorySections}
        setSections={sections =>
          setHomepage({ ...homepage, categorySections: sections })
        }
        newsList={newsList}
      />

      <button className="primary-btn" onClick={saveHomepage}>
        💾 Save Homepage
      </button>
    </div>
  );
};

export default HomepageManager;
