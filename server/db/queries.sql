-- expense_ingredient table

-- Insert into expense_ingredient table query

INSERT INTO expense_ingredient (ingredient_id, expense_id, quantity) VALUES (1,1,300);

-- Get expense and ingredient info

SELECT expense.description AS "Expense Description", expense.expense_total AS Total, expense.expense_date AS "Date of Expense", ingredient.ingredient_name AS Ingredient, ingredient.price, expense_ingredient.quantity, ingredient.type
FROM expense
JOIN expense_ingredient ON expense.expense_id = expense_ingredient.expense_id
JOIN ingredient ON expense_ingredient.ingredient_id = ingredient.ingredient_id;



-- Product_ingredient_list table

-- Insert into product_ingredient_list table query

INSERT INTO product_ingredient_list (ingredient_id, product_id, quantity) VALUES (1,1,500);

-- Select product and all the ingredients query

SELECT * 
FROM product
JOIN product_ingredient_list ON product.product_id = product_ingredient_list.product_id 
JOIN ingredient ON product_ingredient_list.ingredient_id = ingredient.ingredient_id;

SELECT product.product_name AS "Product", category.category_name AS Category, product.price AS "Price per unit", product.stock, ingredient.ingredient_name AS "Ingredient", product_ingredient_list.quantity, ingredient.type
FROM product
JOIN category ON product.category_id = category.category_id
JOIN product_ingredient_list ON product.product_id = product_ingredient_list.product_id 
JOIN ingredient ON product_ingredient_list.ingredient_id = ingredient.ingredient_id
WHERE product.product_id = 1;

-- Select products with category id

SELECT *
FROM product
JOIN category ON product.category_id = category.category_id
WHERE product.category_id = 4;