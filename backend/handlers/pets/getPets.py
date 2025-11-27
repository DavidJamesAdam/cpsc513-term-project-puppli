from firebase_service import db
from fastapi import FastAPI, HTTPException

async def get_pets():
    try:
        docs = db.collection('pets').stream()

        results = []
        for doc in docs:
            pet_list = doc.to_dict()
            pet_list['id'] = doc.id
            results.append(pet_list)

        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))