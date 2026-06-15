import os
from celery import Celery
import logging
from app.services.ai_service import summarize_reviews

logger = logging.getLogger("servalocal.celery")

redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")

celery_app = Celery(
    "localseva_tasks",
    broker=redis_url,
    backend=redis_url
)

celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
)

@celery_app.task(bind=True)
def async_summarize_worker_reviews(self, worker_id: str, reviews: list[str]):
    """Background task to generate AI summary of worker reviews using Gemini."""
    logger.info(f"Starting review summarization for worker {worker_id}")
    try:
        summary = summarize_reviews(reviews)
        # In a real app, we would save this summary back to Firestore here
        # db.collection("workers").document(worker_id).update({"ai_summary": summary})
        logger.info(f"Successfully generated summary for worker {worker_id}")
        return summary
    except Exception as e:
        logger.error(f"Failed to generate review summary: {e}")
        return None
