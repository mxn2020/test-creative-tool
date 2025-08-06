// api/admin/_auth-check.ts
import { Context } from "@netlify/functions";
import { MongoClient, Db } from "mongodb";

export interface AuthCheckResult {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userId: string | null;
  error?: {
    statusCode: number;
    body: string;
    headers: Record<string, string>;
  };
}

/**
 * Check if the request is authenticated and has admin privileges
 * Returns early with error response if not authorized
 */
export async function checkAdminAuth(
  event: Context["event"],
  db: Db,
  origin: string
): Promise<AuthCheckResult> {
  // Get session token from cookies
  const cookies = event.headers.cookie || '';
  
  
  // Better Auth uses 'better-auth.session_token' cookie name
  let sessionTokenCookie = cookies.split(';')
    .find(c => c.trim().startsWith('better-auth.session_token='))
    ?.split('=')[1];
    
  // URL decode the cookie value
  if (sessionTokenCookie) {
    sessionTokenCookie = decodeURIComponent(sessionTokenCookie);
  }
  
  
  // Better Auth cookie format: "token.signature"
  // We only need the token part (before the dot) for database lookup
  let sessionToken: string | undefined;
  if (sessionTokenCookie) {
    const tokenParts = sessionTokenCookie.split('.');
    sessionToken = tokenParts[0]; // Just the token, not the signature
  }
  

  if (!sessionToken) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      userId: null,
      error: {
        statusCode: 401,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ error: 'Authentication required. Please log in.' }),
      }
    };
  }

  // Verify session
  const session = await db.collection('session').findOne({ 
    token: sessionToken,
    expiresAt: { $gt: new Date() } // Check if session is not expired
  });

  if (!session) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      userId: null,
      error: {
        statusCode: 401,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ error: 'Session expired. Please log in again.' }),
      }
    };
  }

  const userId = session.userId;
  
  // Convert ObjectId to string if necessary
  const userIdString = typeof userId === 'object' && userId.toString ? userId.toString() : userId;

  // Check if user has admin role
  const userPref = await db.collection('UserPreference').findOne({ userId: userIdString });
  const isAdmin = userPref?.role === 'admin';

  if (!isAdmin) {
    return {
      isAuthenticated: true,
      isAdmin: false,
      userId: userIdString,
      error: {
        statusCode: 403,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ error: 'Access denied. Admin privileges required.' }),
      }
    };
  }

  return {
    isAuthenticated: true,
    isAdmin: true,
    userId: userIdString
  };
}