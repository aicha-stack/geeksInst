#exercice1
print("Hello World\n"*4)  
#exercice2
resultat= (99 ** 3) * 8
print(resultat)
#exercice3
name = input("What is your name? ")
if name == "aisha":
    print("OMG,aisha We have the same name!!!!")
else:
    print(f"Hello {name}, my name is Aisha,nice to meet u.")
#exercice4  
height = int(input("What is your height in cm? "))
if height >= 145:
    print("You are tall enough to ride!")
else:
    print(" Sorry, you need to grow some more to ride.")
#exercice5
my_fav_numbers = {5, 1, 10,3} 
my_fav_numbers.add(24)
my_fav_numbers.add(15)
my_fav_numbers.remove(15) 
friend_fav_numbers= {3,24,2,8}

our_fav_numbers= my_fav_numbers.union(friend_fav_numbers)
print("Our favorite numbers are:", our_fav_numbers)
#exercice6
#no,tuples are immutable.
#exercice7
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")  
basket.remove("Blueberries")  
basket.append("Kiwi")
basket.insert(0, "Apples")
basket.count("Apples") 
basket.clear()
print(" basket:", basket)  
#exercice8
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
print("The deli has run out of pastrami.")
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich") 
print("Updated sandwich orders:", sandwich_orders)
finished_sandwiches = []        
for sandwich in sandwich_orders:
    print(f"I made your {sandwich}.")
    finished_sandwiches.append(sandwich)        
print("Finished sandwiches:", finished_sandwiches)
   