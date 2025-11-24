from firebase_service import db
from fastapi import FastAPI, HTTPException

async def rank_global():
    
    try:
        # Get all documents from 'pets' collection
        docs = db.collection('pets').stream()

        # Convert documents to dictionary format
        results = []
        for doc in docs:
            doc_data = doc.to_dict()
            doc_data['id'] = doc.id  # Include document ID
            results.append(doc_data)

        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching pets: {str(e)}")