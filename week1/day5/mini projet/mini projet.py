import random
class Game:
    def get_user_item(self):
        """Demande à l'utilisateur de choisir rock, paper ou scissors"""
        choices = ["rock", "paper", "scissors"]
        while True:
            user_choice = input("Choisis entre rock, paper ou scissors : ").lower()
            if user_choice in choices:
                return user_choice
            print("Oups ! Choix invalide.")

    def get_computer_item(self):
        """Choisit au hasard rock, paper ou scissors pour l'ordinateur"""
        choices = ["rock", "paper", "scissors"]
        return random.choice(choices)

    def get_game_result(self, user_item, computer_item):
        """Détermine si l'utilisateur a gagné, perdu ou fait match nul"""
        if user_item == computer_item:
            return "draw"
        elif (user_item == "rock" and computer_item == "scissors") or \
             (user_item == "paper" and computer_item == "rock") or \
             (user_item == "scissors" and computer_item == "paper"):
            return "win"
        else:
            return "loss"

    def play(self):
        """Joue une partie et retourne le résultat"""
        user_choice = self.get_user_item()
        computer_choice = self.get_computer_item()
        result = self.get_game_result(user_choice, computer_choice)

        print(f"Tu as choisi : {user_choice}.")
        print(f"L'ordinateur a choisi : {computer_choice}.")
        if result == "win":
            print("Félicitations ! Tu as gagné cette manche ! ")
        elif result == "loss":
            print("Dommage... L'ordinateur a gagné cette fois. ")
        else:
            print("Match nul ! Vous êtes à égalité. ")

        return result