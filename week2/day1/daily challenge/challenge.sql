
SELECT COUNT(*) FROM actors;

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES ('Tom', '', NULL, 0);

--Une erreur se produit parce que certaines colonnes de ta table sont définies comme NOT NULL
