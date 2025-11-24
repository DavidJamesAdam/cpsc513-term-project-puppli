from firebase_service import db
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/users")
def read_users():
    try:
        # Get all documents from 'test' collection
        docs = db.collection('users').stream()

        # Convert documents to dictionary format
        results = []
        for doc in docs:
            doc_data = doc.to_dict()
            doc_data['id'] = doc.id  # Include document ID
            results.append(doc_data)

        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")
