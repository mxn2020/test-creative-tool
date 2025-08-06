// api/sessions.ts
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
        'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: '',
    };
  }

  // Get session token from cookies
  const cookies = event.headers.cookie || '';
  let sessionTokenCookie = cookies.split(';')
    .find(c => c.trim().startsWith('better-auth.session_token='))
    ?.split('=')[1];
    
  // URL decode and extract just the token part (before the dot)
  let sessionToken: string | undefined;
  if (sessionTokenCookie) {
    sessionTokenCookie = decodeURIComponent(sessionTokenCookie);
    const tokenParts = sessionTokenCookie.split('.');
    sessionToken = tokenParts[0]; // Just the token, not the signature
  }

  if (!sessionToken) {
    return {
      statusCode: 401,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({ error: 'Not authenticated' }),
    };
  }

  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://localhost:27017/geenius-template";
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db();

    // Get current session to identify user
    const currentSession = await db.collection('session').findOne({ token: sessionToken });
    if (!currentSession) {
      return {
        statusCode: 401,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ error: 'Invalid session' }),
      };
    }

    const userId = currentSession.userId;

    // GET /api/sessions - List all user sessions
    if (event.httpMethod === 'GET') {
      const sessions = await db.collection('session')
        .find({ userId })
        .sort({ updatedAt: -1 })
        .toArray();

      const now = new Date();
      const enrichedSessions = sessions.map(session => {
        const isActive = new Date(session.expiresAt) > now;
        const isCurrent = session.token === sessionToken;
        
        // Parse user agent for device/browser info
        let device = 'Unknown Device';
        let browser = 'Unknown Browser';
        let os = 'Unknown OS';
        
        if (session.userAgent) {
          // Simple parsing - in real app, use a proper user agent parser
          if (session.userAgent.includes('Mobile')) {
            device = 'Mobile';
          } else if (session.userAgent.includes('Tablet')) {
            device = 'Tablet';
          } else {
            device = 'Desktop';
          }
          
          if (session.userAgent.includes('Chrome')) {
            browser = 'Chrome';
          } else if (session.userAgent.includes('Firefox')) {
            browser = 'Firefox';
          } else if (session.userAgent.includes('Safari')) {
            browser = 'Safari';
          } else if (session.userAgent.includes('Edge')) {
            browser = 'Edge';
          }
          
          if (session.userAgent.includes('Windows')) {
            os = 'Windows';
          } else if (session.userAgent.includes('Mac')) {
            os = 'macOS';
          } else if (session.userAgent.includes('Linux')) {
            os = 'Linux';
          } else if (session.userAgent.includes('Android')) {
            os = 'Android';
          } else if (session.userAgent.includes('iOS')) {
            os = 'iOS';
          }
        }

        return {
          id: session._id.toString(),
          active: isActive,
          current: isCurrent,
          createdAt: session.createdAt,
          updatedAt: session.updatedAt || session.createdAt,
          expiresAt: session.expiresAt,
          ipAddress: session.ipAddress || 'Unknown',
          userAgent: session.userAgent,
          device,
          browser,
          os,
          location: session.location || 'Unknown Location', // Would need geolocation service
        };
      });

      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ sessions: enrichedSessions }),
      };
    }

    // DELETE /api/sessions/:sessionId - Revoke specific session
    const path = event.path
      .replace('/.netlify/functions/sessions', '')
      .replace('/api/sessions', '')
      .replace('.json', '');
    
    if (event.httpMethod === 'DELETE' && path.startsWith('/')) {
      const sessionIdToRevoke = path.substring(1);
      
      if (sessionIdToRevoke === 'all-others') {
        // Revoke all sessions except current
        const result = await db.collection('session').deleteMany({
          userId,
          token: { $ne: sessionToken }
        });
        
        // Log the action
        await auditService.logUserAction(userId, 'sessions_revoked_all', {
          count: result.deletedCount,
        }, event);

        return {
          statusCode: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ 
            message: 'All other sessions revoked',
            count: result.deletedCount 
          }),
        };
      } else {
        // Revoke specific session
        const { ObjectId } = await import('mongodb');
        let result;
        
        try {
          // Don't allow revoking current session
          const sessionToRevoke = await db.collection('session').findOne({ 
            _id: new ObjectId(sessionIdToRevoke) 
          });
          
          if (sessionToRevoke && sessionToRevoke.token === sessionToken) {
            return {
              statusCode: 400,
              headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Credentials': 'true',
              },
              body: JSON.stringify({ error: 'Cannot revoke current session' }),
            };
          }

          result = await db.collection('session').deleteOne({ 
            _id: new ObjectId(sessionIdToRevoke),
            userId // Ensure user can only delete their own sessions
          });
        } catch (e) {
          // If not a valid ObjectId, try as string
          result = await db.collection('session').deleteOne({ 
            _id: sessionIdToRevoke,
            userId
          });
        }

        if (result.deletedCount === 0) {
          return {
            statusCode: 404,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': origin,
              'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({ error: 'Session not found' }),
          };
        }
        
        // Log the action
        await auditService.logUserAction(userId, 'session_revoked', {
          sessionId: sessionIdToRevoke,
        }, event);

        return {
          statusCode: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ message: 'Session revoked' }),
        };
      }
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
    console.error('Sessions API error:', error);
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