#exercice1:
class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius
    def perimeter(self):
        return 2 * 3.14 * self.radius
    def area(self):
        return 3.14159 * (self.radius ** 2)
    def definition(self):
        print("A circle is a ......")
#exercice2:
import random
class MyList:
    def __init__(self, letters):
      self.letters= letters
    def reversed_list(self):
        return self.letters[::-1]
    def sorted_list(self):
        return sorted(self.letters)
    def random_list(self):
        return[random.radint(0,100) for _ in range(len(self.letters))]

#exercice3:
# menu_manager.py

class MenuManager:
    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True}
        ]
        def add_item(self, name, price, spice, gluten):
           new_dish = {"name": name, "price": price, "spice": spice, "gluten": gluten}
           self.menu.append(new_dish)
           print(f"{name} has been added to the menu.")
        def update_item(self, name, price, spice, gluten):
          for dish in self.menu:
            if dish["name"].lower() == name.lower():
                dish["price"] = price
                dish["spice"] = spice
                dish["gluten"] = gluten
                print(f"{name} has been updated.")
                return
          print(f"{name} is not in the menu.")
        def delete_item(self, name):
            for dish in self.menu:
                if dish["name"].lower() == name.lower():
                    self.menu.remove(dish)
                    print(f"{name} has been deleted from the menu.")
                    return
            print(f"{name} is not in the menu.")

