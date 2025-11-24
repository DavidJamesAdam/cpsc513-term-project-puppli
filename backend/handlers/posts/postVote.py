from firebase_service import db
from fastapi import APIRouter, HTTPException
from google.cloud import firestore

router = APIRouter()

# vote count increase
async def post_vote(post_id: str):
    try:
        doc_ref = db.collection("posts").document(post_id)
        doc = doc_ref.get()

        if not doc.exists:
            raise HTTPException(status_code=404, detail="Post not found")

        data = doc.to_dict()
        current_votes = data.get("votes", 0)

        # increment vote count
        doc_ref.update({"voteCount": firestore.Increment(1)})

        return {"message": "Vote recorded successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error recording vote: {str(e)}")