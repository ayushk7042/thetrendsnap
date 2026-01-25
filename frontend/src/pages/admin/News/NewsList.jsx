
import { useEffect, useState } from "react";
import { getNews, deleteNews } from "../../../api/news.api";
import { Link } from "react-router-dom";

const NewsList = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    const res = await getNews();
    setNews(res.data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete news?")) return;
    await deleteNews(id);
    fetchNews();
  };

  return (
    <div className="news-page">
      <h2>News</h2>
      <Link to="/admin/news/add" className="btn">
        + Add News
      </Link>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>SEO</th>
            <th>AI</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {news.map(n => (
            <tr key={n._id}>
              <td>{n.title}</td>
              <td>{n.category?.name}</td>
              <td>{n.seoScore}%</td>
              <td>{n.aiGenerated ? "🤖" : "Admin"}</td>
              <td>{n.status}</td>
              <td>
                {/* <Link to={`/admin/news/edit/${n._id}`}>Edit</Link> */}
                 <Link to={`/admin/news/edit/${n.slug}`}>Edit</Link>
                <button onClick={() => remove(n._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsList;
