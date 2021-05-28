require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

// Get all products

app.get("/api/products", (req, res) => {
  db.query("select * from");
  res.status(200).json({
    status: "success",
    data: {
      products: [
        {
          name: "Cake",
          category_id: 3,
          price: 299,
          stock: 3,
        },
        {
          name: "Cheesecake",
          category_id: 3,
          price: 399,
          stock: 1,
        },
      ],
    },
  });
});

// Get a product

app.get("/api/products/:id", (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: "Success",
    data: {
      name: "Cake",
      category_id: 3,
      price: 299,
      stock: 3,
    },
  });
});

// Create a product

app.post("/api/products", (req, res) => {
  console.log(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      name: "Cake",
      category_id: 2,
      price: 299,
      stock: 3,
    },
  });
});

// Update products

app.put("/api/products/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.status(200).json({
    status: "Success",
    data: {
      name: "Cake",
      price: 299,
      stock: 3,
    },
  });
});

// Delete Product

// app.delete("/api/products/:id", (req, res) => {
//   res.status(204).json({
//     status: "Success",
//   });
// });

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
