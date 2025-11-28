from fastapi import APIRouter
from handlers.posts.getPosts import read_posts
from handlers.root import read_root
from handlers.users.getUser import read_users
from handlers.users.postUser import create_user, User
from handlers.posts.postVote import post_vote
from handlers.posts.rankGlobal import rank_global as rank_g
from handlers.posts.rankCity import rank_city as rank_c
from handlers.users.updateUser import get_user as get_u
from handlers.users.updateUser import update_user as update_u
from handlers.posts.rankProvince import rank_province as rank_p
from handlers.pets.createSubprofile import create_subprofile, PetCreate
from fastapi import APIRouter, Request

router = APIRouter()

@router.get("/")
def get_root():
    return read_root()

#user routes
# @router.get("/users")
# def get_users():
#     return read_users()

@router.post("/users")
async def post_user(user: User):
    return await create_user(user)

#TEMP
@router.get("/user/{user_id}")
async def get_user(user_id: str):
    return await get_u(user_id)


# posts created by user routes

@router.post("/posts/vote/{postId}")
async def posts_vote(postId: str):
    return await post_vote(postId)

@router.post("/profile")
async def post_profile(pet: PetCreate):
    return await create_subprofile(pet)

@router.patch("/user/update/{user_id}")
async def update_user(user_id: str, updated_fields: dict):
    return await update_u(user_id, updated_fields)

#rank routes
@router.get("/posts/rank/global")
async def rank_global():
    return await rank_g()

@router.get("/posts/rank/province/{location}")
async def rank_prov(location: str):
    return await rank_p(location)

@router.get("/posts/rank/city/{location}")
async def rank_city(location: str):
    return await rank_c(location)

