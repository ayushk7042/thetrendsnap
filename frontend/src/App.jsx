// import { Routes, Route } from "react-router-dom";

// /* ===== ADMIN ===== */
// import AdminLogin from "./pages/admin/Login/AdminLogin";
// import AdminLayout from "./layouts/admin/AdminLayout";
// import Dashboard from "./pages/admin/Dashboard/Dashboard";
// import CategoryList from "./pages/admin/Categories/CategoryList";
// import AddEditCategory from "./pages/admin/Categories/AddEditCategory";
// import NewsList from "./pages/admin/News/NewsList";
// import AddEditNews from "./pages/admin/News/AddEditNews";
// import HomepageManager from "./pages/admin/Homepage/HomepageManager";
// import ContactList from "./pages/admin/Contacts/ContactList";
// import ProtectedRoute from "./app/ProtectedRoute";

// /* ===== PUBLIC ===== */
// import Home from "./pages/public/Home";
// import NewsDetail from "./pages/public/NewsDetail";
// import CategoryNews from "./pages/public/CategoryNews";
// import Contact from "./pages/Contact";

// const App = () => {
//   return (
//     <Routes>
//       {/* ================= PUBLIC ROUTES ================= */}
//       <Route path="/" element={<Home />} />
//       <Route path="/news/:slug" element={<NewsDetail />} />
//       <Route path="/category/:slug" element={<CategoryNews />} />
//       <Route path="/contact" element={<Contact />} />

//       {/* ================= ADMIN AUTH ================= */}
//       <Route path="/admin/login" element={<AdminLogin />} />

//       {/* ================= ADMIN PANEL ================= */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Dashboard />} />

//         {/* Categories */}
//         <Route path="categories" element={<CategoryList />} />
//         <Route path="categories/add" element={<AddEditCategory />} />
//         <Route path="categories/edit/:id" element={<AddEditCategory />} />

//         {/* News */}
//         <Route path="news" element={<NewsList />} />
//         <Route path="news/add" element={<AddEditNews />} />
//         <Route path="news/edit/:id" element={<AddEditNews />} />

//         {/* Homepage */}
//         <Route path="homepage" element={<HomepageManager />} />

//         {/* Contacts */}
//         <Route path="contacts" element={<ContactList />} />
//       </Route>
//     </Routes>
//   );
// };

// export default App;





import { Routes, Route } from "react-router-dom";

/* ================= ADMIN ================= */
import AdminLogin from "./pages/admin/Login/AdminLogin";
import AdminLayout from "./layouts/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard/Dashboard";

import CategoryList from "./pages/admin/Categories/CategoryList";
import AddEditCategory from "./pages/admin/Categories/AddEditCategory";

import NewsList from "./pages/admin/News/NewsList";
import AddEditNews from "./pages/admin/News/AddEditNews";

import HomepageManager from "./pages/admin/Homepage/HomepageManager";
import ContactList from "./pages/admin/Contacts/ContactList";

import ProtectedRoute from "./app/ProtectedRoute";

/* ================= PUBLIC ================= */
import Home from "./pages/public/Home";
import NewsDetail from "./pages/public/NewsDetail";
import CategoryNews from "./pages/public/CategoryNews";
import Contact from "./pages/public/Contact";
import AutoNewsManager from "./pages/admin/News/AutoNewsManager";
import AddNews from "./pages/admin/News/AddNews";
import EditNews from "./pages/admin/News/EditNews";
import AddCategory from "./pages/admin/Categories/AddCategory";
import EditCategory from "./pages/admin/Categories/EditCategory";
import Footer from "./components/public/Footer";
import AllNews from "./pages/public/AllNews";
import Trending from "./pages/public/Trending";
import About from "./pages/public/About";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";


const App = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/news/:slug" element={<NewsDetail />} />
      <Route path="/category/:slug" element={<CategoryNews />} />
      <Route path="/contact" element={<Contact />} />

 {/* ================= NEW PAGES ================= */}
      <Route path="/about" element={<About />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

<Route path="/news" element={<AllNews />} />
<Route path="/trending" element={<Trending />} />


      {/* ================= ADMIN AUTH ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ================= ADMIN PANEL (PROTECTED) ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* ===== Categories ===== */}
        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/add" element={<AddCategory />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />

        {/* ===== News ===== */}
        <Route path="news" element={<NewsList />} />
        <Route path="news/add" element={<AddNews />} />
        {/* <Route path="news/edit/:id" element={<AddNews />} /> */}

<Route path="/admin/news/edit/:slug" element={<EditNews />} />
        {/* ===== Homepage ===== */}
        <Route path="homepage" element={<HomepageManager />} />

        <Route path="autonews" element={<AutoNewsManager />} />

        {/* ===== Contacts ===== */}
        <Route path="contacts" element={<ContactList />} />
      </Route>
    </Routes>
     
  );
};

export default App;
