from datetime import datetime

birthdate_str = input("Enter your birthdate (DD/MM/YYYY): ")
birthdate = datetime.strptime(birthdate_str, "%d/%m/%Y")
today = datetime.today()
age = today.year - birthdate.year
if (today.month, today.day) < (birthdate.month, birthdate.day):
    age -= 1

candles = age % 10
candles_str = "i" * candles
is_leap = (birthdate.year % 4 == 0 and (birthdate.year % 100 != 0 or birthdate.year % 400 == 0))

def print_cake():
    print(f"   ___{candles_str}___")
    print("  |:H:a:p:p:y:|")
    print(" __|___________|__")
    print("|^^^^^^^^^^^^^^^^^|")
    print("|:B:i:r:t:h:d:a:y:|")
    print("|                 |")
    print("~~~~~~~~~~~~~~~~~~~")

print_cake()
if is_leap:
    print()
    print_cake()
