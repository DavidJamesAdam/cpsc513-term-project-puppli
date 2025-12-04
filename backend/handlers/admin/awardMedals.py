from firebase_service import db
from fastapi import APIRouter, HTTPException
from fastapi.concurrency import run_in_threadpool
from collections import defaultdict

router = APIRouter()

@router.post("/admin/award-medals")
async def award_medals():
    """
    Award gold, silver, and bronze medals to top posts based on voteCount
    Uses Olympic-style tie handling
    - 1st place tie means 2 Gold, 1 Bronze. etc

    Also clears all users' votedPosts subcollections for the new day.
    """
    try:
        # Get all posts sorted by voteCount
        posts_ref = db.collection('posts')
        posts = await run_in_threadpool(posts_ref.stream)

        posts_list = []
        for post in posts:
            post_data = post.to_dict()
            post_data['id'] = post.id
            posts_list.append(post_data)

        # Sort by voteCount descending
        posts_list.sort(key=lambda x: x.get('voteCount', 0), reverse=True)

        if len(posts_list) == 0:
            return {"message": "No posts to award medals"}

        # Determine medal winners with Olympic tie handling
        medals = defaultdict(list)  # medal_type -> list of (userId, voteCount)

        # Group posts by voteCount to handle ties
        vote_groups = []
        current_votes = None
        current_group = []

        for post in posts_list:
            votes = post.get('voteCount', 0)
            user_id = post.get('userId')

            if votes != current_votes:
                if current_group:
                    vote_groups.append((current_votes, current_group))
                current_votes = votes
                current_group = [user_id]
            else:
                current_group.append(user_id)

        if current_group:
            vote_groups.append((current_votes, current_group))

        # Award medals with Olympic rules
        medal_types = ['gold', 'silver', 'bronze']
        medal_index = 0

        for votes, user_ids in vote_groups:
            if medal_index >= len(medal_types):
                break

            current_medal = medal_types[medal_index]

            # Award current medal to all tied users
            for user_id in user_ids:
                medals[current_medal].append(user_id)

            # Skip medals based on number of ties
            # If 2 people tie for gold, skip silver
            medal_index += len(user_ids)

        # Update user medal counts
        medal_summary = {"gold": 0, "silver": 0, "bronze": 0}

        for medal_type, user_ids in medals.items():
            field_name = f"total{medal_type.capitalize()}"

            for user_id in user_ids:
                user_ref = db.collection('users').document(user_id)
                await run_in_threadpool(
                    user_ref.update,
                    {field_name: db.field_path.FieldPath.increment(1)}
                )
                medal_summary[medal_type] += 1

        # Clear all users' votedPosts subcollections
        users_ref = db.collection('users')
        users = await run_in_threadpool(users_ref.stream)

        cleared_count = 0
        for user in users:
            voted_posts_ref = user.reference.collection('votedPosts')
            voted_docs = await run_in_threadpool(voted_posts_ref.stream)

            for voted_doc in voted_docs:
                await run_in_threadpool(voted_doc.reference.delete)
                cleared_count += 1

        return {
            "message": "Medals awarded successfully",
            "medals_awarded": medal_summary,
            "voted_posts_cleared": cleared_count
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error awarding medals: {str(e)}"
        )
