---exercise 1
SELECT r.rental_id, r.inventory_id, r.customer_id, r.rental_date, f.title
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL;

SELECT c.customer_id, c.first_name, c.last_name, COUNT(r.rental_id) AS unreturned_rentals
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name;

SELECT f.film_id, f.title
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE c.name = 'Action' AND a.first_name = 'Joe' AND a.last_name = 'Swank';
---exercise 2
SELECT s.store_id, ci.city, co.country
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id;

SELECT s.store_id, SUM(f.length) AS total_minutes,
       SUM(f.length)/60 AS total_hours,
       SUM(f.length)/(60*24) AS total_days
FROM store s
JOIN inventory i ON s.store_id = i.store_id
JOIN film f ON i.film_id = f.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
WHERE i.inventory_id NOT IN (
    SELECT r2.inventory_id FROM rental r2 WHERE r2.return_date IS NULL
)
GROUP BY s.store_id;

SELECT c.customer_id, c.first_name, c.last_name, ci.city
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
WHERE ci.city_id IN (
    SELECT ci2.city_id
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
    JOIN city ci2 ON a2.city_id = ci2.city_id
);

SELECT c.customer_id, c.first_name, c.last_name, co.country
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
WHERE co.country_id IN (
    SELECT co2.country_id
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
    JOIN city ci2 ON a2.city_id = ci2.city_id
    JOIN country co2 ON ci2.country_id = co2.country_id
);

SELECT SUM(f.length) AS safe_minutes,
       SUM(f.length)/60 AS safe_hours,
       SUM(f.length)/(60*24) AS safe_days
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE c.name <> 'Horror'
AND f.title NOT ILIKE '%beast%'
AND f.title NOT ILIKE '%monster%'
AND f.title NOT ILIKE '%ghost%'
AND f.title NOT ILIKE '%dead%'
AND f.title NOT ILIKE '%zombie%'
AND f.title NOT ILIKE '%undead%'
AND f.description NOT ILIKE '%beast%'
AND f.description NOT ILIKE '%monster%'
AND f.description NOT ILIKE '%ghost%'
AND f.description NOT ILIKE '%dead%'
AND f.description NOT ILIKE '%zombie%'
AND f.description NOT ILIKE '%undead%';
