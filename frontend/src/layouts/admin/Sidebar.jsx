// import "./Sidebar.css";

// const Sidebar = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));

//   return (
//     <aside className="sidebar">
//       <h3>News CMS</h3>

//       <nav>
//         <a href="/admin">Dashboard</a>

//         {admin?.permissions?.canPublish && (
//           <>
//             <a href="/admin/categories">Categories</a>
//             <a href="/admin/news">News</a>
//             <a href="/admin/homepage">Homepage</a>
//           </>
//         )}

//         <a href="/admin/contacts">Contacts</a>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;


import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>News CMS</h3>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/admin" className="nav-link">
          Dashboard
        </NavLink>

        {admin?.permissions?.canPublish && (
          <>
            <NavLink to="/admin/categories" className="nav-link">
              Categories
            </NavLink>

            <NavLink to="/admin/news" className="nav-link">
              News
            </NavLink>

            <NavLink to="/admin/homepage" className="nav-link">
              Homepage
            </NavLink>
          </>
        )}

        <NavLink to="/admin/contacts" className="nav-link">
          Contacts
        </NavLink>

        <NavLink to="/admin/autonews" className="nav-link">
          AI News Manager
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
