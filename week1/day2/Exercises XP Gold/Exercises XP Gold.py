#exercice1
birthdays = {
    "aisha": "2004/05/24",
    "cold": "2001/12/08",
    "youness": "2006/01/18",
    "aya": "06/02/2005",
    "wadii": "2001/12/24"
}

print("Welcome! You can look up the birthdays of the people in the list.")

name = input("Enter a person's name: ")

birthday = birthdays.get(name)

if birthday:
    print(f"{name}'s birthday is on {birthday}.")
else:
    print(f"Sorry, we don't have the birthday information for {name}.")
#exercice2:
birthdays = {"aisha": "2004/05/24",
    "cold": "2001/12/08",
    "youness": "2006/01/18",
    "aya": "06/02/2005",
    "wadii": "2001/12/24"
    
}

print("Welcome! Here are the people you can choose from:")
for name in birthdays.keys():
    print("-", name)
person = input("\nEnter a person's name: ")
if person in birthdays:
    print(f"{person}'s birthday is on {birthdays[person]}.")
else:
    print(f"Sorry, we don't have the birthday information for {person}.")
#exercice3:
def special_sum(X):
     X_str = str(X)
     total = int(X_str) + int(X_str * 2) + int(X_str * 3) + int(X_str * 4)
     return total
#exercice4:
import random

def throw_dice():
    return random.randint(1, 6)

def throw_until_doubles():
    count = 0
    while True:
        dice1 = throw_dice()
        dice2 = throw_dice()
        count += 1
        if dice1 == dice2:
            break
    return count
