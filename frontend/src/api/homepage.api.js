// import axios from "./axios";

// export const fetchHomepage = () =>
//   axios.get("/homepage");

// export const updateHomepage = (data) =>
//   axios.put("/homepage", data);
import axios from "./axios";

export const getHomepage = () =>
  axios.get("/homepage");

export const updateHomepage = (data) =>
  axios.put("/homepage", data);
