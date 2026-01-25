// import "./AdminHeader.css";

// const AdminHeader = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/admin/login";
//   };

//   return (
//     <header className="admin-header">
//       <span>Welcome, {admin?.name}</span>
//       <button onClick={logout}>Logout</button>
//     </header>
//   );
// };

// export default AdminHeader;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHeader.css";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="admin-header">
      <div className="admin-left">
        <h3>Admin Panel</h3>
      </div>

      <div className="admin-right">
        <span className="admin-name">
          {admin?.name || "Admin"}
        </span>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
