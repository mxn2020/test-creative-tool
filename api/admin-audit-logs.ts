// api/admin-audit-logs.ts
import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
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
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

    const { userId, isAdmin } = authResult;

    if (event.httpMethod === 'GET') {
      const params = event.queryStringParameters || {};
      const page = parseInt(params.page || '1', 10);
      const limit = parseInt(params.limit || '50', 10);
      const skip = (page - 1) * limit;
      
      // Build query
      const query: any = {};
      
      // Admin can filter by specific user
      if (params.userId) {
        query.userId = params.userId;
      }
      
      // Filter by action
      if (params.action) {
        query.action = params.action;
      }
      
      // Filter by date range
      if (params.startDate || params.endDate) {
        query.createdAt = {};
        if (params.startDate) {
          query.createdAt.$gte = new Date(params.startDate);
        }
        if (params.endDate) {
          query.createdAt.$lte = new Date(params.endDate);
        }
      }
      
      // Get logs and count
      const [logs, totalCount] = await Promise.all([
        db.collection('AuditLog')
          .find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .toArray(),
        db.collection('AuditLog').countDocuments(query)
      ]);
      
      // For admin view, enrich logs with user information
      const enrichedLogs = await Promise.all(logs.map(async (log) => {
        if (isAdmin && log.userId) {
          const { ObjectId } = await import('mongodb');
          let user;
          try {
            user = await db.collection('user').findOne({ _id: new ObjectId(log.userId) });
          } catch (e) {
            user = await db.collection('user').findOne({ _id: log.userId });
          }
          
          return {
            ...log,
            userName: user?.name || 'Unknown',
            userEmail: user?.email || log.userId,
          };
        }
        return log;
      }));

      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          logs: enrichedLogs,
          pagination: {
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
          },
          isAdmin,
        }),
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
    console.error('Audit logs API error:', error);
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