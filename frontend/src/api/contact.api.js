// import axios from "./axios";

// export const sendContact = (data) =>
//   axios.post("/contact", data);

// export const fetchContacts = () =>
//   axios.get("/contact");

// export const replyContact = (id, message) =>
//   axios.put(`/contact/reply/${id}`, { message });

// export const deleteContact = (id) =>
//   axios.delete(`/contact/${id}`);


import axios from "./axios";

export const getContacts = () =>
  axios.get("/contact");

export const replyContact = (id, data) =>
  axios.put(`/contact/reply/${id}`, data);

export const deleteContact = (id) =>
  axios.delete(`/contact/${id}`);

export const createContact = (data) =>
  axios.post("/contact", data);
