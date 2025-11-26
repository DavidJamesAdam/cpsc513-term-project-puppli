from fastapi import APIRouter, Request, HTTPException
from firebase_admin import auth

router = APIRouter()

@router.get("/auth/check")
def check_auth(request: Request):
    session_cookie = request.cookies.get("session")
    # if not session_cookie:
    #     raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        decoded = auth.verify_session_cookie(session_cookie, check_revoked=True)
        return {"status": "ok", "uid": decoded["uid"]}
    except Exception:
        raise HTTPException(status_code=401, detail="Not authenticated")