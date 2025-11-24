from fastapi import APIRouter
from handlers.auth.login import loginUser
from handlers.posts.getPosts import read_posts
from handlers.root import read_root
from handlers.users.getUser import read_users
from handlers.users.postUser import create_user, User
from fastapi import APIRouter, Request

router = APIRouter()

@router.get("/")
def get_root():
    return read_root()

@router.post('/auth/login')
def post_user(request: Request):
    return loginUser(request)
