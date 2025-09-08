#exercice1:
cars_str = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"
cars_list = cars_str.split(", ")
print(f"There are {len(cars_list)} manufacturers in the list.")
print("Manufacturers in reverse order:", sorted(cars_list, reverse=True))
count_without_i = 0  
for car in cars_list:
    if "i" not in car.lower():  
        count_without_i += 1

print("Manufacturers without letter 'i':", count_without_i)
cars_with_duplicates = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]
unique_cars = list(set(cars_with_duplicates))
print(f"Unique companies: {', '.join(unique_cars)}")
print(f"Now there are {len(unique_cars)} companies in the list.")
#exercice2:
def full_name(first_name, last_name,middle_name=""):
    first_name = first_name.capitalize()
    middle_name = middle_name.capitalize()
    last_name = last_name.capitalize()
    if middle_name:
        return f"{first_name} {middle_name} {last_name}"
    else:
        return f"{first_name} {last_name}"
print(full_name("mohamed", "ezzahraoui","adam"))
#exercice3:
MORSE_CODE = {
    'A': '.-',    'B': '-...',  'C': '-.-.',  'D': '-..',   'E': '.',
    'F': '..-.',  'G': '--.',   'H': '....',  'I': '..',    'J': '.---',
    'K': '-.-',   'L': '.-..',  'M': '--',    'N': '-.',    'O': '---',
    'P': '.--.',  'Q': '--.-',  'R': '.-.',   'S': '...',   'T': '-',
    'U': '..-',   'V': '...-',  'W': '.--',   'X': '-..-',  'Y': '-.--',
    'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.'
}
