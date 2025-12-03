from fastapi import APIRouter
from handlers.posts.getPosts import read_posts
from handlers.root import read_root
from handlers.users.getUser import read_users
from handlers.users.postUser import create_user, User
from handlers.posts.postVote import post_vote
from handlers.posts.postFavourite import post_favourite
from handlers.posts.rankGlobal import rank_global as rank_g
from handlers.posts.rankCity import rank_city as rank_c
from handlers.users.updateUser import update_user as update_u
from handlers.posts.rankProvince import rank_province as rank_p
from handlers.pets.createSubprofile import create_subprofile, PetCreate
from handlers.pets.updatePet import update_pet as update_p
from handlers.pets.getPetByID import get_pet as get_p
from handlers.pets.deleteSubprofile import delete_pet as delete_p
from handlers.auth.updateEmail import update_email, EmailUpdate
from handlers.posts.getUserPosts import get_posts as get_user_posts
from handlers.auth.updatePassword import update_password, PassUpdate 
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

'''
for updating email and password, the JSON request body should have the following keys:
{
    "id_token": "user's Firebase ID token",
    "new_email": "new email address"  # or "new_password": "new password"
}
'''

@router.post("/user/update-email")
async def post_update_email(request: Request):
    data = await request.json()
    update = EmailUpdate(**data)
    return update_email(update)

@router.post("/user/update-password")
async def post_update_pass(request: Request):
    data = await request.json()
    update = PassUpdate(**data)
    return update_password(update)

# posts created by user routes

@router.post("/posts/vote/{postId}")
async def posts_vote(postId: str):
    return await post_vote(postId)

@router.post("/posts/favourite/{postId}")
async def posts_favourite(postId: str, request: Request):
    return await post_favourite(postId, request)

@router.post("/profile")
async def post_profile(pet: PetCreate):
    return await create_subprofile(pet)

@router.get("/user/posts")
async def get_user_posts_route(request: Request):
    return await get_user_posts(request)

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

#pet routes

@router.patch("/pet/update/{pet_id}")
async def update_pet(pet_id: str, updated_fields: dict):
    return await update_p(pet_id, updated_fields)

@router.delete("/pet/delete/{pet_id}")
async def delete_pet(pet_id: str):
    return await delete_p(pet_id)

@router.get("/pet/{pet_id}")
async def get_pet(pet_id: str):
    return await get_p(pet_id)