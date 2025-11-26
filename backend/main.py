from typing import Union, List, Dict, Any
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from firebase_service import db
from routers.root import router as root_router
from handlers.auth.login import router as auth_login_router
from handlers.auth.logout import router as auth_logout_router
from handlers.posts.getPosts import router as get_posts_router
from handlers.users.getUser import router as get_user_router
from handlers.users.postUser import router as post_user_router


@asynccontextmanager
async def lifespan(_app: FastAPI):
    """Lifespan event handler for startup and shutdown"""
    # Startup
    print("FastAPI application started")
    print("Firebase connection ready")
    yield
    # Shutdown (if needed in the future)
    print("Application shutting down")


app = FastAPI(lifespan=lifespan)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "http://localhost:3000"],  # React dev server ports
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(root_router)
app.include_router(auth_login_router)
app.include_router(auth_logout_router)
app.include_router(get_posts_router)
app.include_router(get_user_router)
app.include_router(post_user_router)


@app.get("/test", response_model=List[Dict[str, Any]])
async def get_test_collection():
    """
    Retrieve all documents from the 'test' collection
    Returns a list of all documents with their IDs
    """
    try:
        # Get all documents from 'test' collection
        docs = db.collection('test').stream()

        # Convert documents to dictionary format
        results = []
        for doc in docs:
            doc_data = doc.to_dict()
            doc_data['id'] = doc.id  # Include document ID
            results.append(doc_data)

        return results
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching data: {str(e)}")


@app.get("/test/{document_id}")
async def get_test_document(document_id: str):
    """
    Retrieve a specific document from the 'test' collection by ID
    """
    try:
        doc = db.collection('test').document(document_id).get()

        if doc.exists:
            doc_data = doc.to_dict()
            doc_data['id'] = doc.id  # type: ignore
            return doc_data
        else:
            raise HTTPException(status_code=404, detail="Document not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching document: {str(e)}")


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


class TestItem(BaseModel):
    test: str
    id: int


@app.post("/test")
async def post_test(item_id: TestItem):
    try:
        doc = db.collection('test').add(item_id.model_dump())
        return {"message": "Document added successfully"},
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error adding item: {str(e)}")
