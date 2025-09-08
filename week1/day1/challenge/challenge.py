#challenge1
number = int(input("saisir un nombre: "))
length= int(input("saisir une longeur: "))
multiples = []
for i in range(1, length + 1):
    multiples.append(number * i)
print(multiples)    
#challenge2
user_string = input("saisir un texte : ")
result = ""

for i in range(len(user_string)):
    if i == 0 or user_string[i] != user_string[i-1]:
        result += user_string[i]

print(result)

