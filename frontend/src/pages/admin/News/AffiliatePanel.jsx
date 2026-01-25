const AffiliatePanel = ({ affiliates, setAffiliates }) => {

  const add = () => {
    setAffiliates([
      ...affiliates,
      {
        title: "",
        link: "",
        buttonText: "",
        productImage: "",
        price: ""
      }
    ]);
  };

  const update = (i, field, value) => {
    const updated = [...affiliates];
    updated[i][field] = value;
    setAffiliates(updated);
  };

  return (
    <div>
      <h3>Affiliate Links</h3>

      {affiliates.map((a, i) => (
        <div key={i}>
          <input placeholder="Title" value={a.title}
            onChange={e => update(i, "title", e.target.value)} />

          <input placeholder="Link" value={a.link}
            onChange={e => update(i, "link", e.target.value)} />

          <input placeholder="Button Text" value={a.buttonText}
            onChange={e => update(i, "buttonText", e.target.value)} />

          <input placeholder="Image" value={a.productImage}
            onChange={e => update(i, "productImage", e.target.value)} />

          <input placeholder="Price" value={a.price}
            onChange={e => update(i, "price", e.target.value)} />

          {a.isAutoInjected && <span>🤖 Auto</span>}
        </div>
      ))}

      <button onClick={add}>+ Add Affiliate</button>
    </div>
  );
};

export default AffiliatePanel;
