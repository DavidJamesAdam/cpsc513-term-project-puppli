"""
Database Seeding Script for Pet Social Media Application

This script populates Firebase Authentication and Firestore with test data:
- 5 users with Firebase Auth accounts and Firestore profiles
- 1-2 pets per user in the pets collection
- At least 1 post per pet (max 10 posts total to match available images)
- Strategic location distribution for diverse city/provincial rankings

Run with: python seed_database.py
"""

import random
from datetime import datetime, timedelta
from faker import Faker
from firebase_admin import auth
from firebase_service import db

# ============================================================================
# CONFIGURATION CONSTANTS
# ============================================================================

# Firebase Storage image URLs
FIREBASE_STORAGE_IMAGES = [
    "https://firebasestorage.googleapis.com/v0/b/puppli-422db.firebasestorage.app/o/posts%2Fcute.jpg?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/puppli-422db.firebasestorage.app/o/posts%2Fcutie.jpg?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/puppli-422db.firebasestorage.app/o/posts%2Fdalm.jpg?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/puppli-422db.firebasestorage.app/o/posts%2Fdoggo.jpg?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/puppli-422db.firebasestorage.app/o/posts%2Fdoggy.jpg?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/puppli-422db.firebasestorage.app/o/posts%2Ffluffy.jpg?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/puppli-422db.firebasestorage.app/o/posts%2Fhuskie.jpg?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/puppli-422db.firebasestorage.app/o/posts%2Fhusky.jpg?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/puppli-422db.firebasestorage.app/o/posts%2Fpupp.jpg?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/puppli-422db.firebasestorage.app/o/posts%2Fpupper.jpg?alt=media"
]

def get_pet_image_url(index=0):
    """Get a Firebase Storage image URL for posts"""
    return FIREBASE_STORAGE_IMAGES[index % len(FIREBASE_STORAGE_IMAGES)]

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
    "{name} says hello!",
    "Weekend vibes with {name}",
    "Adventure time!"
]

# ============================================================================
# TEST USER DATA
# ============================================================================

TEST_USERS = [
    {
        "email": "alice.johnson@example.com",
        "password": "AlicePass123!",
        "displayName": "Alice Johnson",
        "userName": "alice.johnson",
        "bio": "Dog lover and outdoor enthusiast. Living life one paw print at a time!"
    },
    {
        "email": "bob.smith@example.com",
        "password": "BobPass123!",
        "displayName": "Bob Smith",
        "userName": "bob.smith",
        "bio": "Proud dog dad. Software engineer by day, dog park regular by evening."
    },
    {
        "email": "charlie.brown@example.com",
        "password": "CharliePass123!",
        "displayName": "Charlie Brown",
        "userName": "charlie.brown",
        "bio": "Adventure seeker with my furry companions. Photography and hiking lover."
    },
    {
        "email": "diana.prince@example.com",
        "password": "DianaPass123!",
        "displayName": "Diana Prince",
        "userName": "diana.prince",
        "bio": "Rescue dog advocate. Every dog deserves a loving home and endless treats."
    },
    {
        "email": "ethan.hunt@example.com",
        "password": "EthanPass123!",
        "displayName": "Ethan Hunt",
        "userName": "ethan.hunt",
        "bio": "Weekend warrior and full-time dog enthusiast. Life is better with dogs."
    }
]

# ============================================================================
# DATA GENERATION FUNCTIONS
# ============================================================================

fake = Faker()

def create_firebase_user(email, password, display_name):
    """Create a user in Firebase Authentication"""
    try:
        user = auth.create_user(
            email=email,
            password=password,
            display_name=display_name
        )
        print(f"  ✓ Created Firebase Auth user: {email} (UID: {user.uid})")
        return user.uid
    except auth.EmailAlreadyExistsError:
        # If user already exists, get their UID
        user = auth.get_user_by_email(email)
        print(f"  ⚠ User already exists: {email} (UID: {user.uid})")
        return user.uid
    except Exception as e:
        print(f"  ✗ Error creating Firebase Auth user {email}: {e}")
        raise

def generate_firestore_user(uid, user_data, user_index):
    """Generate a Firestore user document with strategic location assignment"""
    # Strategic location assignment to create diverse rankings:
    # User 1-2: Calgary, Alberta (same city, same province)
    # User 3: Edmonton, Alberta (different city, same province)
    # User 4-5: Vancouver, British Columbia (different province)
    location_strategy = {
        1: "Calgary, Alberta",
        2: "Calgary, Alberta",
        3: "Edmonton, Alberta",
        4: "Vancouver, British Columbia",
        5: "Vancouver, British Columbia"
    }

    return {
        "uid": uid,
        "email": user_data["email"],
        "displayName": user_data["displayName"],
        "userName": user_data["userName"],
        "bio": user_data["bio"],
        "location": location_strategy[user_index],  # Fixed location for each user
        "createdAt": datetime.now()
    }

# Fixed pet data (up to 10 unique pets with deterministic attributes)
FIXED_PETS = [
    {"name": "Bella", "breed": "Golden Retriever", "toy": "Tennis ball", "treat": "Peanut butter", "age_days": 730},
    {"name": "Max", "breed": "German Shepherd", "toy": "Rope toy", "treat": "Chicken jerky", "age_days": 1095},
    {"name": "Luna", "breed": "Siberian Husky", "toy": "Frisbee", "treat": "Salmon treats", "age_days": 365},
    {"name": "Charlie", "breed": "Labrador Retriever", "toy": "Kong toy", "treat": "Bacon strips", "age_days": 1825},
    {"name": "Lucy", "breed": "French Bulldog", "toy": "Squeaky toy", "treat": "Cheese cubes", "age_days": 548},
    {"name": "Cooper", "breed": "Beagle", "toy": "Puzzle feeder", "treat": "Turkey bites", "age_days": 912},
    {"name": "Daisy", "breed": "Pembroke Welsh Corgi", "toy": "Plush toy", "treat": "Sweet potato chews", "age_days": 1460},
    {"name": "Milo", "breed": "Poodle", "toy": "Chew bone", "treat": "Apple slices", "age_days": 456},
    {"name": "Bailey", "breed": "Australian Shepherd", "toy": "Crinkle ball", "treat": "Blueberries", "age_days": 1200},
    {"name": "Buddy", "breed": "Border Collie", "toy": "Ball launcher", "treat": "Carrot sticks", "age_days": 2190}
]

def generate_pet(user_id, pet_index):
    """Generate a pet document with fixed attributes"""
    # Use fixed pet data based on index
    pet_template = FIXED_PETS[pet_index % len(FIXED_PETS)]

    # Calculate birthday from fixed age
    birthday = (datetime.now() - timedelta(days=pet_template["age_days"])).strftime("%Y-%m-%d")

    return {
        "userId": user_id,
        "name": pet_template["name"],
        "breed": pet_template["breed"],
        "about": fake.sentence(nb_words=12),
        "birthday": birthday,
        "favouriteToy": pet_template["toy"],
        "favouriteTreat": pet_template["treat"]
    }

def generate_post(user_id, pet_id, pet_name, post_index):
    """Generate a post document"""
    # Random date within last 90 days
    days_ago = random.randint(0, 90)
    created_at = datetime.now() - timedelta(days=days_ago)

    # Generate vote counts with realistic distribution
    vote_distribution = [
        (0, 20, 0.4),    # 40% of posts have 0-20 votes
        (21, 50, 0.3),   # 30% have 21-50 votes
        (51, 80, 0.2),   # 20% have 51-80 votes
        (81, 150, 0.1)   # 10% have 81-150 votes
    ]

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
        "favouriteCount": favourite_count,
        "favouritedBy": [],  # Empty initially
        "comments": []  # Empty initially
    }

# ============================================================================
# MAIN SEEDING LOGIC
# ============================================================================

def seed_database():
    """Main function to seed the database"""
    print("\n" + "="*70)
    print("SEEDING DATABASE WITH FIREBASE AUTH + FIRESTORE")
    print("="*70 + "\n")

    all_users = []
    all_pets = []
    all_posts = []

    # Create users in Firebase Auth and Firestore
    print("Creating users...\n")
    for i, user_data in enumerate(TEST_USERS, start=1):
        print(f"User {i}/5: {user_data['displayName']}")

        # Create user in Firebase Authentication
        uid = create_firebase_user(
            user_data["email"],
            user_data["password"],
            user_data["displayName"]
        )

        # Generate Firestore user document
        firestore_user_data = generate_firestore_user(uid, user_data, i)

        # Store user reference with UID as document ID
        user_ref = db.collection('users').document(uid)
        all_users.append({
            "ref": user_ref,
            "data": firestore_user_data,
            "uid": uid
        })

        print(f"  ✓ Created Firestore user document\n")

    # Create pets for each user (1-2 pets per user)
    print("Creating pets...\n")
    pet_counter = 0
    post_counter = 0  # Separate counter for posts to cycle through images
    MAX_POSTS = len(FIREBASE_STORAGE_IMAGES)  # Limit posts to available images (10)

    for user in all_users:
        num_pets = random.randint(1, 2)  # 1-2 pets per user
        user_pets = []

        print(f"Creating {num_pets} pet(s) for {user['data']['displayName']}:")

        for _ in range(num_pets):
            pet_data = generate_pet(user["uid"], pet_counter)
            pet_ref = db.collection('pets').document()
            pet_id = pet_ref.id
            pet_counter += 1

            user_pets.append({
                "id": pet_id,
                "data": pet_data,
                "ref": pet_ref
            })

            print(f"  ✓ Pet: {pet_data['name']} ({pet_data['breed']})")

        all_pets.extend(user_pets)

        # Create at least one post per pet, but don't exceed MAX_POSTS total
        if post_counter >= MAX_POSTS:
            print(f"  Maximum posts ({MAX_POSTS}) reached, skipping post creation\n")
            continue

        posts_remaining = MAX_POSTS - post_counter
        # Ensure each pet gets at least 1 post, then add random extras
        num_posts = min(len(user_pets), posts_remaining)
        print(f"  Creating {num_posts} post(s) (1 per pet)...")

        # Create one post for each pet first
        for pet in user_pets:
            if post_counter >= MAX_POSTS:
                break

            post_data = generate_post(
                user["uid"],
                pet["id"],
                pet["data"]["name"],
                post_counter
            )
            post_ref = db.collection('posts').document()

            all_posts.append({
                "ref": post_ref,
                "data": post_data
            })

            post_counter += 1

        print(f"  ✓ Created {num_posts} post(s)\n")

    # Write all data to Firestore
    print("Writing to Firestore...\n")

    print(f"Writing {len(all_users)} users...")
    for user in all_users:
        user["ref"].set(user["data"])
    print(f"✓ Users written\n")

    print(f"Writing {len(all_pets)} pets...")
    for pet in all_pets:
        pet["ref"].set(pet["data"])
    print(f"✓ Pets written\n")

    print(f"Writing {len(all_posts)} posts...")
    for post in all_posts:
        post["ref"].set(post["data"])
    print(f"✓ Posts written\n")

    print("="*70)
    print(f"DATABASE SEEDING COMPLETED SUCCESSFULLY!")
    print("="*70)
    print(f"\nSummary:")
    print(f"  • {len(all_users)} users (Firebase Auth + Firestore)")
    print(f"  • {len(all_pets)} pets")
    print(f"  • {len(all_posts)} posts")
    print(f"\nTest Account Credentials:")
    print("-" * 70)
    for user_data in TEST_USERS:
        print(f"  Email: {user_data['email']}")
        print(f"  Password: {user_data['password']}")
        print()

if __name__ == "__main__":
    try:
        seed_database()
    except Exception as e:
        print(f"\n✗ Error seeding database: {e}")
        raise
