import psycopg2


conn = psycopg2.connect(
    host="localhost",
    dbname="restaurant_db",  
    user="postgres",        
    password="your_password", 
    port="5432"
)

cur = conn.cursor()

with open("database.sql", "r", encoding="utf-8") as f:
    sql_code = f.read()

cur.execute(sql_code)

conn.commit()

print("✅ Database initialized with data!")

cur.close()
conn.close()
