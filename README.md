# Shishu Shakti

A mindful motherhood and emotional wellbeing platform for new mothers and mothers of infants/toddlers.

## Features

- **Mood-Aware Affirmations**: Personalized affirmations based on how you're feeling
- **Thoughtful Blogs**: Articles on motherhood, self-care, and emotional wellness
- **Weekly Letters**: Warm, personal letters to support your journey
- **Soft Gating**: Gentle content access without aggressive paywalls
- **Google Sign-In**: Simple authentication with Google
- **Fully Responsive**: Mobile-first design that works on all devices

## Tech Stack

- **React.js** with TypeScript
- **React Router DOM** for routing
- **Tailwind CSS** + **DaisyUI** for styling
- **Firebase** (Authentication, Firestore, Storage)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase project with:
  - Authentication (Google Sign-In enabled)
  - Firestore database
  - Storage bucket

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd shishu-sakthi
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Firebase project credentials:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Firebase Setup

### Firestore Collections

The app expects the following Firestore collections:

1. **users** (auto-created on sign-in)

   - `uid`: string
   - `email`: string
   - `createdAt`: timestamp
   - `role`: "free" | "subscriber"
   - `affirmationViews`: number
   - `blogViews`: number
   - `letterViews`: number

2. **affirmations**

   - `mood`: "overwhelmed" | "tired" | "anxious" | "lonely" | "hopeful" | "calm"
   - `imageUrl`: string (Firebase Storage URL)
   - `title`: string (optional)
   - `createdAt`: timestamp

3. **blogs**

   - `title`: string
   - `excerpt`: string
   - `content`: string (HTML)
   - `imageUrl`: string (optional, Firebase Storage URL)
   - `isFree`: boolean
   - `createdAt`: timestamp

4. **letters**
   - `title`: string
   - `content`: string (HTML)
   - `week`: number
   - `isFree`: boolean
   - `createdAt`: timestamp

### Firebase Storage

Upload affirmation images to Firebase Storage and use the download URLs in the `affirmations` collection.

### Firestore Security Rules

Example security rules (adjust as needed):

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
      allow write: if false; // Admin only
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

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Layout.tsx
│   ├── SoftGate.tsx
│   └── SkeletonLoader.tsx
├── config/          # Configuration files
│   └── firebase.ts
├── contexts/        # React contexts
│   └── AuthContext.tsx
├── hooks/           # Custom hooks
│   └── useUsageLimit.ts
├── pages/           # Page components
│   ├── Home.tsx
│   ├── Affirmations.tsx
│   ├── Blogs.tsx
│   ├── Letters.tsx
│   ├── Login.tsx
│   └── NotFound.tsx
├── types/           # TypeScript types
│   └── index.ts
├── App.tsx          # Main app component with routing
└── main.tsx         # Entry point
```

## Design System

The app uses a custom DaisyUI theme with soft, calming colors:

- **Primary**: Soft sage green (#9CAF88)
- **Secondary**: Muted peach (#E8B4A0)
- **Accent**: Warm rose (#D4A5A5)
- **Base**: Off-white (#FAF9F6)

## Content Gating

- **Guests**: Limited free content (10 affirmations, 2 blogs, 1 letter)
- **Logged-in users**: Unlimited access to all content
- **Future**: Ready for subscription-based access with role-based permissions

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

[Your License Here]
# shishu-shakti
