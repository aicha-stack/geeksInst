
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    order_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES product_orders(order_id),
    name VARCHAR(100),
    price DECIMAL(10,2)
);


INSERT INTO users (name) VALUES ('Alice'), ('Bob');

INSERT INTO product_orders (user_id) VALUES (1), (1), (2);

INSERT INTO items (order_id, name, price) VALUES
(1, 'Item A', 10.50),
(1, 'Item B', 5.25),
(2, 'Item C', 7.00),
(3, 'Item D', 12.00),
(3, 'Item E', 3.50);
