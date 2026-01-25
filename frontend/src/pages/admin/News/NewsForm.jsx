



import { useEffect, useState } from "react";
import { createNews, updateNews } from "../../../api/news.api";
import { getCategories } from "../../../api/category.api";
import ContentBlocks from "./ContentBlocks";
import SeoPanel from "./SeoPanel";
import AffiliatePanel from "./AffiliatePanel";
import "./NewsForm.css";

const generateSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");


const NewsForm = ({ editing }) => {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    slug: "",
    description: "",
    category: "",

    contentBlocks: [],

    featuredImage: {
      public_id: "",
      url: ""
    },

    affiliateLinks: [],

    isMainTrending: false,
    isSubTrending: false,
    homeOrder: 0,
    isCategoryTrending: false,
    isCategorySubTrending: false,

    aiGenerated: false,
    createdBy: "admin",
    autoUpdateEnabled: false,

    seoTitle: "",
    seoDescription: "",
    seoKeywords: [],

    status: "published"
  });

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
   
if (editing) {
  setForm({
    ...editing,
    category: editing.category?._id || "",
    featuredImage: editing.featuredImage || { public_id: "", url: "" },
    affiliateLinks: editing.affiliateLinks || [],
    contentBlocks: editing.contentBlocks || []
  });
}



  }, [editing]);

 

const submit = async (e) => {
  e.preventDefault();

  if (!form.category) {
    alert("Category is required");
    return;
  }

  if (!form.contentBlocks.length) {
    alert("Please add at least one content block");
    return;
  }

  const {
    _id,
    createdAt,
    updatedAt,
    __v,
    views,
    ...cleanForm
  } = form;

  const payload = {
    ...cleanForm,
    slug: form.slug || generateSlug(form.title),
  };

  try {
    editing
      ? await updateNews(editing.slug, payload)
      : await createNews(payload);

    alert("✅ News saved successfully");
  } catch (err) {
    console.error(err);
    alert("❌ News save failed (check backend logs)");
  }
};




  return (
    <form onSubmit={submit} className="news-form">

      <h2>{editing ? "Edit News" : "Create News"}</h2>

      {/* BASIC INFO */}
      <div className="form-group">
        <label>Title</label>
        <input
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Subtitle</label>
        <input
          value={form.subtitle}
          onChange={e => setForm({ ...form, subtitle: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Slug</label>
        <input
          value={form.slug}
          onChange={e => setForm({ ...form, slug: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          rows="4"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* CATEGORY */}
      <div className="form-group">
        <label>Category</label>
        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* FEATURED IMAGE */}
      <div className="form-row">
        <div className="form-group">
          <label>Featured Image URL</label>
          {/* <input
            value={form.featuredImage.url}
            onChange={e =>
              setForm({
                ...form,
                featuredImage: { ...form.featuredImage, url: e.target.value }
              })
            }
          /> */}

<input
  value={form.featuredImage?.url || ""}
  onChange={e =>
    setForm({
      ...form,
      featuredImage: {
        ...(form.featuredImage || {}),
        url: e.target.value
      }
    })
  }
/>


        </div>
      </div>

      {/* CONTENT */}
      <ContentBlocks
        blocks={form.contentBlocks}
        setBlocks={blocks => setForm({ ...form, contentBlocks: blocks })}
      />

      {/* AFFILIATE */}
      <AffiliatePanel
        affiliates={form.affiliateLinks}
        setAffiliates={links => setForm({ ...form, affiliateLinks: links })}
      />

      {/* FLAGS */}
      <div className="checkbox-grid">
        <label><input type="checkbox" checked={form.isMainTrending} onChange={e => setForm({ ...form, isMainTrending: e.target.checked })} /> Main Trending</label>
        <label><input type="checkbox" checked={form.isSubTrending} onChange={e => setForm({ ...form, isSubTrending: e.target.checked })} /> Sub Trending</label>
        <label><input type="checkbox" checked={form.isCategoryTrending} onChange={e => setForm({ ...form, isCategoryTrending: e.target.checked })} /> Category Trending</label>
        <label><input type="checkbox" checked={form.isCategorySubTrending} onChange={e => setForm({ ...form, isCategorySubTrending: e.target.checked })} /> Category Sub Trending</label>
        <label><input type="checkbox" checked={form.aiGenerated} onChange={e => setForm({ ...form, aiGenerated: e.target.checked })} /> AI Generated</label>
        <label><input type="checkbox" checked={form.autoUpdateEnabled} onChange={e => setForm({ ...form, autoUpdateEnabled: e.target.checked })} /> Auto Update</label>
      </div>

      {/* SEO */}
      <SeoPanel news={form} />

      {/* STATUS */}
      <div className="form-group">
        <label>Status</label>
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <button className="primary-btn" type="submit">
        {editing ? "Update News" : "Publish News"}
      </button>
    </form>
  );
};

export default NewsForm;
