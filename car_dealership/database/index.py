
import psycopg2

def connect_to_db():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="car_dealership",  
            user="postgres",           
            password="aicha1234"    
        )
        return conn
    except Exception as e:
        print("Database connection failed:", e)
        return None

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
