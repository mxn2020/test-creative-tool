# User Roles System Documentation

## Overview

User roles are stored separately from Better Auth's user system in a `UserPreference` collection/table. This allows us to extend user functionality without modifying Better Auth's schema.

## Data Storage

### Database: `geenius-template`
### Collection: `UserPreference`

**Schema:**
```javascript
{
  _id: ObjectId,
  userId: String,        // Better Auth user ID (matches user._id)
  role: String,          // "user" | "admin"
  theme: String,         // "light" | "dark" | "system"
  emailNotifications: Boolean,
  language: String,
  timezone: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Role Assignment Flow

### 1. Regular Users (Default Role: "user")

When a new user registers through Better Auth:
- Better Auth creates the user in the `user` collection
- No UserPreference is created immediately
- When the user logs in or when their role is checked:
  - The `/api/user-role/{userId}` endpoint is called
  - If no UserPreference exists, one is created with `role: "user"`
  - This happens in `api/user-role.ts` (lines 65-79)

### 2. Admin Users

Admin users are created through the `create-admin.ts` script:
1. User is registered via Better Auth's sign-up API
2. After successful registration, the script:
   - Connects directly to MongoDB
   - Creates/updates UserPreference with `role: "admin"`
   - See `scripts/create-admin.ts` (lines 67-83)

## Role Checking Process

### Frontend (AuthProvider)
1. When a user logs in, AuthProvider fetches their session
2. It then calls `ensureUserPreferences()` and `getUserRole()`
3. These functions call the `/api/user-role/{userId}` endpoint
4. The role is stored in React context for use throughout the app

### API Endpoint (`/api/user-role/{userId}`)
1. Looks up UserPreference by userId
2. If not found, creates one with default role "user"
3. Returns the role to the frontend

## Important Notes

1. **Better Auth Integration**: Better Auth manages users in the `user` collection. We don't modify this - we only reference users by their ID.

2. **Default Role**: All users get "user" role by default. Admin role must be explicitly set.

3. **Database Name**: The system uses `geenius-template` database, not `vite-react-mongo`.

4. **User ID Format**: Better Auth stores user IDs as the MongoDB `_id` field (ObjectId), but we reference them as strings in UserPreference.

## Troubleshooting

### User shows as "user" instead of "admin"
1. Check the UserPreference collection in MongoDB
2. Ensure the userId matches exactly (as a string)
3. Clear any API caching by restarting the dev server
4. Check that you're connecting to the correct database (`geenius-template`)

### Creating new admins
Run: `npm run admin:create`
This will:
1. Register a user through Better Auth
2. Set their role to "admin" in UserPreference
3. Verify the login works