from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, g
from flask_migrate import Migrate
from database.index import db
from dotenv import load_dotenv
from ai_agent.index import ask_ai
import psycopg2
import os
from datetime import datetime

load_dotenv()

app = Flask(__name__)
app.secret_key = "supersecretkey"
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}"
    f"@{os.getenv('POSTGRES_HOST')}:{os.getenv('POSTGRES_PORT')}/{os.getenv('POSTGRES_DB')}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

# Database connection
def connect_to_db():
    try:
        conn = psycopg2.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            database=os.getenv('POSTGRES_DB', 'car_dealership'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'aicha1234')
        )
        return conn
    except Exception as e:
        print("Database connection error:", e)
        return None

# Track visits
def track_visit():
    """Track a visit to the site"""
    try:
        conn = connect_to_db()
        if conn:
            cursor = conn.cursor()
            ip_address = request.remote_addr
            user_agent = request.headers.get('User-Agent', '')[:500]  # Limit length
            page_url = request.path
            
            cursor.execute("""
                INSERT INTO visits (ip_address, user_agent, page_url, visit_date)
                VALUES (%s, %s, %s, %s)
            """, (ip_address, user_agent, page_url, datetime.now()))
            conn.commit()
            conn.close()
    except Exception as e:
        print(f"Error tracking visit: {e}")

def get_total_visits():
    """Get total number of visits"""
    try:
        conn = connect_to_db()
        if conn:
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM visits")
            count = cursor.fetchone()[0]
            conn.close()
            return count
    except Exception as e:
        print(f"Error getting visit count: {e}")
    return 0

# Track visits before each request (except static files and API endpoints)
@app.before_request
def before_request():
    # Only track page visits, not API calls or static files
    if request.endpoint and request.endpoint != 'static' and not request.path.startswith('/ai'):
        track_visit()
    g.total_visits = get_total_visits()

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

    total_pages = (total + limit - 1) // limit
    return render_template('index.html', cars=cars, search_query=search_query, page=page, total_pages=total_pages)

# Car Detail
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
                (model, year, price, description, imageurl, car_id)
            )
            conn.commit()
            conn.close()
            flash("Car updated successfully!", "blue")
            return redirect(url_for('car_detail', car_id=car_id))
        conn.close()
    return render_template('edit.html', car=car)

# Delete Car 
@app.route('/delete/<int:car_id>')
def delete_car(car_id):
    conn = connect_to_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM cars WHERE id = %s", (car_id,))
        conn.commit()
        conn.close()
    return redirect('/')

# Car details (alternative route)
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

# Charts
@app.route('/about')
def about():
    """About page"""
    return render_template('about.html')

@app.route('/community')
def community():
    """Community page"""
    return render_template('community.html')

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
            ORDER BY count DESC
        """)
        cars_data = cursor.fetchall()
        
        # Get sales per salesperson
        cursor.execute("""
            SELECT sp.name, COUNT(s.id) as sales_count
            FROM salespeople sp
            LEFT JOIN sales s ON sp.id = s.salesperson_id
            GROUP BY sp.id, sp.name
            ORDER BY sales_count DESC
            LIMIT 10
        """)
        salespeople_data = cursor.fetchall()
        
        # Get customer analytics (total customers and customers with purchases)
        cursor.execute("""
            SELECT 
                COUNT(DISTINCT c.id) as total_customers,
                COUNT(DISTINCT CASE WHEN s.id IS NOT NULL THEN c.id END) as customers_with_purchases
            FROM customers c
            LEFT JOIN sales s ON c.id = s.customer_id
        """)
        customer_stats = cursor.fetchone()
        
        # Get customer distribution (customers by number of purchases)
        cursor.execute("""
            SELECT 
                category,
                COUNT(*) as customer_count
            FROM (
                SELECT 
                    c.id,
                    CASE 
                        WHEN COUNT(s.id) = 0 THEN 'No Purchases'
                        WHEN COUNT(s.id) = 1 THEN '1 Purchase'
                        WHEN COUNT(s.id) BETWEEN 2 AND 5 THEN '2-5 Purchases'
                        ELSE '6+ Purchases'
                    END as category
                FROM customers c
                LEFT JOIN sales s ON c.id = s.customer_id
                GROUP BY c.id
            ) as customer_purchases
            GROUP BY category
            ORDER BY 
                CASE 
                    WHEN category = 'No Purchases' THEN 1
                    WHEN category = '1 Purchase' THEN 2
                    WHEN category = '2-5 Purchases' THEN 3
                    WHEN category = '6+ Purchases' THEN 4
                END
        """)
        customers_data = cursor.fetchall()
        
        # Get sales trend by year
        cursor.execute("""
            SELECT 
                EXTRACT(YEAR FROM sale_date) as year,
                COUNT(*) as sales_count,
                SUM(price) as total_revenue
            FROM sales
            WHERE sale_date IS NOT NULL
            GROUP BY EXTRACT(YEAR FROM sale_date)
            ORDER BY year ASC
        """)
        sales_year_data = cursor.fetchall()
        
        data = {
            'cars': {
                'labels': [car[0] for car in cars_data],
                'values': [car[1] for car in cars_data]
            },
            'salespeople': {
                'labels': [sp[0] for sp in salespeople_data] if salespeople_data else [],
                'values': [sp[1] for sp in salespeople_data] if salespeople_data else []
            },
            'customers': {
                'labels': [cust[0] for cust in customers_data] if customers_data else [],
                'values': [cust[1] for cust in customers_data] if customers_data else []
            },
            'sales_year': {
                'labels': [str(int(year[0])) for year in sales_year_data] if sales_year_data else [],
                'values': [year[1] for year in sales_year_data] if sales_year_data else []
            }
        }
        
        conn.close()
        return render_template("charts.html", data=data)
    except Exception as e:
        print("Error in charts route:", e)
        import traceback
        traceback.print_exc()
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

@app.route('/favicon.ico')
def favicon():
    return '', 204  # No content for favicon to avoid 404 errors

@app.errorhandler(404)
def not_found(error):
    # If it's an API request, return JSON
    if request.path.startswith('/api/') or request.is_json:
        return jsonify({"error": "Route non trouvée", "path": request.path}), 404
    # Otherwise, redirect to home or show a message
    flash("Page non trouvée", "red")
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
