

CREATE DATABASE restaurant_db;
CREATE TABLE Menu_Items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10,2) NOT NULL
);

