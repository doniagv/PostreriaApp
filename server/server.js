require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
//middleware
app.use(cors());
app.use(express.json());

app.get("/getProducts", (req, res) => {
  console.log("get all products");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
