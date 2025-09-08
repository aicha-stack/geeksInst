--- exercise 1;
SELECT rating, COUNT(*) AS total_films
FROM film
GROUP BY rating;

SELECT film_id, title, rating
FROM film
WHERE rating IN ('G', 'PG-13');

SELECT film_id, title, rating, length, rental_rate
FROM film
WHERE rating IN ('G', 'PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title ASC;

UPDATE customer
SET first_name = 'Aisha',
    last_name = 'Ezzahraoui',
    email = 'aicha12ezzahaoui@gmail.com'
WHERE customer_id = 1;

SELECT address_id FROM customer WHERE customer_id = 1;

UPDATE address
SET address = 'rahma dar bouazza',
    district = 'Casablanca',
    postal_code = '20000',
    phone = '0697360777'
WHERE address_id = 5;
---- exercise 2;
UPDATE students
SET birth_date = '1998-11-02'
WHERE first_name = 'Lea' AND last_name = 'Benichou'
   OR first_name = 'Marc' AND last_name = 'Benichou';

UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David' AND last_name = 'Grez';

DELETE FROM students
WHERE first_name = 'Lea' AND last_name = 'Benichou';

SELECT COUNT(*) AS total_students
FROM students;

SELECT COUNT(*) AS born_after_2000
FROM students
WHERE birth_date > '2000-01-01';

ALTER TABLE students
ADD COLUMN math_grade INT;

UPDATE students
SET math_grade = 80
WHERE id = 1;

UPDATE students
SET math_grade = 90
WHERE id IN (2, 4);

UPDATE students
SET math_grade = 40
WHERE id = 6;

SELECT COUNT(*) AS grade_above_83
FROM students
WHERE math_grade > 83;

INSERT INTO students (first_name, last_name, birth_date, math_grade)
VALUES ('Omer', 'Simpson', (SELECT birth_date FROM students WHERE first_name='Omer' AND last_name='Simpson' LIMIT 1), 70);

SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name, last_name;

SELECT SUM(math_grade) AS total_sum
FROM students;
---exercise 3;
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    item_id INT REFERENCES items(id),
    quantity_purchased INT
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'),
    (SELECT id FROM items WHERE item_name = 'fan'),
    1
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Melanie' AND last_name = 'Johnson'),
    (SELECT id FROM items WHERE item_name = 'large desk'),
    10
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Greg' AND last_name = 'Jones'),
    (SELECT id FROM items WHERE item_name = 'small desk'),
    2
);

SELECT * FROM purchases;

SELECT p.id, c.first_name, c.last_name, p.item_id, p.quantity_purchased
FROM purchases p
JOIN customers c ON p.customer_id = c.id;

SELECT * 
FROM purchases
WHERE customer_id = 5;

SELECT * 
FROM purchases p
JOIN items i ON p.item_id = i.id
WHERE i.item_name IN ('large desk','small desk');

SELECT c.first_name, c.last_name, i.item_name
FROM purchases p
JOIN customers c ON p.customer_id = c.id
JOIN items i ON p.item_id = i.id;

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (1, NULL, 5);
