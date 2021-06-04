require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Get all products with category name

app.get("/api/products", async (req, res) => {
  try {
    const results = await db.query(
      "select * from product join category on category.category_id = product.category_id"
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        products: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get a product

app.get("/api/products/:id", async (req, res) => {
  console.log(req.params);
  try {
    const results = await db.query(
      "select * from product where product_id = $1",
      [req.params.id]
    );
    res.status(200).json({
      status: "Success",
      data: results.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a product

app.post("/api/products", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "with inserted_product as (INSERT INTO product (product_name, price, category_id, stock) values ($1, $2, $3, $4) returning *) select * from inserted_product join category on inserted_product.category_id = category.category_id",
      [
        req.body.product_name,
        req.body.price,
        req.body.category_id,
        req.body.stock,
      ]
    );

    res.status(201).json({
      status: "Success",
      data: {
        product: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update products

app.put("/api/products/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE product SET product_name = $1, price = $2, category_id = $3, stock = $4 WHERE product_id = $5 returning *",
      [
        req.body.product_name,
        req.body.price,
        req.body.categoryid,
        req.body.stock,
        req.params.id,
      ]
    );
    res.status(200).json({
      status: "Success",
      data: {
        product: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete Product

app.delete("/api/products/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM product where product_id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err);
  }
});

// Get categories

app.get("/api/categories", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM category");
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        categories: results.rows,
      },
    });
  } catch (error) {}
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
