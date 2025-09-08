from flask import Flask, render_template, request, redirect, url_for, flash
from database.index import connect_to_db

app = Flask(__name__)
app.secret_key = "supersecretkey"
@app.route('/')
def index():
    conn = connect_to_db()
    events = []
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM events ORDER BY date")
        events = cursor.fetchall()
        conn.close()
    return render_template('index.html', events=events)
@app.route('/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        name = request.form.get('name')
        date = request.form.get('date')
        location = request.form.get('location')
        description = request.form.get('description')
        organizer_id = request.form.get('organizer_id')
        
        if not name or not date or not location or not description or not organizer_id:
            flash("Tous les champs sont requis!", "red")
            return render_template('create.html')

        conn = connect_to_db()
        if conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO events (name,date,location,description,organizer_id) VALUES (%s,%s,%s,%s,%s)",
                (name,date,location,description,organizer_id)
            )
            conn.commit()
            conn.close()
            flash("Event créé!", "green")
            return redirect(url_for('index'))
    return render_template('create.html')
@app.route('')
def details(event_id):
    conn = connect_to_db()
    event = None
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM events WHERE id=%s", (event_id,))
        event = cursor.fetchone()
        conn.close()
    return render_template('details.html', event=event)


def edit(event_id):
    conn = connect_to_db()
    event = None
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM events WHERE id=%s", (event_id,))
        row = cursor.fetchone()
        if row:
            event = {'id': row[0], 'name': row[1], 'date': row[2], 'location': row[3], 'description': row[4], 'organizer_id': row[5]}
        if request.method == 'POST':
            name = request.form.get('name')
            date = request.form.get('date')
            location = request.form.get('location')
            description = request.form.get('description')
            organizer_id = request.form.get('organizer_id')
            cursor.execute(
                "UPDATE events SET name=%s,date=%s,location=%s,description=%s,organizer_id=%s WHERE id=%s",
                (name,date,location,description,organizer_id,event_id)
            )
            conn.commit()
            conn.close()
            flash("Event mis à jour!", "blue")
            return redirect(url_for('details', event_id=event_id))
        conn.close()
    return render_template('edit.html', event=event)

# Stats
@app.route('/stats')
def stats():
    conn = connect_to_db()
    stats_data = []
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT organizer_id, COUNT(*) FROM events GROUP BY organizer_id")
        stats_data = cursor.fetchall()
        conn.close()
    return render_template('stats.html', stats=stats_data)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
