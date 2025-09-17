# Python: Calculate total price
import psycopg2

def get_order_total(order_id):
    conn = psycopg2.connect(
        host="localhost",
        database="your_db",
        user="your_user",
        password="your_password"
    )
    cur = conn.cursor()
    cur.execute("SELECT SUM(price) FROM items WHERE order_id = %s", (order_id,))
    total = cur.fetchone()[0]
    cur.close()
    conn.close()
    return total if total else 0

def get_user_order_total(user_id, order_id):
    conn = psycopg2.connect(
        host="localhost",
        database="your_db",
        user="your_user",
        password="your_password"
    )
    cur = conn.cursor()
    cur.execute("""
        SELECT SUM(items.price)
        FROM items
        JOIN product_orders ON items.order_id = product_orders.order_id
        WHERE product_orders.order_id = %s AND product_orders.user_id = %s
    """, (order_id, user_id))
    total = cur.fetchone()[0]
    cur.close()
    conn.close()
    return total if total else 0


print("Total for order 1:", get_order_total(1))
print("Total for Alice's order 1:", get_user_order_total(1, 1))