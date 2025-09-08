class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {} 
    def add_animal(self, animal_type, count=1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count
    def get_info(self):
        result = f"{self.name}'s farm\n\n"
        for animal, count in self.animals.items():
            result += f"{animal} : {count}\n"
        result += "\n    E-I-E-I-0!"
        return result
macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 15)
print(macdonald.get_info())
def get_animal_types(self):
        return sorted(self.animals.keys())
def get_short_info(self):
        animal_list = self.get_animal_types()
        animals_with_s = []
        for animal in animal_list:
            if self.animals[animal] > 1:
                animals_with_s.append(animal + "s")
            else:
                animals_with_s.append(animal)
        return f"{self.name}'s farm has {', '.join(animals_with_s[:-1])} and {animals_with_s[-1]}."
print(macdonald.get_info())
