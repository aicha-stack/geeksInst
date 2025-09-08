CREATE DATABASE countries_db;

\c countries_db;

CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capital VARCHAR(100),   
    flag VARCHAR(300),
    subregion VARCHAR(100),
    population BIGINT
);
import psycopg2
import requests
import random

def connect_db():
    return psycopg2.connect(
        dbname="countries_db",
        user="postgres",
        password="your_password",
        host="localhost",
        port="5432"
    )

def insert_country(name, capital, flag, subregion, population):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO countries (name, capital, flag, subregion, population) VALUES (%s, %s, %s, %s, %s)",
        (name, capital, flag, subregion, population)
    )
    conn.commit()
    cur.close()
    conn.close()

