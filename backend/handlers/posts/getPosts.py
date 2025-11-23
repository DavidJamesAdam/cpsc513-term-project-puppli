from firebase_service import db
from fastapi import FastAPI, HTTPException

async def read_posts():
    """
    Retrieve all documents from the 'posts' collection
    Returns a list of all posts with their IDs
    """
    try:
        # Get all documents from 'posts' collection
        docs = db.collection('posts').stream()

        # Convert documents to dictionary format
        results = []
        for doc in docs:
            doc_data = doc.to_dict()
            doc_data['id'] = doc.id  # Include document ID
            results.append(doc_data)

        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching posts: {str(e)}")