import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: "https://nc-news-backend-fgh9.onrender.com",
});

axios
  .get("https://nc-news-backend-fgh9.onrender.com")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

  export default ncNewsAPI;