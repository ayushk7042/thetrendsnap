// // import { createContext, useContext, useState } from "react";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [token, setToken] = useState(localStorage.getItem("token"));

// //   const login = (token) => {
// //     localStorage.setItem("token", token);
// //     setToken(token);
// //   };

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     setToken(null);
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         isAuthenticated: !!token,
// //         login,
// //         logout,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);


// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("admin");

//     if (savedToken && savedUser) {
//       setToken(savedToken);
//       setUser(JSON.parse(savedUser));
//     }

//     setLoading(false);
//   }, []);

//   const login = (token, admin) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("admin", JSON.stringify(admin));
//     setToken(token);
//     setUser(admin);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("admin");
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         isAuthenticated: !!token,
//         login,
//         logout,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };


import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("admin");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = (token, admin) => {
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(admin));
    setToken(token);
    setUser(admin);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken(null);
    setUser(null);
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { user, token, isAuthenticated: !!token, login, logout, loading } },
    children
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
