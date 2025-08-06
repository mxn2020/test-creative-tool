// api/admin-users.ts - Admin-only user management endpoints
import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { auditService } from "../src/lib/services/audit";
import { checkAdminAuth } from "./admin/_auth-check";

export const handler: Handler = async (event, _context) => {
  // Get origin for CORS
  const origin = event.headers.origin || 'http://localhost:8889';
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: '',
    };
  }

  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://localhost:27017/geenius-template";
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db();

    // Check admin authentication
    const authResult = await checkAdminAuth(event, db, origin);
    if (authResult.error) {
      return authResult.error;
    }

    const { userId: adminUserId } = authResult;

    // Parse the path to determine the endpoint
    const path = event.path
      .replace('/.netlify/functions/admin-users', '')
      .replace('/api/admin-users', '')
      .replace('.json', '');
    
    console.log('Admin Users API - Path parsing:', {
      originalPath: event.path,
      parsedPath: path,
      httpMethod: event.httpMethod
    });

    // GET /api/admin-users - List all users with pagination
    if (event.httpMethod === 'GET' && (!path || path === '')) {
      const params = event.queryStringParameters || {};
      const page = parseInt(params.page || '1', 10);
      const limit = parseInt(params.limit || '10', 10);
      const search = params.search || '';
      const role = params.role || '';
      const skip = (page - 1) * limit;

      // Build search query
      const searchQuery: any = {};
      if (search) {
        searchQuery.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }

      // Get users from Better Auth's user collection
      const users = await db.collection('user')
        .find(searchQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .toArray();

      // Get total count for pagination
      const totalCount = await db.collection('user').countDocuments(searchQuery);

      // Get user preferences for roles
      const userIds = users.map(u => u._id.toString());
      const preferences = await db.collection('UserPreference')
        .find({ userId: { $in: userIds } })
        .toArray();

      // Create a map for quick lookup
      const prefMap = new Map(preferences.map(p => [p.userId, p]));

      // Combine user data with preferences
      const enrichedUsers = users.map(user => {
        const pref = prefMap.get(user._id.toString());
        return {
          id: user._id.toString(),
          name: user.name || 'Unknown',
          email: user.email,
          role: pref?.role || 'user',
          createdAt: user.createdAt,
          lastActive: pref?.updatedAt || user.updatedAt || user.createdAt,
          emailVerified: user.emailVerified || false,
        };
      });

      // Filter by role if specified
      const filteredUsers = role 
        ? enrichedUsers.filter(u => u.role === role)
        : enrichedUsers;

      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          users: filteredUsers,
          pagination: {
            page,
            limit,
            totalCount: role ? filteredUsers.length : totalCount,
            totalPages: Math.ceil((role ? filteredUsers.length : totalCount) / limit),
          }
        }),
      };
    }

    // PATCH /api/admin-users/:userId - Update user
    if (event.httpMethod === 'PATCH' && path.startsWith('/')) {
      const userId = path.substring(1);
      
      if (!userId) {
        return {
          statusCode: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ error: 'User ID required' }),
        };
      }

      const updates = JSON.parse(event.body || '{}');
      const { role } = updates;

      if (role && !['user', 'admin'].includes(role)) {
        return {
          statusCode: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ error: 'Invalid role' }),
        };
      }

      // Update user preferences (role)
      if (role) {
        const oldUserPref = await db.collection('UserPreference').findOne({ userId });
        const oldRole = oldUserPref?.role || 'user';
        
        await db.collection('UserPreference').updateOne(
          { userId },
          { 
            $set: { 
              role,
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );
        
        // Log role change
        await auditService.logUserAction(adminUserId, 'role_changed', {
          targetUserId: userId,
          oldRole,
          newRole: role,
        }, event);
      }

      // Return updated user
      const { ObjectId } = await import('mongodb');
      let user;
      try {
        user = await db.collection('user').findOne({ _id: new ObjectId(userId) });
      } catch (e) {
        user = await db.collection('user').findOne({ _id: userId });
      }

      const preference = await db.collection('UserPreference').findOne({ userId });

      const updatedUser = {
        id: user._id.toString(),
        name: user.name || 'Unknown',
        email: user.email,
        role: preference?.role || 'user',
        createdAt: user.createdAt,
        lastActive: preference?.updatedAt || user.updatedAt || user.createdAt,
        emailVerified: user.emailVerified || false,
        preferences: preference || {
          theme: 'light',
          emailNotifications: true,
          language: 'en',
          timezone: 'UTC',
        },
      };

      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(updatedUser),
      };
    }

    // DELETE /api/admin-users/:userId - Delete user
    if (event.httpMethod === 'DELETE' && path.startsWith('/')) {
      const userId = path.substring(1);
      
      if (!userId) {
        return {
          statusCode: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ error: 'User ID required' }),
        };
      }

      const { ObjectId } = await import('mongodb');
      
      // Get user info before deletion for audit log
      let userToDelete;
      try {
        userToDelete = await db.collection('user').findOne({ _id: new ObjectId(userId) });
      } catch (e) {
        userToDelete = await db.collection('user').findOne({ _id: userId });
      }
      
      // Delete user from Better Auth's user collection
      try {
        await db.collection('user').deleteOne({ _id: new ObjectId(userId) });
      } catch (e) {
        await db.collection('user').deleteOne({ _id: userId });
      }

      // Delete related data
      await db.collection('UserPreference').deleteOne({ userId });
      await db.collection('session').deleteMany({ userId });
      await db.collection('account').deleteMany({ userId });
      
      // Delete user's posts and comments
      await db.collection('Post').deleteMany({ authorId: userId });
      await db.collection('Comment').deleteMany({ authorId: userId });
      
      // Log user deletion
      await auditService.logUserAction(adminUserId, 'user_deleted', {
        targetUserId: userId,
        targetUserEmail: userToDelete?.email,
        targetUserName: userToDelete?.name,
      }, event);

      return {
        statusCode: 204,
        headers: { 
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: '',
      };
    }

    return {
      statusCode: 404,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({ error: 'Not found' }),
    };

  } catch (error: any) {
    console.error('Admin Users API error:', error);
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    await client.close();
  }
};