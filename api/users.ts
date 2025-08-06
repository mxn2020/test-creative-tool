// api/users.ts
import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { auditService } from "../src/lib/services/audit";

export const handler: Handler = async (event, _context) => {
  // Get origin for CORS
  const origin = event.headers.origin || 'http://localhost:8889';
  
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
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

    // Parse the path to determine the endpoint
    const path = event.path
      .replace('/.netlify/functions/users', '')
      .replace('/api/users', '')
      .replace('.json', '');
    
    console.log('Users API - Path parsing:', {
      originalPath: event.path,
      parsedPath: path,
      httpMethod: event.httpMethod
    });

    // GET /api/users/:userId - Get single user
    if (event.httpMethod === 'GET' && path && path.startsWith('/')) {
      const pathParts = path.substring(1).split('/');
      const userId = pathParts[0];
      const isDetailsRequest = pathParts[1] === 'details';
      
      console.log('Single user request:', {
        userId,
        isDetailsRequest,
        pathParts
      });
      
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

      // Find user by ID
      const { ObjectId } = await import('mongodb');
      let user;
      try {
        user = await db.collection('user').findOne({ _id: new ObjectId(userId) });
      } catch (e) {
        // If not a valid ObjectId, try as string
        user = await db.collection('user').findOne({ _id: userId });
      }

      if (!user) {
        return {
          statusCode: 404,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ error: 'User not found' }),
        };
      }

      // Get user preferences
      const preference = await db.collection('UserPreference').findOne({ userId: user._id.toString() });

      // For basic request, just return user info
      if (!isDetailsRequest) {
        const basicUser = {
          id: user._id.toString(),
          name: user.name || 'Unknown',
          email: user.email,
          role: preference?.role || 'user',
          createdAt: user.createdAt,
          lastActive: preference?.updatedAt || user.updatedAt || user.createdAt,
          emailVerified: user.emailVerified || false,
          preferences: {
            theme: preference?.theme || 'light',
            emailNotifications: preference?.emailNotifications ?? true,
            language: preference?.language || 'en',
            timezone: preference?.timezone || 'UTC',
          }
        };

        console.log('Returning basic user data:', basicUser);

        return {
          statusCode: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify(basicUser),
        };
      }

      // For details request, include activity and sessions
      // Note: Better Auth stores userId as ObjectId in sessions, but as string in AuditLog
      const userIdString = user._id.toString();
      const { ObjectId: MongoObjectId } = await import('mongodb');
      
      const recentActivity = await db.collection('AuditLog')
        .find({ userId: userIdString })
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray();

      // Sessions might have userId as ObjectId (from Better Auth)
      const sessions = await db.collection('session')
        .find({ 
          $or: [
            { userId: userIdString },
            { userId: new MongoObjectId(userIdString) }
          ]
        })
        .sort({ createdAt: -1 })
        .toArray();
        
      console.log('User details query results:', {
        userId: userIdString,
        activityCount: recentActivity.length,
        sessionCount: sessions.length
      });

      const enrichedUser = {
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
        recentActivity: recentActivity.map(log => ({
          id: log._id.toString(),
          action: log.action,
          details: log.details || log.action,
          timestamp: log.createdAt,
          ip: log.ip,
        })),
        sessions: sessions.map(session => ({
          id: session._id.toString(),
          active: new Date(session.expiresAt) > new Date(),
          createdAt: session.createdAt,
          expiresAt: session.expiresAt,
          userAgent: session.userAgent || 'Unknown',
          ip: session.ip || 'Unknown',
        })),
      };

      console.log('Returning detailed user data with activity and sessions');

      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(enrichedUser),
      };
    }
    
    // GET /api/users - No longer supports listing all users (moved to admin API)
    if (event.httpMethod === 'GET' && (!path || path === '')) {
      return {
        statusCode: 403,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ error: 'User listing requires admin access. Use /api/admin-users instead.' }),
      };
    }

    // PATCH /api/users/:userId - No longer supported (moved to admin API)
    if (event.httpMethod === 'PATCH' && path.startsWith('/')) {
      return {
        statusCode: 403,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ error: 'User updates require admin access. Use /api/admin-users instead.' }),
      };
    }

    // DELETE /api/users/:userId - No longer supported (moved to admin API)
    if (event.httpMethod === 'DELETE' && path.startsWith('/')) {
      return {
        statusCode: 403,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ error: 'User deletion requires admin access. Use /api/admin-users instead.' }),
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
    console.error('Users API error:', error);
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