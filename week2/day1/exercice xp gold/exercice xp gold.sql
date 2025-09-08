SELECT first_name, last_name, birth_date
FROM students
ORDER BY last_name ASC
LIMIT 4;
SELECT first_name, last_name, birth_date
FROM students
ORDER BY birth_date DESC
LIMIT 1;
SELECT first_name, last_name, birth_date
FROM students
ORDER BY id
OFFSET 2
LIMIT 3;