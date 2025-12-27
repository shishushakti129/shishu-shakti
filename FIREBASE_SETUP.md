# Firebase Setup Guide

This guide will help you set up Firebase for the Shishu Shakti application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "shishu-shakti")
4. Follow the setup wizard

## Step 2: Enable Google Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Google**
3. Enable it and add your project support email
4. Save the changes

## Step 3: Create Firestore Database

1. Go to **Firestore Database** in Firebase Console
2. Click "Create database"
3. Start in **test mode** (we'll add security rules later)
4. Choose a location for your database

## Step 4: Set Up Firestore Collections

Create the following collections manually or they will be created automatically when data is added:

### Collection: `affirmations`

Structure:

```
affirmations/
  {affirmationId}/
    mood: string (one of: "overwhelmed", "tired", "anxious", "lonely", "hopeful", "calm")
    imageUrl: string (Firebase Storage URL)
    title: string (optional)
    createdAt: timestamp
```

### Collection: `blogs`

Structure:

```
blogs/
  {blogId}/
    title: string
    excerpt: string
    content: string (HTML)
    imageUrl: string (optional, Firebase Storage URL)
    isFree: boolean
    createdAt: timestamp
```

### Collection: `letters`

Structure:

```
letters/
  {letterId}/
    title: string
    content: string (HTML)
    week: number
    isFree: boolean
    createdAt: timestamp
```

### Collection: `users` (auto-created)

This collection is automatically created when users sign in. Structure:

```
users/
  {userId}/
    uid: string
    email: string
    createdAt: timestamp
    role: string ("free" or "subscriber")
    affirmationViews: number (optional)
    blogViews: number (optional)
    letterViews: number (optional)
```

## Step 5: Set Up Firebase Storage

1. Go to **Storage** in Firebase Console
2. Click "Get started"
3. Start in **test mode** (we'll add security rules later)
4. Choose a location (same as Firestore is recommended)

### Upload Affirmation Images

1. Create folders for each mood in Storage:

   - `affirmations/overwhelmed/`
   - `affirmations/tired/`
   - `affirmations/anxious/`
   - `affirmations/lonely/`
   - `affirmations/hopeful/`
   - `affirmations/calm/`

2. Upload images to the appropriate folders
3. Copy the download URL for each image
4. Add documents to the `affirmations` collection with the `imageUrl` field

## Step 6: Get Firebase Configuration

1. Go to **Project Settings** (gear icon) > **General**
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname
5. Copy the Firebase configuration object

## Step 7: Add Configuration to Your App

1. Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

2. Replace the values with your actual Firebase configuration

## Step 8: Set Up Firestore Security Rules

Go to **Firestore Database** > **Rules** and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Anyone can read affirmations, blogs, and letters
    match /affirmations/{document=**} {
      allow read: if true;
      allow write: if false; // Admin only - use Firebase Admin SDK
    }

    match /blogs/{document=**} {
      allow read: if true;
      allow write: if false; // Admin only
    }

    match /letters/{document=**} {
      allow read: if true;
      allow write: if false; // Admin only
    }
  }
}
```

## Step 9: Set Up Storage Security Rules

Go to **Storage** > **Rules** and add:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read access to all images
    match /{allPaths=**} {
      allow read: if true;
      allow write: if false; // Admin only
    }
  }
}
```

## Step 10: Add Sample Data (Optional)

You can add sample data through the Firebase Console or use the Firebase Admin SDK. Here's an example structure for a blog:

```javascript
{
  title: "Welcome to Your Journey",
  excerpt: "A gentle introduction to mindful motherhood",
  content: "<p>Welcome to Shishu Shakti...</p>",
  isFree: true,
  createdAt: Timestamp.now()
}
```

## Testing

1. Start your development server: `npm run dev`
2. Try signing in with Google
3. Check Firestore to see if a user document was created
4. Test viewing affirmations, blogs, and letters

## Troubleshooting

- **Authentication not working**: Make sure Google Sign-In is enabled in Firebase Console
- **Permission denied errors**: Check your Firestore and Storage security rules
- **Images not loading**: Verify Storage rules allow read access and image URLs are correct
- **Collection not found**: Collections are created automatically when you add documents

## Next Steps

- Add content through Firebase Console or Admin SDK
- Customize security rules based on your needs
- Set up Firebase Hosting for production deployment
- Consider adding Firebase Analytics for usage tracking
