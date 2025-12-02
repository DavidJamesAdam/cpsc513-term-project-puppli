from firebase_service import db
from fastapi import APIRouter, HTTPException
from google.cloud import firestore

router = APIRouter()

# favourite count increase
async def post_favourite(post_id: str):
    try:
        doc_ref = db.collection("posts").document(post_id)
        doc = doc_ref.get()

        if not doc.exists:
            raise HTTPException(status_code=404, detail="Post not found")

        data = doc.to_dict()
        current_favourites = data.get("favourites", 0)

        # increment favourite count
        doc_ref.update({"favouriteCount": firestore.Increment(1)})

        return {"message": "Favourite recorded successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error recording favourite: {str(e)}")
