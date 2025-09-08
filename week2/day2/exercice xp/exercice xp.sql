--- exercice1
SELECT * 
FROM items
ORDER BY price ASC;

SELECT * 
FROM items
WHERE price >= 80
ORDER BY price DESC;

SELECT firstname, lastname
FROM customers
ORDER BY firstname ASC
LIMIT 3;

SELECT lastname
FROM customers
ORDER BY lastname DESC;
--- exercice2
SELECT * 
FROM customer;

SELECT first_name || ' ' || last_name AS full_name
FROM customer;

SELECT DISTINCT create_date
FROM customer;

SELECT *
FROM customer
ORDER BY first_name DESC;

SELECT film_id, title, description, release_year, rental_rate
FROM film
ORDER BY rental_rate ASC;

SELECT a.address, a.phone
FROM customer c
JOIN address a ON c.address_id = a.address_id
WHERE a.district = 'Texas';

SELECT *
FROM film
WHERE film_id IN (15, 150);

SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title = 'Inception';

SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title LIKE 'In%';

SELECT *
FROM film
ORDER BY rental_rate ASC
LIMIT 10;

SELECT *
FROM film
ORDER BY rental_rate ASC
OFFSET 10
LIMIT 10;

SELECT c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id;

SELECT *
FROM film f
WHERE NOT EXISTS (
    SELECT 1
    FROM inventory i
    WHERE i.film_id = f.film_id
);

SELECT ci.city, co.country
FROM city ci
JOIN country co ON ci.country_id = co.country_id;

SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date, s.staff_id
FROM payment p
JOIN customer c ON p.customer_id = c.customer_id
JOIN staff s ON p.staff_id = s.staff_id
ORDER BY s.staff_id;
