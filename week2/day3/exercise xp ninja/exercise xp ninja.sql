SELECT f.film_id, f.title, f.rating
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
WHERE f.rating IN ('G', 'PG')
AND (r.return_date IS NOT NULL OR r.rental_id IS NULL);

CREATE TABLE waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    child_name VARCHAR(100) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_film FOREIGN KEY (film_id) REFERENCES film(film_id)
);

SELECT w.film_id, f.title, COUNT(w.waiting_id) AS nb_waiting
FROM waiting_list w
JOIN film f ON w.film_id = f.film_id
GROUP BY w.film_id, f.title;
