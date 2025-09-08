word = input("Enter a word: ")
result = {}

for i in range(len(word)):
    letter = word[i]
    if letter not in result:
        result[letter] = []
    result[letter].append(i)

print(result)
