import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI(
    title="AI Social Media Manager API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
@app.post("/generate-caption")
def generate_caption(topic: str, platform: str):

    prompt = f"""
    Create a viral {platform} caption on the topic: {topic}

    Include:
    - Attractive caption
    - 10 relevant hashtags
    - 3 emojis
    """

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "topic": topic,
        "caption": response.text
    }
@app.post("/generate-hashtags")
def generate_hashtags(topic: str, platform: str):

    prompt = f"""
    Generate 20 trending hashtags for {platform} about {topic}.

    Rules:
    - Only hashtags
    - No numbering
    - One hashtag per line
    """

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "topic": topic,
        "hashtags": response.text
    }

@app.post("/generate-poll")
def generate_poll(topic: str, platform: str):

    prompt = f"""
    Create an engaging poll for {platform} about {topic}.

    Include:
    - One poll question
    - 4 options
    - 2 relevant emojis
    """

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "topic": topic,
        "poll": response.text
    }
@app.post("/improve-content")
def improve_content(content: str, platform: str):

    prompt = f"""
    Improve the following {platform} post.

    Make it:
    - More engaging
    - Professional
    - Easy to read
    - Add suitable emojis
    - Add a call-to-action

    Content:
    {content}
    """

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "original": content,
        "improved": response.text
    }
@app.post("/improve-content")
def improve_content(content: str, platform: str):

    prompt = f"""
    Improve the following {platform} post.

    Make it:
    - More engaging
    - Professional
    - Easy to read
    - Add suitable emojis
    - Add a call-to-action

    Content:
    {content}
    """

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "original": content,
        "improved": response.text
    }

@app.post("/generate-ideas")
def generate_ideas(niche: str, platform: str):

    prompt = f"""
    Generate 20 viral content ideas for {platform} about {niche}.

    Include:
    - Short title
    - One line description
    - Trending ideas
    """

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "niche": niche,
        "ideas": response.text
    }