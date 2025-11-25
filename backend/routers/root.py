from fastapi import APIRouter
from handlers.posts.getPosts import read_posts
from handlers.root import read_root
from handlers.users.getUser import read_users
from handlers.users.postUser import create_user, User
from handlers.posts.postVote import post_vote
from handlers.posts.rankGlobal import rank_global as rank_g
from handlers.posts.rankLocal import rank_local as rank_l
from fastapi import APIRouter, Request

router = APIRouter()

@router.get("/")
def get_root():
    return read_root()

#user routes
@router.get("/users")
def get_users():
    return read_users()

@router.post("/users")
async def post_user(user: User):
    return await create_user(user)

# posts created by user routes

@router.post("/posts/vote/{postId}")
async def posts_vote(postId: str):
    return await post_vote(postId)

#rank routes
@router.get("/posts/rank/global")
async def rank_global():
    return await rank_g()

@router.get("/posts/rank/local/{location}")
async def rank_local(location: str):
    return await rank_l(location)