from firebase_service import db
from fastapi import FastAPI, HTTPException

#vote count increase
async def post_vote(post_id: str):
    try:
        post = db.collection('posts').child(post_id).get()
        if post.val() is None:
            raise HTTPException(status_code=404, detail="Post not found")
        post.update({"votes": post.val().get("votes", 0) + 1})
        return {"message": "Vote recorded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error recording vote: {str(e)}")