from firebase_service import db
from fastapi import APIRouter, HTTPException, Depends
from firebase_admin import auth

router = APIRouter()

# Should also delete all pets and posts associated with user
@router.delete("/users")
def delete_user():
  user = auth.UserInfo

  auth.delete_user()
