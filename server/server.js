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

// Add ingredient to product

app.post("/api/add", async (req, res) => {
  try {
    const results = await db.query(
      "with inserted_ingredient as (INSERT INTO product_ingredient_list (ingredient_id, product_id, measurement_type, quantity) values ($1, $2, $3, $4) returning *) select * from inserted_ingredient join ingredient on inserted_ingredient.ingredient_id = ingredient.ingredient_id",
      [
        req.body.ingredient_id,
        req.body.product_id,
        req.body.measurement_type,
        req.body.quantity,
      ]
    );
    res.status(200).json({
      status: "success",
      data: {
        ingredient: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete ingredient from product

app.delete("/api/delete", async (req, res) => {
  try {
    const results = db.query(
      "DELETE FROM product_ingredient_list where product_id = $1 AND ingredient_id = $2",
      [req.body.product_id, req.body.ingredient_id]
    );
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

// API for ingredients

app.get("/api/products/ingredientlist/:id", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT ingredient.ingredient_id, ingredient.ingredient_name, product_ingredient_list.quantity, product_ingredient_list.measurement_type FROM product JOIN category ON product.category_id = category.category_id JOIN product_ingredient_list ON product.product_id = product_ingredient_list.product_id  JOIN ingredient ON product_ingredient_list.ingredient_id = ingredient.ingredient_id WHERE product.product_id = $1",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        ingredients: results.rows,
      },
    });
  } catch (error) {}
});

app.get("/api/ingredients", async (req, res) => {
  try {
    const results = await db.query("select * from ingredient");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        ingredients: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/ingredients/:id", async (req, res) => {
  try {
    const results = db.query(
      "DELETE FROM ingredient where ingredient_id = $1",
      [req.params.id]
    );
    res.status(204).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/ingredients", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO ingredient (ingredient_name, price, stock, type) values ($1, $2, $3, $4) returning *",
      [req.body.ingredient_name, req.body.price, req.body.stock, req.body.type]
    );

    res.status(201).json({
      status: "Success",
      data: {
        ingredient: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
