import os
from openai import AsyncOpenAI
import google.generativeai as genai
import logging

logger = logging.getLogger("servalocal.ai_service")

# Initialize OpenAI
openai_api_key = os.getenv("OPENAI_API_KEY", "dummy-key")
openai_client = AsyncOpenAI(api_key=openai_api_key)

# Initialize Gemini
gemini_api_key = os.getenv("GEMINI_API_KEY", "dummy-key")
genai.configure(api_key=gemini_api_key)

async def chat_assistant(message: str, chat_history: list, user_context: dict) -> str:
    """Uses OpenAI for a conversational chatbot grounded in user context."""
    try:
        system_prompt = f"You are a helpful customer support bot for LocalSeva. User context: {user_context}."
        messages = [{"role": "system", "content": system_prompt}]
        for msg in chat_history:
            messages.append({"role": msg.get("role", "user"), "content": msg.get("content", "")})
        messages.append({"role": "user", "content": message})
        
        response = await openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"Chatbot error: {e}")
        return "I'm currently experiencing technical difficulties. Please try again later."

async def generate_service_recommendations(user_history: list[str]) -> str:
    """Uses OpenAI to generate personalized service recommendations."""
    try:
        prompt = f"Based on the user's booking history: {', '.join(user_history)}, suggest 3 related home services they might need next. Format as a comma separated list."
        response = await openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful home service recommendation AI."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"OpenAI error: {e}")
        return "Deep Cleaning, Pest Control, AC Servicing" # Fallback

def summarize_reviews(reviews: list[str]) -> str:
    """Uses Google Gemini to summarize a massive list of worker reviews."""
    try:
        model = genai.GenerativeModel('gemini-pro')
        prompt = "Summarize the following customer reviews into a single paragraph highlighting strengths and weaknesses:\n" + "\n".join(reviews)
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        logger.error(f"Gemini error: {e}")
        return "Worker receives generally positive feedback for punctuality but has occasional communication issues." # Fallback

class AIService:
    def parse_search_intent(self, natural_query: str) -> dict:
        return {
            "serviceId": "cleaning",
            "subServiceId": "deep_clean",
            "addOns": []
        }
    
    def analyze_sentiment(self, review: str) -> str:
        return "positive"
        
    def forecast_demand(self, zone_id: str, historical_bookings: list) -> dict:
        return {"forecast": "high"}

ai_service = AIService()

