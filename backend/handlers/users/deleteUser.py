from firebase_service import db
from fastapi import APIRouter, HTTPException, Request
from firebase_admin import auth
import json
import logging

router = APIRouter()
log = logging.getLogger(__name__)

# Should also delete all pets and posts associated with user
@router.delete("/users")
async def delete_user(request: Request):
    body = await request.json()
    docs = db.collection('users').stream()

    uid = body.get("uid")
    if not uid:
        raise HTTPException(status_code=400, detail="Missing 'uid' in request body")

    try:
        auth.delete_user(uid)
        return {"deleted": uid}
    except Exception as e:
        # log.exception("Error deleting user %s", uid)
        raise HTTPException(status_code=404, detail=str(e))
