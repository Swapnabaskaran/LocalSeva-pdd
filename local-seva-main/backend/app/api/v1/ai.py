from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from typing import Optional
from app.core.security import get_current_user
from app.models.schemas import AIChatQuery
from app.services.ai_service import generate_service_recommendations, chat_assistant
from app.tasks.celery_worker import async_summarize_worker_reviews
from app.core.firebase import db

router = APIRouter()

@router.post("/chat")
async def chat_with_ai_assistant(payload: AIChatQuery, current_user: dict = Depends(get_current_user)):
    """
    Conversational assistant powered by OpenAI.
    Context includes the user's details, active bookings, and wallet balance.
    """
    try:
        user_context = {
            "name": current_user.get("name", "User"),
            "role": current_user.get("role", "customer"),
            "walletBalance": current_user.get("walletBalance", 0.0)
        }
        
        chat_history = payload.context.get("history", []) if payload.context else []
        response = await chat_assistant(payload.message, chat_history, user_context)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Chat Service Error: {e}")

@router.get("/recommendations")
async def get_recommendations(current_user: dict = Depends(get_current_user)):
    """
    Get personalized service recommendations based on past bookings.
    """
    try:
        # Mocking user history for demonstration
        user_history = ["Plumbing", "Home Cleaning"]
        recommendations = await generate_service_recommendations(user_history)
        return {"recommendations": recommendations.split(',')}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendation Error: {e}")

@router.post("/workers/{worker_id}/summarize")
async def trigger_worker_summary(worker_id: str, current_user: dict = Depends(get_current_user)):
    """
    Triggers an asynchronous Celery task to summarize worker reviews using Google Gemini.
    Only accessible by Admins.
    """
    if current_user.get("role") not in ["admin", "superadmin"]:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    try:
        # Mocking reviews for demonstration
        reviews = [
            "Great service, arrived on time.",
            "Very professional but a bit expensive.",
            "Did a good job with the plumbing repair."
        ]
        
        # Dispatch Celery task
        task = async_summarize_worker_reviews.delay(worker_id, reviews)
        return {"message": "Summarization task queued", "task_id": task.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Summarization Error: {e}")
