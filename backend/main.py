import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi import FastAPI

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI(
    title="AI Social Media Manager API",
    version="1.0.0"
)
@app.get("/")
def home():
    return {
        "status": "success",
        "message": "🚀 AI Social Media Manager API is Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/test-ai")
def test_ai():
    response = model.generate_content(
        "Write a short LinkedIn post on Python programming."
    )

    return {
        "response": response.text
    } 