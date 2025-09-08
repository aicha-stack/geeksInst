import os
from openai import OpenAI
from dotenv import load_dotenv
from models.models import Car

load_dotenv()

endpoint = "https://models.github.ai/inference"
token = os.environ["GITHUB_TOKEN"]

client = OpenAI(
    base_url=endpoint,
    api_key=token,
)

def ask_ai(question: str) -> str:
    # === Cars ===
    cars = Car.query.all()
    cars_info = "\n".join([f"{c.model} - ${c.price}" for c in cars])

    context = f"""
    You are an assistant for a car dealership.
    
    Here are some cars in the database:
    {cars_info}
    """

    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[
            {"role": "system", "content": context},
            {"role": "user", "content": question},
        ],
        max_tokens=1000,
        temperature=0.7,
    )
    return response.choices[0].message.content