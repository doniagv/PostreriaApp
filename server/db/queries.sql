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
INSERT INTO product_ingredient_list (ingredient_id, product_id, quantity, measurement_type) 
VALUES 
(3,7,'1', 'cup'),
(2,7,'1', 'cup'),
(4,7,'1', 'cup'),
(5,7,'2', 'spoon'),
(6,7,'2', 'unit'),
(7,7,'3', 'cup'),
(8,7,'1', 'spoon'),
(9,7, '1/2', 'spoon'),
(10,7,'1', 'spoon'),
(11,7,'2', 'cup');



-- Select product and all the ingredients query

SELECT * 
FROM product
JOIN product_ingredient_list ON product.product_id = product_ingredient_list.product_id 
JOIN ingredient ON product_ingredient_list.ingredient_id = ingredient.ingredient_id;

SELECT product.product_name AS "Product", category.category_name AS Category, product.price AS "Price per unit", product.stock, ingredient.ingredient_name AS "Ingredient", product_ingredient_list.quantity, product_ingredient_list.measurement_type
FROM product
JOIN category ON product.category_id = category.category_id
JOIN product_ingredient_list ON product.product_id = product_ingredient_list.product_id 
JOIN ingredient ON product_ingredient_list.ingredient_id = ingredient.ingredient_id
WHERE product.product_id = 7;

"SELECT ingredient.ingredient_name, product_ingredient_list.quantity, ingredient.type FROM product JOIN category ON product.category_id = category.category_id JOIN product_ingredient_list ON product.product_id = product_ingredient_list.product_id  JOIN ingredient ON product_ingredient_list.ingredient_id = ingredient.ingredient_id WHERE product.product_id = 1"


-- Select products with category id

SELECT *
FROM product
JOIN category ON product.category_id = category.category_id
WHERE product.category_id = 4;



INSERT INTO product (product_name, price, category_id, stock) VALUES ('Cake', 299, 5, 2);
INSERT INTO product (product_name, price, category_id, stock) VALUES ('Prueba Pie', 13029, 4, 10);

INSERT INTO order_product (order_id, product_id, quantity) VALUES (1,1,1);

SELECT *
FROM orders
JOIN customer ON customer.customer_id = orders.customer_id
JOIN order_product ON orders.order_id = order_product.order_id
JOIN product ON product.product_id = order_product.product_id;

-- Categories id and names

-- 1	"Bread"
-- 2	"Rolls"
-- 3	"Cookies"
-- 4	"Pies"
-- 5	"Pastries"
-- 6	"Muffins"




-- Update product

UPDATE product SET product_name = "", price = , category_id = , stock = WHERE product_id = 5;

-- Insert product and return all data from product and the category_name with a join

"with inserted_product as (INSERT INTO product (product_name, price, category_id, stock) values ($1, $2, $3, $4) returning *) select product.product_id AS key, product.product_name, 
product.price, product.stock, category.category_name from inserted_product join category on inserted_product.category_id = category.category_id"


"with inserted_product as (INSERT INTO product (product_name, price, category_id, stock) values ($1, $2, $3, $4) returning *) select * from inserted_product join category on inserted_product.category_id = category.category_id"


"INSERT INTO product (product_name, price, category_id, stock) values ($1, $2, $3, $4) returning *",




-- Triggers

-- Add ingredient price in expense

-- CREATE TRIGGER expense_trigger AFTER INSERT ON expense_ingredient
-- FOR EACH ROW EXECUTE PROCEDURE addexpensefunc();

-- CREATE OR REPLACE FUNCTION addexpensefunc() RETURNS TRIGGER AS $example_table$
--    BEGIN
--       INSERT INTO expense(expense_id, expense_total, expense_date) VALUES (new.expense_id, new.quantity, current_timestamp);
--       RETURN NEW;
--    END;
-- $example_table$ LANGUAGE plpgsql;

