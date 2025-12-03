"""
Database Seeding Script for Pet Social Media Application

This script populates Firebase Authentication and Firestore with test data:
- 5 users with Firebase Auth accounts and Firestore profiles
- Up to 2 pets per user in the pets collection
- Posts with varying engagement in the posts collection

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

# Canadian cities for user locations
LOCATIONS = [
    "Calgary, Alberta",
    "Edmonton, Alberta",
    "Vancouver, British Columbia",
    "Winnipeg, Manitoba",
    "Saint John, New Brunswick",
    "Labrador City, Newfoundland and Labrador",
    "Yellowknife, Northwest Territories",
    "Halifax, Nova Scotia",
    "Iqaluit, Nunavut",
    "Toronto, Ontario",
    "Ottawa, Ontario",
    "Charlottetown, Prince Edward Island",
    "Montreal, Quebec",
    "Saskatoon, Saskatchewan",
    "Whitehorse, Yukon",
    "Athabasca, Alberta",
    "Red Deer, Alberta",
    "Lethbridge, Alberta"
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
    "Blueberries", "Tuna flakes", "Turkey bites",
    "Chilli flakes", "Beef strips"
]

# Pet toys (dog toys only)
FAVOURITE_TOYS = [
    "Tennis ball", "Rope toy", "Squeaky toy",
    "Frisbee", "Plush toy", "Puzzle feeder",
    "Kong toy", "Chew bone", "Crinkle ball",
    "Puzzle Feeder", "Ball launcher"
]

# Pet image placeholders
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

def generate_firestore_user(uid, user_data):
    """Generate a Firestore user document"""
    return {
        "uid": uid,
        "email": user_data["email"],
        "displayName": user_data["displayName"],
        "userName": user_data["userName"],
        "bio": user_data["bio"],
        "location": random.choice(LOCATIONS),
        "createdAt": datetime.now()
    }

def generate_pet(user_id):
    """Generate a pet document"""
    # Generate birthday (1 month to 15 years ago)
    days_old = random.randint(30, 15 * 365)
    birthday = (datetime.now() - timedelta(days=days_old)).strftime("%Y-%m-%d")

    pet_names = [
        "Bella", "Max", "Luna", "Charlie", "Lucy", "Cooper", "Daisy",
        "Milo", "Bailey", "Buddy", "Sadie", "Rocky", "Molly", "Tucker",
        "Coco", "Bear", "Lola", "Duke", "Zoe", "Jack", "Maggie", "Oliver",
        "Ticker", "Shadow", "Pepper", "Rusty", "Ginger"
    ]

    return {
        "userId": user_id,
        "name": random.choice(pet_names),
        "breed": random.choice(DOG_BREEDS),
        "about": fake.sentence(nb_words=12),
        "birthday": birthday,
        "favouriteToy": random.choice(FAVOURITE_TOYS),
        "favouriteTreat": random.choice(FAVOURITE_TREATS)
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
        firestore_user_data = generate_firestore_user(uid, user_data)

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
    for user in all_users:
        num_pets = random.randint(1, 2)  # 1-2 pets per user
        user_pets = []

        print(f"Creating {num_pets} pet(s) for {user['data']['displayName']}:")

        for _ in range(num_pets):
            pet_counter += 1
            pet_data = generate_pet(user["uid"])
            pet_ref = db.collection('pets').document()
            pet_id = pet_ref.id

            user_pets.append({
                "id": pet_id,
                "data": pet_data,
                "ref": pet_ref
            })

            print(f"  ✓ Pet: {pet_data['name']} ({pet_data['breed']})")

        all_pets.extend(user_pets)

        # Create 1-3 posts for this user (from their pets)
        num_posts = random.randint(1, 3)
        print(f"  Creating {num_posts} post(s)...")

        for post_idx in range(num_posts):
            pet_counter += 1
            pet = random.choice(user_pets)

            post_data = generate_post(
                user["uid"],
                pet["id"],
                pet["data"]["name"],
                pet_counter
            )
            post_ref = db.collection('posts').document()

            all_posts.append({
                "ref": post_ref,
                "data": post_data
            })

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
