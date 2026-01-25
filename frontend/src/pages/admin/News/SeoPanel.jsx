const SeoPanel = ({ news }) => {
  return (
    <div className="seo-panel">
      <h3>SEO</h3>

      <input placeholder="SEO Title" value={news.seoTitle || ""} readOnly />
      <textarea placeholder="SEO Description" value={news.seoDescription || ""} readOnly />

      <p>SEO Score: {news.seoScore}%</p>

      {news.seoSuggestions?.map((s, i) => (
        <p key={i}>⚠ {s.suggestion}</p>
      ))}
    </div>
  );
};

export default SeoPanel;
