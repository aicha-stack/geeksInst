class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []  
        self.messages = []  
    def call(self, other_phone):    
        call_info = f"{self.phone_number} called {other_phone.phone_number}"
        print(call_info)
        self.call_history.append(call_info)
    def show_call_history(self):
        print("Call History:")
        for call in self.call_history:
            print(call)
    def send_message(self, other_phone, content):
        message_info = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        self.messages.append(message_info)
        print(f"Message sent to {other_phone.phone_number}")
    def show_outgoing_messages(self):
        print("Outgoing Messages:")
        for msg in self.messages:
            if msg["from"] == self.phone_number:
                print(msg)
    def show_incoming_messages(self):
        print("Incoming Messages:")
        for msg in self.messages:
            if msg["to"] == self.phone_number:
                print(msg)
phone1 = Phone("0697360777")
phone2 = Phone("0677777777")
phone1.call(phone2)
phone1.send_message(phone2, "selaaam")
