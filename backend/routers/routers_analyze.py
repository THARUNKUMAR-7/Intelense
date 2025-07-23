from fastapi import APIRouter, Body, HTTPException
from utils.utils_nlp import process_texts

router = APIRouter(prefix="/analyze", tags=["Analyze"])

@router.post("/")
def analyze_text(data: dict = Body(...)):
    text_list = data.get("texts", [])
    print("/analyze received:", text_list)
    if not text_list or not isinstance(text_list, list):
        raise HTTPException(status_code=400, detail="A list of texts is required.")
    try:
        # Filter out empty or non-string items
        filtered = [t for t in text_list if isinstance(t, str) and t.strip()]
        print("Filtered texts:", filtered)
        result = process_texts(filtered)
        print("/analyze returning:", result)
        return result
    except Exception as e:
        print("Error in /analyze:", e)
        raise HTTPException(status_code=500, detail=str(e))
