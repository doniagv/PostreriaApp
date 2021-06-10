import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3006/api/add" || "http://localhost:3001/api/add",
});
