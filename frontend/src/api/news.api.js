// import axios from "./axios";

// export const fetchNews = () =>
//   axios.get("/news");

// export const fetchNewsBySlug = (slug) =>
//   axios.get(`/news/${slug}`);

// export const createNews = (data) =>
//   axios.post("/news", data);

// export const updateNews = (id, data) =>
//   axios.put(`/news/${id}`, data);

// export const deleteNews = (id) =>
//   axios.delete(`/news/${id}`);

import api from "./axios";

/* ================= GET ALL NEWS ================= */
export const getNews = () => {
  return api.get("/news");
};



/* ================= GET SINGLE NEWS ================= */
// export const getNewsById = (id) => {
//   return api.get(`/news/${id}`);
// };

export const getNewsBySlug = (slug) =>
  api.get(`/news/${slug}`);

export const fetchNewsBySlug = (slug) => {
  return api.get(`/news/${slug}`);
};


/* ================= CREATE NEWS ================= */
export const createNews = (data) => {
  return api.post("/news", data);
};

/* ================= UPDATE NEWS ================= */
// export const updateNews = (id, data) => {
//   return api.put(`/news/${id}`, data);
// };

export const updateNews = (slug, data) => {
  return api.put(`/news/${slug}`, data);
};

/* ================= DELETE NEWS ================= */
export const deleteNews = (id) => {
  return api.delete(`/news/${id}`);
};
