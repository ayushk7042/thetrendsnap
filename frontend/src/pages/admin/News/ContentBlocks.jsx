const ContentBlocks = ({ blocks, setBlocks }) => {

  const addBlock = (type) => {
    setBlocks([
      ...blocks,
      { type, value: "", meta: {} }
    ]);
  };

  const update = (i, field, value) => {
    const updated = [...blocks];
    updated[i][field] = value;
    setBlocks(updated);
  };

  const remove = (i) => {
    const updated = blocks.filter((_, idx) => idx !== i);
    setBlocks(updated);
  };

  return (
    <div>
      <h3>Content Blocks</h3>

      {blocks.map((b, i) => (
        <div key={i} className="block">

          <select
            value={b.type}
            onChange={e => update(i, "type", e.target.value)}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="link">Link</option>
            <option value="affiliate">Affiliate</option>
          </select>

          {b.type === "text" && (
            <textarea
              value={b.value}
              onChange={e => update(i, "value", e.target.value)}
            />
          )}

          {b.type === "image" && (
            <>
              <input
                placeholder="Image URL"
                value={b.value}
                onChange={e => update(i, "value", e.target.value)}
              />
              <input
                placeholder="Alt text"
                onChange={e =>
                  update(i, "meta", { alt: e.target.value })
                }
              />
            </>
          )}

          {b.type === "link" && (
            <>
              <input
                placeholder="URL"
                value={b.value}
                onChange={e => update(i, "value", e.target.value)}
              />
              <input
                placeholder="Anchor Text"
                onChange={e =>
                  update(i, "meta", { anchor: e.target.value })
                }
              />
            </>
          )}

          <button onClick={() => remove(i)}>❌</button>
        </div>
      ))}

      <button onClick={() => addBlock("text")}>+ Text</button>
      <button onClick={() => addBlock("image")}>+ Image</button>
      <button onClick={() => addBlock("link")}>+ Link</button>
      <button onClick={() => addBlock("affiliate")}>+ Affiliate</button>
    </div>
  );
};

export default ContentBlocks;
