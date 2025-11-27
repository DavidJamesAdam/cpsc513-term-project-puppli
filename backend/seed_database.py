"""
Database Seeding Script for Pet Social Media Application

This script populates Firestore with test data:
- 5 users with varying profiles
- 10 pets distributed across users
- 10 posts with varying engagement

Run with: python seed_database.py
"""

import random
from datetime import datetime, timedelta
from faker import Faker
from firebase_service import db

# ============================================================================
# CONFIGURATION CONSTANTS
# ============================================================================

# Canadian cities for user locations
LOCATIONS = [
    "Calgary, AB",
    "Vancouver, BC",
    "Toronto, ON",
    "Montreal, QC",
    "Edmonton, AB",
    "Ottawa, ON",
    "Winnipeg, MB",
    "Halifax, NS"
]

# Dog breeds
DOG_BREEDS = [
    "Golden Retriever", "Labrador Retriever", "German Shepherd",
    "French Bulldog", "Bulldog", "Poodle", "Beagle",
    "Rottweiler", "Dachshund", "Pembroke Welsh Corgi",
    "Australian Shepherd", "Siberian Husky", "Border Collie"
]


# Pet treats
FAVOURITE_TREATS = [
    "Peanut butter", "Chicken jerky", "Bacon strips",
    "Cheese cubes", "Sweet potato chews", "Salmon treats",
    "Freeze-dried liver", "Carrot sticks", "Apple slices",
    "Blueberries", "Tuna flakes", "Turkey bites"
]

# Pet toys (dog toys only)
FAVOURITE_TOYS = [
    "Tennis ball", "Rope toy", "Squeaky toy",
    "Frisbee", "Plush toy", "Puzzle feeder",
    "Kong toy", "Chew bone", "Crinkle ball"
]

# Pet image placeholders (using placeholder services)
def get_pet_image_url(index=0):
    """Generate placeholder image URL for dogs"""
    return f"https://placedog.net/500/500?id={index}"

# Post captions templates
POST_CAPTIONS = [
    "{name} at the park today!",
    "Look at this cutie {name}!",
    "{name} being adorable as always",
    "Afternoon walk with {name}",
    "{name}'s favorite spot",
    "Can't get enough of {name}",
    "{name} living their best life",
    "Happy {name}!",
    "Play time with {name}",
    "{name} enjoying the sunshine",
    "Best friends with {name}",
    "{name} says hello!"
]

# Award thresholds (based on vote counts)
GOLD_THRESHOLD = 80
SILVER_THRESHOLD = 50
BRONZE_THRESHOLD = 25

# Date range for posts (last 90 days)
DAYS_AGO = 90

# ============================================================================
# DATA GENERATION FUNCTIONS
# ============================================================================

fake = Faker()

def generate_username():
    """Generate a unique lowercase username"""
    adjectives = ["happy", "sunny", "clever", "sweet", "brave", "gentle", "playful"]
    nouns = ["paws", "whiskers", "buddy", "friend", "lover", "fan", "keeper"]
    return f"{random.choice(adjectives)}{random.choice(nouns)}{random.randint(1, 99)}"

def generate_user(user_index):
    """Generate a user document"""
    first_name = fake.first_name()
    last_name = fake.last_name()
    username = generate_username()

    return {
        "usernameLower": username.lower(),
        "email": f"{username}@example.com",
        "displayName": f"{first_name} {last_name}",
        "avatarUrl": f"https://i.pravatar.cc/150?u={username}",
        "bio": fake.sentence(nb_words=8),
        "location": random.choice(LOCATIONS),
        "totalGold": 0,  # Will be calculated after posts
        "totalSilver": 0,
        "totalBronze": 0,
        "notificationsEnabled": random.choice([True, False])
    }

def generate_pet(user_id, pet_index):
    """Generate a pet document"""
    breed = random.choice(DOG_BREEDS)

    # Generate birthday (1 month to 15 years ago)
    days_old = random.randint(30, 15 * 365)
    birthday = (datetime.now() - timedelta(days=days_old)).strftime("%Y-%m-%d")

    pet_names = [
        "Bella", "Max", "Luna", "Charlie", "Lucy", "Cooper", "Daisy",
        "Milo", "Bailey", "Buddy", "Sadie", "Rocky", "Molly", "Tucker",
        "Coco", "Bear", "Lola", "Duke", "Zoe", "Jack", "Maggie", "Oliver"
    ]

    return {
        "userId": user_id,
        "name": random.choice(pet_names),
        "breed": breed,
        "about": fake.sentence(nb_words=10)
        "birthday": birthday,
        "favouriteToy": random.choice(FAVOURITE_TOYS),
        "favouriteTreat": random.choice(FAVOURITE_TREATS),
    }

def generate_post(user_id, pet_id, pet_name, post_index):
    """Generate a post document"""
    # Random date within last DAYS_AGO days
    days_ago = random.randint(0, DAYS_AGO)
    created_at = datetime.now() - timedelta(days=days_ago)

    # Generate vote counts with realistic distribution
    # Most posts have low-medium votes, few have high votes
    vote_distribution = [
        (0, 20, 0.4),    # 40% of posts have 0-20 votes
        (21, 50, 0.3),   # 30% have 21-50 votes
        (51, 80, 0.2),   # 20% have 51-80 votes
        (81, 150, 0.1)   # 10% have 81-150 votes (viral posts)
    ]

    # Select vote range based on distribution
    rand = random.random()
    cumulative = 0
    vote_count = 0

    for min_votes, max_votes, probability in vote_distribution:
        cumulative += probability
        if rand <= cumulative:
            vote_count = random.randint(min_votes, max_votes)
            break

    # Favourite count is typically 20-40% of vote count
    favourite_count = int(vote_count * random.uniform(0.2, 0.4))

    caption = random.choice(POST_CAPTIONS).format(name=pet_name)

    return {
        "userId": user_id,
        "petId": pet_id,
        "imageUrl": get_pet_image_url(post_index),
        "caption": caption,
        "createdAt": created_at.isoformat() + "Z",
        "voteCount": vote_count,
        "favouriteCount": favourite_count
    }

def calculate_awards(vote_count):
    """Calculate award type based on vote count"""
    if vote_count >= GOLD_THRESHOLD:
        return "gold"
    elif vote_count >= SILVER_THRESHOLD:
        return "silver"
    elif vote_count >= BRONZE_THRESHOLD:
        return "bronze"
    return None

# ============================================================================
# MAIN SEEDING LOGIC
# ============================================================================

def seed_database():
    """Main function to seed the database"""
    print("Seeding database...")

    # User/Pet/Post distribution
    # user1: 1 pet -> 1 post
    # user2: 2 pets -> 0 posts
    # user3: 2 pets -> 1 post
    # user4: 2 pets -> 2 posts
    # user5: 3 pets -> 6 posts

    distribution = [
        {"pets": 1, "posts": 1},
        {"pets": 2, "posts": 0},
        {"pets": 2, "posts": 1},
        {"pets": 2, "posts": 2},
        {"pets": 3, "posts": 6}
    ]

    all_users = []
    all_pets = []
    all_posts = []

    pet_counter = 0
    post_counter = 0

    # Generate users, pets, and posts
    for user_index, config in enumerate(distribution, start=1):
        # Create user
        user_data = generate_user(user_index)
        user_ref = db.collection('users').document()
        user_id = user_ref.id

        # Create pets for this user
        user_pets = []
        for pet_index in range(config["pets"]):
            pet_counter += 1
            pet_data = generate_pet(user_id, pet_counter)
            pet_ref = db.collection('pets').document()
            pet_id = pet_ref.id

            user_pets.append({
                "id": pet_id,
                "data": pet_data,
                "ref": pet_ref
            })

        # Create posts for this user
        user_awards = {"gold": 0, "silver": 0, "bronze": 0}

        if config["posts"] > 0:
            # Distribute posts across user's pets
            for post_index in range(config["posts"]):
                post_counter += 1
                # Pick a random pet from this user's pets
                pet = random.choice(user_pets)

                post_data = generate_post(
                    user_id,
                    pet["id"],
                    pet["data"]["name"],
                    post_counter
                )
                post_ref = db.collection('posts').document()

                # Calculate awards
                award = calculate_awards(post_data["voteCount"])
                if award:
                    user_awards[award] += 1

                all_posts.append({
                    "ref": post_ref,
                    "data": post_data
                })

        # Update user with award totals
        user_data["totalGold"] = user_awards["gold"]
        user_data["totalSilver"] = user_awards["silver"]
        user_data["totalBronze"] = user_awards["bronze"]

        all_users.append({
            "ref": user_ref,
            "data": user_data
        })

        all_pets.extend(user_pets)

    # Write all data to Firestore
    for user in all_users:
        user["ref"].set(user["data"])

    for pet in all_pets:
        pet["ref"].set(pet["data"])

    for post in all_posts:
        post["ref"].set(post["data"])

    print(f"Created {len(all_users)} users, {len(all_pets)} pets, {len(all_posts)} posts")
    print("Database seeding completed")

if __name__ == "__main__":
    try:
        seed_database()
    except Exception as e:
        print(f"Error seeding database: {e}")
        raise
