from firebase_service import db
from fastapi import APIRouter, Request, HTTPException
from firebase_admin import auth

router = APIRouter()

@router.get("/pets")
async def get_pets(request: Request):
    """
    Retrieve all pets for the authenticated user
    """
    # Get session cookie and verify authentication
    session_cookie = request.cookies.get("session")
    if not session_cookie:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        # Verify session and get user ID
        decoded = auth.verify_session_cookie(session_cookie, check_revoked=True)
        user_id = decoded.get("uid")

        # Query pets collection filtered by userId
        docs = db.collection('pets').where('userId', '==', user_id).stream()

        results = []
        for doc in docs:
            pet_data = doc.to_dict()
            pet_data['id'] = doc.id
            results.append(pet_data)

        return results
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))