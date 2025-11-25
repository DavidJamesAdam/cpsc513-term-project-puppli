from firebase_service import db
from fastapi import FastAPI, HTTPException
async def rank_local(user_location: str):
        
    try:
        # Get all documents from 'posts' collection
        docs = db.collection('posts').stream()

        # Convert documents to dictionary format
        results = []
        for doc in docs:
            doc_data = doc.to_dict()
            post_user = doc_data['UserId']
            post_user = db.collection('users').document(post_user).get().to_dict()
            post_location = post_user['location'].split(',')[0]
            #match 'location' to user's 'location' 
            if str(post_location) in str(user_location):
                doc_data['id'] = doc.id  # Include document ID
                results.append(doc_data)
        
        #sort from highest to lowest number of votes
        results.sort(key=lambda x: x.get('voteCount', 0), reverse=True)

        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching posts: {str(e)}")