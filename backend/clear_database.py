"""
Database Clearing Script for Pet Social Media Application

This script clears data from Firestore collections and Firebase Authentication.
Use with caution - this operation cannot be undone!

Usage:
    python clear_database.py              # Clear all collections + Firebase Auth (with confirmation)
    python clear_database.py users        # Clear only users collection + Firebase Auth
    python clear_database.py users pets   # Clear users and pets collections + Firebase Auth
    python clear_database.py --force      # Skip confirmation prompt
    python clear_database.py --no-auth    # Skip Firebase Auth deletion

Available collections: users, pets, posts
"""

import sys
from firebase_admin import auth
from firebase_service import db

# Available collections
COLLECTIONS = ['users', 'pets', 'posts']

def clear_collection(collection_name):
    """Delete all documents in a collection"""
    # Get all documents
    docs = db.collection(collection_name).stream()

    # Delete in batches of 500 (Firestore limit)
    batch = db.batch()
    count = 0
    total_deleted = 0

    for doc in docs:
        batch.delete(doc.reference)
        count += 1
        total_deleted += 1

        # Commit batch every 500 documents
        if count >= 500:
            batch.commit()
            batch = db.batch()
            count = 0

    # Commit remaining documents
    if count > 0:
        batch.commit()

    return total_deleted

def get_collection_counts():
    """Get document counts for all collections"""
    counts = {}
    for collection_name in COLLECTIONS:
        docs = list(db.collection(collection_name).stream())
        counts[collection_name] = len(docs)
    return counts

def confirm_deletion(collections_to_clear):
    """Ask user to confirm deletion"""
    print("WARNING: You are about to delete data from Firestore")

    counts = get_collection_counts()
    total = sum(counts[col] for col in collections_to_clear)
    print(f"Collections to clear: {', '.join(collections_to_clear)} ({total} documents)")

    response = input("Type 'yes' to continue: ").strip().lower()
    return response == 'yes'

def main():
    """Main function to clear database collections"""
    # Parse command line arguments
    args = sys.argv[1:]

    force = '--force' in args
    if force:
        args.remove('--force')

    # Determine which collections to clear
    if not args:
        # No arguments: clear all collections
        collections_to_clear = COLLECTIONS.copy()
    else:
        # Specific collections provided
        collections_to_clear = []
        for arg in args:
            if arg in COLLECTIONS:
                collections_to_clear.append(arg)
            else:
                print(f"Unknown collection: {arg}")
                print(f"Available collections: {', '.join(COLLECTIONS)}")
                sys.exit(1)

    # Confirm deletion (unless --force flag is used)
    if not force:
        if not confirm_deletion(collections_to_clear):
            print("Operation cancelled")
            sys.exit(0)

    # Clear collections
    print("Clearing collections...")
    total_deleted = 0

    for collection_name in collections_to_clear:
        deleted = clear_collection(collection_name)
        total_deleted += deleted

    print(f"Deleted {total_deleted} documents from {len(collections_to_clear)} collection(s)")
    print("Database clearing completed")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nOperation cancelled")
        sys.exit(1)
    except Exception as e:
        print(f"Error clearing database: {e}")
        raise
