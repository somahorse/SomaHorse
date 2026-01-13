# Firebase Project Structure

## Complete File Structure

```
soma-horse/
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # Public marketing pages
│   │   │   ├── page.tsx              # Home
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── industries/
│   │   │   └── contact/
│   │   │
│   │   ├── (auth)/                   # Authentication pages
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── signup/client/
│   │   │
│   │   └── (dashboard)/              # Protected dashboard routes
│   │       ├── talent/               # Talent portal
│   │       │   ├── dashboard/
│   │       │   ├── profile/
│   │       │   ├── projects/
│   │       │   ├── assessments/
│   │       │   └── earnings/
│   │       │
│   │       ├── client/                # Client portal
│   │       │   ├── dashboard/
│   │       │   ├── projects/
│   │       │   ├── talent-search/
│   │       │   └── invoices/
│   │       │
│   │       └── admin/                 # Admin portal
│   │           ├── dashboard/
│   │           ├── talent-management/
│   │           ├── client-management/
│   │           └── analytics/
│   │
│   ├── lib/
│   │   ├── firebase/                 # Firebase SDK
│   │   │   ├── config.ts             # Initialize Firebase
│   │   │   ├── auth.ts               # Auth functions
│   │   │   ├── firestore.ts          # Database operations
│   │   │   ├── storage.ts            # File storage
│   │   │   ├── types.ts              # TypeScript types
│   │   │   └── index.ts              # Barrel export
│   │   │
│   │   └── hooks/                    # React hooks
│   │       ├── useAuth.ts            # Auth state hook
│   │       ├── useTalent.ts          # Talent data hook
│   │       ├── useClient.ts          # Client data hook
│   │       └── index.ts              # Barrel export
│   │
│   └── components/                   # React components
│       ├── Navbar.tsx
│       ├── ServiceModal.tsx
│       └── SuccessModal.tsx
│
├── firebase.json                      # Firebase config
├── firestore.rules                    # Firestore security rules
├── firestore.indexes.json             # Firestore indexes
├── storage.rules                      # Storage security rules
├── .env.local                         # Environment variables
└── package.json
```

## Firebase Collections Structure

### 1. `users/` Collection
```typescript
{
  id: string (userId)
  email: string
  firstName: string
  lastName: string
  role: "talent" | "client" | "admin"
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### 2. `talent/` Collection
```typescript
{
  id: string (same as userId)
  userId: string
  skills: string[]
  experience: "junior" | "intermediate" | "senior" | "advanced"
  role?: string
  certifications: string[]
  projects: string[] (project IDs)
  earnings: number
  linkedin?: string
  portfolio?: string
  about?: string
  country?: string
  availability?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### 3. `clients/` Collection
```typescript
{
  id: string (same as userId)
  userId: string
  companyName: string
  projects: string[] (project IDs)
  country?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### 4. `projects/` Collection
```typescript
{
  id: string
  clientId: string
  talentIds: string[]
  title: string
  description: string
  status: "draft" | "active" | "completed" | "cancelled"
  deliverables: string[]
  timeline: {
    startDate: Timestamp
    endDate: Timestamp
  }
  budget?: number
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### 5. `assessments/` Collection
```typescript
{
  id: string
  talentId: string
  challenge: string
  submission: string
  score?: number
  certified: boolean
  createdAt: Timestamp
  completedAt?: Timestamp
}
```

### 6. `matches/` Collection
```typescript
{
  id: string
  clientId: string
  talentId: string
  projectId?: string
  compatibilityScore: number
  matchedAt: Timestamp
}
```

## Storage Structure

```
firebase-storage/
├── profiles/
│   └── {userId}/
│       └── avatar
│
├── portfolios/
│   └── {userId}/
│       └── {fileName}
│
├── assessments/
│   └── {assessmentId}/
│       └── {fileName}
│
└── projects/
    └── {projectId}/
        └── {fileName}
```

## Import Examples

### Simple Imports (Recommended)
```typescript
// Using barrel exports
import { signUp, signIn, logout } from '@/lib/firebase';
import { useAuth, useTalent } from '@/lib/hooks';
```

### Specific Imports
```typescript
// Direct imports
import { auth, db, storage } from '@/lib/firebase/config';
import { getTalentProfile } from '@/lib/firebase/firestore';
import { useAuth } from '@/lib/hooks/useAuth';
```

## Key Features

✅ **Authentication** - Email/password, Google sign-in
✅ **User Management** - Role-based access (talent, client, admin)
✅ **Real-time Data** - Firestore real-time listeners
✅ **File Storage** - Portfolios, profiles, assessments
✅ **Security Rules** - Firestore and Storage rules configured
✅ **TypeScript** - Full type safety
✅ **React Hooks** - Custom hooks for data fetching
✅ **Scalable** - Ready for production

## Next Development Steps

1. **Protected Routes** - Create middleware for route protection
2. **Dashboard Pages** - Build talent/client dashboards
3. **Forms Integration** - Connect existing forms to Firebase
4. **Real-time Updates** - Add real-time listeners for live data
5. **Cloud Functions** - Add server-side logic (matching, assessments)


