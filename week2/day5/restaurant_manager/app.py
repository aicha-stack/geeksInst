from flask import Flask, render_template, request, redirect, url_for, flash
from database.index import connect_to_db

app = Flask(__name__)
app.secret_key = "supersecretkey"

# View menu
@app.route('/')
def menu():
    conn = connect_to_db()
    items = []
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Menu_Items ORDER BY id")
        items = cursor.fetchall()
        conn.close()
    return render_template('menu.html', items=items)

# Add item
@app.route('/add', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        name = request.form.get('name')
        price = request.form.get('price')
        if not name or not price:
            flash("All fields are required!", "red")
            return render_template('add_item.html')
        conn = connect_to_db()
        if conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO Menu_Items (name, price) VALUES (%s, %s)", (name, price))
            conn.commit()
            conn.close()
            flash("Item added successfully!", "green")
            return redirect(url_for('menu'))
    return render_template('add_item.html')

# Update item
@app.route('/update/<int:item_id>', methods=['GET', 'POST'])
def update_item(item_id):
    conn = connect_to_db()
    item = None
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Menu_Items WHERE id=%s", (item_id,))
        row = cursor.fetchone()
        if row:
            item = {'id': row[0], 'name': row[1], 'price': row[2]}
        if request.method == 'POST':
            name = request.form.get('name')
            price = request.form.get('price')
            cursor.execute("UPDATE Menu_Items SET name=%s, price=%s WHERE id=%s", (name, price, item_id))
            conn.commit()
            conn.close()
            flash("Item updated successfully!", "green")
            return redirect(url_for('menu'))
        conn.close()
    return render_template('update_item.html', item=item)

# Delete item
@app.route('/delete/<int:item_id>', methods=['POST'])
def delete_item(item_id):
    conn = connect_to_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Menu_Items WHERE id=%s", (item_id,))
        conn.commit()
        conn.close()
        flash("Item deleted!", "red")
    return redirect(url_for('menu'))

if __name__ == "__main__":
    app.run(debug=True, port=5000)
