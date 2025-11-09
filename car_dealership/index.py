from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import psycopg2
from database.index import db
from models.models import Car, Salesperson, Customer, Sale  # Fix the import path
from datetime import datetime
from dotenv import load_dotenv
from ai_agent.index import ask_ai
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = "supersecretkey"  
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:aicha1234@localhost/car_dealership'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)    
with app.app_context():
    db.create_all
#Database connection
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
        print("Database connection error:", e)
        return None

#image 
# def get_random_car_image(model=None):
#     if model:
#         query = model.replace(' ', '%20') + ",car"
#     else:
#         query = "car"
#     return f"https://picsum.photos/200/300/?random={query}"


# Home 
@app.route('/')
def index():
    search_query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    limit = 6  
    offset = (page - 1) * limit

    conn = connect_to_db()
    cars = []
    total = 0
    if conn:
        cursor = conn.cursor()
        if search_query:
            cursor.execute("""
                SELECT COUNT(*) FROM cars 
                WHERE LOWER(model) LIKE LOWER(%s) 
                OR LOWER(description) LIKE LOWER(%s)
            """, (f'%{search_query}%', f'%{search_query}%'))
            total = cursor.fetchone()[0]

            cursor.execute("""
                SELECT * FROM cars 
                WHERE LOWER(model) LIKE LOWER(%s) 
                OR LOWER(description) LIKE LOWER(%s)
                ORDER BY id DESC
                LIMIT %s OFFSET %s
            """, (f'%{search_query}%', f'%{search_query}%', limit, offset))
        else:
            cursor.execute("SELECT COUNT(*) FROM cars")
            total = cursor.fetchone()[0]

            cursor.execute("SELECT * FROM cars ORDER BY id DESC LIMIT %s OFFSET %s", (limit, offset))
        rows = cursor.fetchall()
        conn.close()
        for row in rows:
            cars.append({
                'id': row[0],
                'model': row[1],
                'year': row[2],
                'price': row[3],
                'description': row[4],
                'image_url': row[5]
            })
            # print(cars.append({
            #     'id': row[0],
            #     'model': row[1],
            #     'year': row[2],
            #     'price': row[3],
            #     'description': row[4],
            #     'image_url': row[5],
            # }))

    total_pages = (total + limit - 1) // limit
    return render_template('index.html', cars=cars, search_query=search_query, page=page, total_pages=total_pages)

#  Car Detail
@app.route('/details/<int:car_id>')
def car_detail(car_id):
    conn = connect_to_db()
    car = None
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM cars WHERE id = %s", (car_id,))
        row = cursor.fetchone()
        conn.close()
        if row:
            car = {
                'id': row[0],
                'model': row[1],
                'year': row[2],
                'price': row[3],
                'description': row[4],
                'image_url': row[5]
            }
    return render_template('details.html', car=car)

# Create Car 
@app.route('/create', methods=['GET','POST'])
def create():
    if request.method == 'POST':
        model = request.form.get('model')
        year = request.form.get('year')
        price = request.form.get('price')
        description = request.form.get('description')
        imageurl = request.form.get('image_url')

        if not model or not year or not price or not description:
            flash("All fields are required!", "red")
            return render_template('create.html')

        conn = connect_to_db()
        if conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO cars (model, year, price, description, image_url) VALUES (%s,%s,%s,%s,%s)",
                (model, year, price, description, imageurl)
            )
            conn.commit()
            conn.close()
            
            flash("Car added successfully!", "green")
            return redirect(url_for('index'))

    return render_template('create.html')



# Edit Car 
@app.route('/edit/<int:car_id>', methods=['GET','POST'])
def edit(car_id):
    conn = connect_to_db()
    car = None
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM cars WHERE id = %s", (car_id,))
        row = cursor.fetchone()
        if row:
            car = {
                'id': row[0],
                'model': row[1],
                'year': row[2],
                'price': row[3],
                'description': row[4],
                'image_url': row[5]
            }
        if request.method == 'POST':
            model = request.form.get('model')
            year = request.form.get('year')
            price = request.form.get('price')
            description = request.form.get('description')
            imageurl = request.form.get('image_url')
            cursor.execute(
                "UPDATE cars SET model=%s, year=%s, price=%s, description=%s, image_url=%s WHERE id=%s",
                (model, year, price, description,imageurl, car_id)
            )
            conn.commit()
            conn.close()
            flash("Car updated successfully!", "blue")
            return redirect(url_for('car_detail', car_id=car_id))
        conn.close()
    return render_template('edit.html', car=car)


#  Delete Car 
@app.route('/delete/<int:car_id>')
def delete_car(car_id):
    conn = connect_to_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM cars WHERE id = %s", (car_id,))
        conn.commit()
        conn.close()
    return redirect('/')

#  details 
@app.route('/car/<int:car_id>')
def car_details(car_id):
    conn = connect_to_db()
    car = None
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM cars WHERE id = %s", (car_id,))
        row = cursor.fetchone()
        conn.close()
        if row:
            car = {
                'id': row[0],
                'model': row[1],
                'year': row[2],
                'price': row[3],
                'description': row[4],
                'image_url': row[5]
            }
    return render_template("details.html", car=car)


# :charts
@app.route('/charts')
def charts():
    try:
        conn = connect_to_db()
        cursor = conn.cursor()
        
        # Get cars per model count
        cursor.execute("""
            SELECT model, COUNT(*) as count 
            FROM cars 
            GROUP BY model
        """)
        cars_data = cursor.fetchall()
        
        data = {
            'cars': {
                'labels': [car[0] for car in cars_data],
                'values': [car[1] for car in cars_data]
            },
            'salespeople': {'labels': [], 'values': []},
            'customers': {'labels': [], 'values': []},
            'sales_year': {'labels': [], 'values': []}
        }
        
        conn.close()
        return render_template("charts.html", data=data)
    except Exception as e:
        print("Error in charts route:", e)
        return render_template("charts.html", data={
            'cars': {'labels': [], 'values': []},
            'salespeople': {'labels': [], 'values': []},
            'customers': {'labels': [], 'values': []},
            'sales_year': {'labels': [], 'values': []}
        })

@app.route("/ai", methods=["POST"])
def ai_chat():
    data = request.get_json()
    user_question = data.get("question")

    if not user_question:
        return jsonify({"answer": "Please ask a valid question."})

    answer = ask_ai(user_question)
    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(debug=True, port=5001)



