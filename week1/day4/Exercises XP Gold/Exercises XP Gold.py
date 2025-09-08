class BankAccount:
    def __init__(self, username, password, balance=0):
        self.username = username
        self.password = password
        self.balance = balance
        self.authenticated = False

    def authenticate(self, username, password):
        if self.username == username and self.password == password:
            self.authenticated = True
            return True
        else:
            return False

    def deposit(self, amount):
        if self.authenticated:
            self.balance += amount
            return self.balance
        else:
            return "Not authenticated"

    def withdraw(self, amount):
        if self.authenticated:
            if amount <= self.balance:
                self.balance -= amount
                return self.balance
            else:
                return "Not enough balance"
        else:
            return "Not authenticated"
class MinimumBalanceAccount(BankAccount):
    def __init__(self, username, password, balance=0, minimum_balance=0):
        super().__init__(username, password, balance)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if self.authenticated:
            if self.balance - amount >= self.minimum_balance:
                self.balance -= amount
                return self.balance
            else:
                return "Below minimum balance"
        else:
            return "Not authenticated"
class ATM:
    def __init__(self, accounts, try_limit=2):
        self.accounts = accounts
        self.try_limit = try_limit
        self.tries = 0
        self.main_menu()

    def main_menu(self):
        while True:
            print("\n1. Log in")
            print("2. Exit")
            choice = input("Choice: ")

            if choice == "1":
                username = input("Username: ")
                password = input("Password: ")
                self.login(username, password)
            elif choice == "2":
                print("Bye")
                break
            else:
                print("Invalid")

    def login(self, username, password):
        for acc in self.accounts:
            if acc.authenticate(username, password):
                print("Welcome", username)
                self.account_menu(acc)
                return
        self.tries += 1
        print("Wrong info")
        if self.tries >= self.try_limit:
            print("Too many tries. Exit.")
            exit()

    def account_menu(self, acc):
        while True:
            print("\n1. Deposit")
            print("2. Withdraw")
            print("3. Back")
            choice = input("Choice: ")

            if choice == "1":
                amount = int(input("Deposit: "))
                print(acc.deposit(amount))
            elif choice == "2":
                amount = int(input("Withdraw: "))
                print(acc.withdraw(amount))
            elif choice == "3":
                break
            else:
                print("Invalid")




           