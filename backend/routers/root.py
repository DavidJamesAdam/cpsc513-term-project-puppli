from fastapi import APIRouter
from handlers.posts.getPosts import read_posts
from handlers.root import read_root
from handlers.users.getUser import read_users
from handlers.users.postUser import create_user, User
from handlers.posts.postVote import post_vote
from handlers.pets.createSubprofile import create_subprofile, PetCreate
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
@router.get("/posts")
async def get_posts():
    return await read_posts()

@router.post("/posts/{postId}")
async def posts_vote(postId: str):
    return await post_vote(postId)

@router.post("/profile")
async def post_profile(pet: PetCreate):
    return await create_subprofile(pet)