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
def generate_caption(topic: str, platform: str, tone: str):

    prompt = f"""
Create a viral {platform} caption.

Topic: {topic}
Tone: {tone}

Requirements:
- Write in {tone} style.
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
def generate_hashtags(topic: str, platform: str, tone: str):

    prompt = f"""
Platform: {platform}
Topic: {topic}
Tone: {tone}

Generate 20 trending hashtags.

Rules:
- Match the {tone} writing style.
- Only hashtags
- One hashtag per line
- No numbering
"""

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "topic": topic,
        "hashtags": response.text
    }

@app.post("/generate-poll")
def generate_poll(topic: str, platform: str, tone: str):

    prompt = f"""
Platform: {platform}
Topic: {topic}
Tone: {tone}

Create a poll in {tone} style.

Include:
- One question
- 4 options
- 2 emojis
"""

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "topic": topic,
        "poll": response.text
    }
@app.post("/improve-content")
def improve_content(topic: str, platform: str, tone: str):

    prompt = f"""
Platform: {platform}
Tone: {tone}

Improve this content in {tone} style.

Content:
{topic}
"""

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "original": topic,
        "improved": response.text
    }

@app.post("/generate-ideas")
def generate_ideas(niche: str, platform: str, tone: str):

    prompt = f"""
Platform: {platform}
Niche: {niche}
Tone: {tone}

Generate 20 viral content ideas in {tone} style.
"""

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "niche": niche,
        "ideas": response.text
    }
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
def generate_caption(topic: str, platform: str, tone: str):

    prompt = f"""
Create a viral {platform} caption.

Topic: {topic}
Tone: {tone}

Requirements:
- Write in {tone} style.
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
def generate_hashtags(topic: str, platform: str, tone: str):

    prompt = f"""
Platform: {platform}
Topic: {topic}
Tone: {tone}

Generate 20 trending hashtags.

Rules:
- Match the {tone} writing style.
- Only hashtags
- One hashtag per line
- No numbering
"""

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "topic": topic,
        "hashtags": response.text
    }

@app.post("/generate-poll")
def generate_poll(topic: str, platform: str, tone: str):

    prompt = f"""
Platform: {platform}
Topic: {topic}
Tone: {tone}

Create a poll in {tone} style.

Include:
- One question
- 4 options
- 2 emojis
"""

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "topic": topic,
        "poll": response.text
    }
@app.post("/improve-content")
def improve_content(content: str, platform: str, tone: str):

    prompt = f"""
Platform: {platform}
Tone: {tone}

Improve this content in {tone} style.

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
def generate_ideas(niche: str, platform: str, tone: str):

    prompt = f"""
Platform: {platform}
Niche: {niche}
Tone: {tone}

Generate 20 viral content ideas in {tone} style.
"""

    response = model.generate_content(prompt)

    return {
        "platform": platform,
        "niche": niche,
        "ideas": response.text
    }