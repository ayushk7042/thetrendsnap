// import { useEffect, useState } from "react";
// import { getDashboardData } from "../../../api/dashboard.api";
// import { Link } from "react-router-dom";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     getDashboardData().then(setData);
//   }, []);

//   if (!data) return <p>Loading dashboard...</p>;

//   return (
//     <div className="dashboard">
//       <h1>Admin Dashboard</h1>

//       <div className="stats-grid">
//         <Stat title="Categories" value={data.categories} />
//         <Stat title="Total News" value={data.totalNews} />
//         <Stat title="Published News" value={data.publishedNews} />
//         <Stat title="Draft News" value={data.draftNews} />
//         <Stat title="AI Generated" value={data.aiNews} />
//         <Stat title="Auto Update ON" value={data.autoUpdateNews} />
//         <Stat title="Avg SEO Score" value={data.avgSeoScore + "%"} />
//         <Stat title="New Contacts" value={data.newContacts} />
//       </div>

//       <div className="quick-actions">
//         <h3>Quick Actions</h3>
//         <Link to="/admin/news/add">➕ Add News</Link>
//         <Link to="/admin/categories/add">➕ Add Category</Link>
//         <Link to="/admin/homepage">🏠 Homepage Manager</Link>
//         <Link to="/admin/contact">📩 Contact Messages</Link>
//       </div>
//     </div>
//   );
// };

// const Stat = ({ title, value }) => (
//   <div className="stat-card">
//     <h4>{title}</h4>
//     <p>{value}</p>
//   </div>
// );

// export default Dashboard;

import { useEffect, useState } from "react";
import { getDashboardData } from "../../../api/dashboard.api";
import "./dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();
      setData(res.data);
    } catch (err) {
      console.error("Dashboard error", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-grid">
        <Stat title="Categories" value={data?.categories} />
        <Stat title="Total News" value={data?.totalNews} />
        <Stat title="Published News" value={data?.publishedNews} />
        <Stat title="Draft News" value={data?.draftNews} />
        <Stat title="AI Generated News" value={data?.aiNews} />
        <Stat title="Auto Update ON" value={data?.autoUpdateNews} />
        <Stat title="Avg SEO Score" value={`${data?.avgSeoScore}%`} />
        <Stat title="New Contacts" value={data?.newContacts} />
      </div>
    </div>
  );
};

const Stat = ({ title, value }) => {
  return (
    <div className="dashboard-card">
      <h4>{title}</h4>
      <p>{value ?? 0}</p>
    </div>
  );
};

export default Dashboard;
