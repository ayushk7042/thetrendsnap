// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import AdminHeader from "./AdminHeader";
// import "./AdminLayout.css";

// const AdminLayout = () => {
//   return (
//     <div className="admin-wrapper">
//       <Sidebar />
//       <div className="admin-main">
//         <AdminHeader />
//         <div className="admin-content">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-wrapper">
      <Sidebar />

      <div className="admin-main">
        <AdminHeader />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
