CREATE DATABASE restaurant;

\c restaurant;

CREATE TABLE Menu_Items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(30) NOT NULL,
    item_price SMALLINT DEFAULT 0
);
import psycopg2

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def save(self):
        connection = psycopg2.connect(
            dbname="restaurant", user="postgres", password="your_password", host="localhost"
        )
        cursor = connection.cursor()
        cursor.execute("INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s)", (self.name, self.price))
        connection.commit()
        cursor.close()
        connection.close()

    def delete(self):
        connection = psycopg2.connect(
            dbname="restaurant", user="postgres", password="your_password", host="localhost"
        )
        cursor = connection.cursor()
        cursor.execute("DELETE FROM Menu_Items WHERE item_name = %s", (self.name,))
        connection.commit()
        cursor.close()
        connection.close()

    def update(self, new_name, new_price):
        connection = psycopg2.connect(
            dbname="restaurant", user="postgres", password="your_password", host="localhost"
        )
        cursor = connection.cursor()
        cursor.execute("UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_name = %s", (new_name, new_price, self.name))
        connection.commit()
        cursor.close()
        connection.close()
        self.name = new_name
        self.price = new_price


class MenuManager:
    @classmethod
    def get_by_name(cls, name):
        connection = psycopg2.connect(
            dbname="restaurant", user="postgres", password="your_password", host="localhost"
        )
        cursor = connection.cursor()
        cursor.execute("SELECT item_name, item_price FROM Menu_Items WHERE item_name = %s", (name,))
        row = cursor.fetchone()
        cursor.close()
        connection.close()
        if row:
            return MenuItem(row[0], row[1])
        return None

    @classmethod
    def all_items(cls):
        connection = psycopg2.connect(
            dbname="restaurant", user="postgres", password="your_password", host="localhost"
        )
        cursor = connection.cursor()
        cursor.execute("SELECT item_name, item_price FROM Menu_Items")
        rows = cursor.fetchall()
        cursor.close()
        connection.close()
        return [MenuItem(row[0], row[1]) for row in rows]


def show_user_menu():
    while True:
        print("\n--- Restaurant Menu Manager ---")
        print("(V) View an Item")
        print("(A) Add an Item")
        print("(D) Delete an Item")
        print("(U) Update an Item")
        print("(S) Show the Menu")
        print("(E) Exit")

        choice = input("Choose an option: ").upper()

        if choice == "V":
            name = input("Enter item name: ")
            item = MenuManager.get_by_name(name)
            if item:
                print(f"{item.name} : {item.price}")
            else:
                print("Item not found.")
        elif choice == "A":
            add_item_to_menu()
        elif choice == "D":
            remove_item_from_menu()
        elif choice == "U":
            update_item_from_menu()
        elif choice == "S":
            show_restaurant_menu()
        elif choice == "E":
            print("Exiting... Final Menu:")
            show_restaurant_menu()
            break
        else:
            print("Invalid choice.")


def add_item_to_menu():
    name = input("Enter item name: ")
    price = int(input("Enter item price: "))
    item = MenuItem(name, price)
    item.save()
    print(f"{name} was added successfully.")


def remove_item_from_menu():
    name = input("Enter the item name to delete: ")
    item = MenuItem(name, 0)
    item.delete()
    print(f"{name} was deleted successfully (if it existed).")


def update_item_from_menu():
    old_name = input("Enter the current item name: ")
    new_name = input("Enter the new item name: ")
    new_price = int(input("Enter the new item price: "))
    item = MenuItem(old_name, 0)
    item.update(new_name, new_price)
    print(f"{old_name} was updated successfully to {new_name} - {new_price}.")


def show_restaurant_menu():
    items = MenuManager.all_items()
    print("\n--- Restaurant Menu ---")
    for item in items:
        print(f"{item.name} : {item.price}")
    if not items:
        print("(Menu is empty)")


if __name__ == "__main__":
    show_user_menu()
