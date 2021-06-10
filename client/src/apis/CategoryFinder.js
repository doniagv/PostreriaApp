import axios from "axios";

export default axios.create({
  baseURL:
    "http://localhost:3006/api/categories" ||
    "http://localhost:3001/api/categories",
});
