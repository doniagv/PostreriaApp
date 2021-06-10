import axios from "axios";

export default axios.create({
  baseURL:
    "http://localhost:3006/api/delete" || "http://localhost:3001/api/delete",
});
