# exercice1
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

my_dict = dict(zip(keys, values))
print(my_dict)
# exercice2
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
total_cost = 0
for name, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    print(f"{name} has to pay dhs{price}")
    total_cost += price 
print(f"Total cost for the family: ${total_cost}")  
# exercice3
#1
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}
#2
brand["number_stores"] = 2
#3
print("Zara's clients are:", brand['type_of_clothes'])
#4
brand["country_creation"] = "Spain"
#5
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")
    #6
del brand["creation_date"]
#7
print(brand["international_competitors"][-1])
#8
print("The major colors in the US are:", brand["major_color"]["US"])
#9  
print(len(brand))
#10
print(brand.keys())
#11
more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}
#12
brand.update(more_on_zara)
#13
print(brand["number_stores"])
#the value of the key number_stores in brand changed from 2 to 10,000.cs of the update methode
# exercice4:
def describe_city(city, country="Iceland"):
    print(f"{city} is in {country}")

describe_city("Casablanca", "Morocco")
#exercice5:
import random

def compare_numbers(user_number):
    random_number = random.randint(1, 100)
    if user_number == random_number:
        print("Success!")
    else:
        print(f"Fail! Your number: {user_number}, Random number: {random_number}")

#exercice6:
def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is '{text}'")

make_shirt()
make_shirt("medium")
make_shirt("small", "lalala")
make_shirt(text="Hello ", size="extra large")
# exercice7:
import random

def get_random_temp(season):
    if season == "winter":
        low, high = -10, 16
    elif season == "spring":
        low, high = 0, 23
    elif season == "summer":
        low, high = 24, 40
    elif season in ["autumn", "fall"]:
        low, high = 0, 23
    else:
        low, high = -10, 40  # default range
    
    return random.randint(low, high)

def main():
    season = input("Enter a season (winter, spring, summer, autumn/fall): ").lower()
    temp = get_random_temp(season)
    print(f"The temperature right now is {temp} degrees Celsius.")
    
    if temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= temp <= 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 17 <= temp <= 23:
        print("Nice weather! A light jacket should be fine.")
    elif 24 <= temp <= 32:
        print("Warm weather! Stay hydrated.")
    else:
        print("It's really hot! Keep cool and avoid the sun.")

main()
# exercice8:
data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"}
]

def ask_questions():
    correct = 0
    incorrect = 0
    wrong_answers = []

    for item in data:
        user_answer = input(item["question"] + " ")
        if user_answer.strip().lower() == item["answer"].lower():
            correct += 1
        else:
            incorrect += 1
            wrong_answers.append({
                "question": item["question"],
                "your_answer": user_answer,
                "correct_answer": item["answer"]
            })
    return correct, incorrect, wrong_answers

def show_results(correct, incorrect, wrong_answers):
    print(f"You got {correct} correct and {incorrect} incorrect.")
    if wrong_answers:
        print("\nHere are the questions you missed:")
        for w in wrong_answers:
            print(f"Q: {w['question']}")
            print(f"Your answer: {w['your_answer']}")
            print(f"Correct answer: {w['correct_answer']}\n")


