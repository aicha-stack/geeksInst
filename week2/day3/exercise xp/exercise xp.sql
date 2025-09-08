---exercise 1
SELECT * 
FROM language;

SELECT f.title, f.description, l.name AS language_name
FROM film f
JOIN language l ON f.language_id = l.language_id;

SELECT f.title, f.description, l.name AS language_name
FROM language l
LEFT JOIN film f ON f.language_id = l.language_id;

CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO new_film (name) VALUES 
('Inception'),
('The Matrix'),
('Avatar');

CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INT REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INT REFERENCES language(language_id),
    title VARCHAR(100),
    score INT CHECK(score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES 
(1, 1, 'Amazing sci-fi', 9, 'A mind-blowing movie with deep concepts.'),
(2, 2, 'Classic action', 8, 'Loved the action and philosophy behind it.');

DELETE FROM new_film WHERE id = 1;
---exercise 2
UPDATE film SET language_id = 2 WHERE film_id IN (1,2,3);

SELECT conname, confrelid::regclass AS references_to
FROM pg_constraint
WHERE conrelid = 'customer'::regclass AND contype = 'f';

DROP TABLE customer_review;

SELECT COUNT(*) 
FROM rental 
WHERE return_date IS NULL;

SELECT f.film_id, f.title, f.rental_rate, f.replacement_cost
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.return_date IS NULL
ORDER BY f.rental_rate DESC
LIMIT 30;

SELECT DISTINCT f.title
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE f.description ILIKE '%sumo wrestler%' 
AND a.first_name = 'Penelope' 
AND a.last_name = 'Monroe';

SELECT f.title
FROM film f
WHERE f.length < 60 
AND f.rating = 'R';

SELECT DISTINCT f.title
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' 
AND c.last_name = 'Mahan'
AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01'
AND r.rental_rate > 4.00;

SELECT DISTINCT f.title
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' 
AND c.last_name = 'Mahan'
AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;
