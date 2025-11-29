from firebase_service import db
from fastapi import APIRouter, HTTPException

router = APIRouter()

#update pet info
#accepts a dict of fields with new values, not all fields need to be provided, just the ones that are changing

async def delete_pet(pet_id: str):

    try:
        #reference to pet in db
        doc_ref = db.collection('pets').document(pet_id)
        #actual pet object
        doc = doc_ref.get()

        if not doc.exists:
            raise HTTPException(status_code=404, detail="Pet not found")
        
        #delete the pet
        doc_ref.delete()

        return {"message": "Pet deleted successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting pet: {str(e)}")