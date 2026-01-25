import axios from "./axios";

export const loginAdmin = (payload) =>
  axios.post("/auth/login", payload);

export const registerAdmin = (payload) =>
  axios.post("/auth/register", payload);
