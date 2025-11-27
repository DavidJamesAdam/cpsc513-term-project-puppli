from pydantic import BaseModel
from firebase_service import db

class PetCreate(BaseModel):
    userId: str
    name: str
    breed: str
    about: str
    birthday: str
    favouriteToy: str
    favouriteTreat: str

async def create_subprofile(pet: PetCreate):
    pets_collection = db.collection("pets")
    pet_ref = pets_collection.document()

    pet_data = {
        "userId": pet.userId,
        "name": pet.name,
        "breed": pet.breed,
        "about": pet.about,
        "birthday": pet.birthday,
        "favouriteToy": pet.favouriteToy,
        "favouriteTreat": pet.favouriteTreat,
    }

    pet_ref.set(pet_data)

    return {
        "id": pet_ref.id,
        **pet_data,
    }