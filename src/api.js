import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: "https://nc-news-backend-fgh9.onrender.com",
});

export default ncNewsAPI;