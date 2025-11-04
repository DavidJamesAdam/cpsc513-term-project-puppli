import firebase_admin # type: ignore
from firebase_admin import credentials, firestore # type: ignore
import os

def initialize_firebase():
    """Initialize Firebase Admin SDK and return Firestore client"""
    try:
        # Get the path to the service account key
        cred_path = os.path.join(
            os.path.dirname(__file__),
            'keys',
            'puppli-422db-firebase-adminsdk-fbsvc-aead4d6c7c.json'
        )

        # Initialize Firebase Admin
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)

        print("Firebase Admin SDK initialized successfully")
        return firestore.client()
    except Exception as e:
        print(f"Error initializing Firebase: {e}")
        raise

# Initialize Firestore client
db = initialize_firebase()
