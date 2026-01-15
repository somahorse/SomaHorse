# Firebase Setup Guide

## Project Structure

```
soma-horse/
├── src/
│   ├── app/                    # Next.js app routes
│   │   ├── (marketing)/       # Public marketing pages
│   │   ├── (auth)/            # Authentication pages
│   │   └── (dashboard)/       # Protected dashboard routes
│   │       ├── talent/        # Talent portal
│   │       ├── client/         # Client portal
│   │       └── admin/          # Admin portal
│   │
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── config.ts      # Firebase initialization
│   │   │   ├── auth.ts        # Authentication functions
│   │   │   ├── firestore.ts   # Database operations
│   │   │   ├── storage.ts     # File storage operations
│   │   │   └── types.ts       # TypeScript types
│   │   │
│   │   └── hooks/
│   │       ├── useAuth.ts     # Authentication hook
│   │       ├── useTalent.ts   # Talent data hook
│   │       └── useClient.ts   # Client data hook
│   │
│   └── components/            # React components
│
├── firebase.json              # Firebase configuration
├── firestore.rules            # Firestore security rules
├── firestore.indexes.json     # Firestore indexes
├── storage.rules              # Storage security rules
└── .env.local                 # Environment variables (create this)
```

## Setup Instructions

### 1. Install Firebase

```bash
npm install firebase
```

### 2. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: "Somahorse Nexus"
4. Enable Google Analytics (optional)
5. Create project

### 3. Enable Firebase Services

#### Authentication
1. Go to Authentication > Get Started
2. Enable "Email/Password" sign-in method
3. Enable "Google" sign-in method (optional)

#### Firestore Database
1. Go to Firestore Database > Create database
2. Start in **test mode** (we'll update rules later)
3. Choose a location (closest to your users)

#### Storage
1. Go to Storage > Get Started
2. Start in **test mode**
3. Choose same location as Firestore

### 4. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click Web icon (`</>`)
4. Register app: "Somahorse Nexus Web"
5. Copy the config object

### 5. Set Environment Variables

Create `.env.local` file in root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 6. Deploy Security Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not done)
firebase init

# Deploy rules
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

## Database Collections Structure

### Collections:

1. **users/** - User accounts
   - `{userId}` - User document

2. **talent/** - Talent profiles
   - `{talentId}` - Talent document (same as userId)

3. **clients/** - Client profiles
   - `{clientId}` - Client document (same as userId)

4. **projects/** - Projects
   - `{projectId}` - Project document

5. **assessments/** - Talent assessments
   - `{assessmentId}` - Assessment document

6. **matches/** - Client-Talent matches
   - `{matchId}` - Match document

## Usage Examples

### Authentication

```typescript
import { signUp, signIn, logout } from '@/lib/firebase/auth';

// Sign up
await signUp({
  email: 'user@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe',
  role: 'talent'
});

// Sign in
await signIn({
  email: 'user@example.com',
  password: 'password123'
});

// Sign out
await logout();
```

### Using Hooks

```typescript
import { useAuth } from '@/lib/hooks/useAuth';
import { useTalent } from '@/lib/hooks/useTalent';

function MyComponent() {
  const { user, role, loading } = useAuth();
  const { talent, loading: talentLoading } = useTalent();

  if (loading) return <div>Loading...</div>;
  
  return <div>Welcome {user?.email}</div>;
}
```

### Firestore Operations

```typescript
import { 
  getTalentProfile, 
  updateTalentProfile,
  searchTalentBySkills 
} from '@/lib/firebase/firestore';

// Get talent profile
const talent = await getTalentProfile(userId);

// Update profile
await updateTalentProfile(userId, {
  skills: ['React', 'TypeScript']
});

// Search talent
const results = await searchTalentBySkills(['React', 'Node.js']);
```

### File Storage

```typescript
import { uploadProfilePicture, uploadPortfolio } from '@/lib/firebase/storage';

// Upload profile picture
const url = await uploadProfilePicture(file, userId);

// Upload portfolio
const url = await uploadPortfolio(file, userId, 'project.pdf');
```

## Next Steps

1. ✅ Firebase structure created
2. ⏳ Set up Firebase project
3. ⏳ Configure environment variables
4. ⏳ Deploy security rules
5. ⏳ Create authentication pages
6. ⏳ Build dashboard routes
7. ⏳ Implement protected routes middleware




