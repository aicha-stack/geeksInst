users = {
    "alice": "1234",
    "bob": "abcd",
    "charlie": "pass"
}

logged_in = None

while True:
    action = input("Enter 'login', 'exit': ").lower()

    if action == "exit":
        break

    if action == "login":
        username = input("Username: ")
        password = input("Password: ")

        if username in users and users[username] == password:
            print("you are now logged in")
            logged_in = username
        else:
            print("user does not exist")
            signup = input("Would you like to sign up? (yes/no): ").lower()
            if signup == "yes":
                while True:
                    new_user = input("Choose a username: ")
                    if new_user in users:
                        print("Username already exists, try again")
                    else:
                        break
                new_pass = input("Choose a password: ")
                users[new_user] = new_pass
                print("User registered successfully")
CREATE DATABASE auth_db;

\c auth_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL
);
import psycopg2
import hashlib

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def connect_db():
    return psycopg2.connect(
        dbname="auth_db", user="postgres", password="your_password", host="localhost"
    )

def add_user(username, password):
    connection = connect_db()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hash_password(password)))
    connection.commit()
    cursor.close()
    connection.close()

def check_user(username, password):
    connection = connect_db()
    cursor = connection.cursor()
    cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
    row = cursor.fetchone()
    cursor.close()
    connection.close()
    if row and row[0] == hash_password(password):
        return True
    return False

logged_in = None

while True:
    action = input("Enter 'login', 'signup', 'exit': ").lower()

    if action == "exit":
        break

    if action == "login":
        username = input("Username: ")
        password = input("Password: ")
        if check_user(username, password):
            print("you are now logged in")
            logged_in = username
        else:
            print("invalid credentials")

    if action == "signup":
        while True:
            username = input("Choose a username: ")
            connection = connect_db()
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
            exists = cursor.fetchone()
            cursor.close()
            connection.close()
            if exists:
                print("Username already exists, try again")
            else:
                break
        password = input("Choose a password: ")
        add_user(username, password)
        print("User registered successfully")
