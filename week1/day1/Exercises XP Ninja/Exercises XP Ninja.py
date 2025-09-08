#exercice1:
# true 
# true 
# false
# false
# true
# false

#x is True
#y is False
#a: 5
#b: 10
# exercice2:

longest_sentence = ""
while True:
    sentence = input("Enter the longest sentence  without the 'A': ")
    if "A" in sentence or "a" in sentence:# zdt had a sghera wlken rh waqila mkhdamash hit fash kndir shi message feh a kygolosh leya la kydwzoha eadi!
        print("Oops! Your sentence contains the 'A'. Try again.")
        continue
    if len(sentence) > len(longest_sentence):
        longest_sentence = sentence
        print("Congratulations! That's the new longest sentence without 'A'.")
    else:
        print("sorry , it's not longer than your previous best.")

#exercice3:
paragraph = "Un paragraphe est un ensemble de phrases qui gravitent toutes autour d'une idée commune Tout paragraphe contient au moins trois parties, la quatrième étant facultative"
unique_words = set(words)
print("Characters:", len(paragraph))
print("Sentences:", len([s for s in paragraph.split('.') if s.strip()]))
print("Words:", len(words))
print("Unique words:", len(unique_words))
