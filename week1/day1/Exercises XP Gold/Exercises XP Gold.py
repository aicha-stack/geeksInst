#exercice 1
month = int(input("Enter a month number (1 to 12): "))
if month in [3, 4, 5]:
    season = "Spring"
elif month in [6, 7, 8]:
    season = "Summer"
elif month in [9, 10, 11]:
    season = "Autumn"
elif month in [12, 1, 2]:
    season = "Winter"
else:
    season = None
if season:
    print(f"The season for month {month} is {season}.")
else:
    print(" Please enter a number between 1 and 12.")
#exercice 2
numbers = list(range(1, 21))  

for index in range(len(numbers)):
    if index % 2 == 0: 
        print(numbers[index])
#exercice 3
my_name = "Aicha"  
while True:  
    name = input(" enter your name: ")
    if name == my_name:
        print(" Your name matches mine.")
        break  
    else:
        print("Try again.")
#exercice 4
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']

user_name = input("Enter your name: ")

if user_name in names:
    index = names.index(user_name)  # kayjib l’index dyal l'awal occurrence
    print(f"The first occurrence of {user_name} is at index {index}.")
else:
    print(f"{user_name} is not in the list.")
#exercice 5
num1 = float(input("Input the 1er number: "))
num2 = float(input("Input the 2eme number: "))
num3 = float(input("Input the 3 eme number: "))

greatest = num1 

if num2 > greatest:
    greatest = num2

if num3 > greatest:
    greatest = num3

print(f"The greatest number is: {greatest}")
#exercice 6
import random
user_number = int(input("Enter a number from 1 to 9: "))
random_number = random.randint(1, 9)
if user_number == random_number:
    print("Winner")
else:
    print("Better luck next time.")
