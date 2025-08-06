// api/admin-stats.ts
import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { checkAdminAuth } from "./admin/_auth-check";

export const handler: Handler = async (event, _context) => {
  // Get origin for CORS - support both Vite and Netlify dev servers
  const origin = event.headers.origin || 'http://localhost:5176' || 'http://localhost:8889';
  
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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
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

    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get total users
    const totalUsers = await db.collection('user').countDocuments();

    // Get admin users
    const adminCount = await db.collection('UserPreference')
      .countDocuments({ role: 'admin' });

    // Get verified users
    const verifiedUsers = await db.collection('user')
      .countDocuments({ emailVerified: true });

    // Get active sessions (not expired)
    const activeSessions = await db.collection('session')
      .countDocuments({ expiresAt: { $gt: now } });

    // Get users active in last 24 hours (by session activity)
    const activeUserIds = await db.collection('session')
      .distinct('userId', {
        updatedAt: { $gte: oneDayAgo },
        expiresAt: { $gt: now }
      });
    const activeUsers = activeUserIds.length;

    // Get content stats
    const totalPosts = await db.collection('Post').countDocuments();
    const publishedPosts = await db.collection('Post')
      .countDocuments({ published: true });
    const totalComments = await db.collection('Comment').countDocuments();
    const totalCategories = await db.collection('Category').countDocuments();

    // Get recent activity stats
    const recentPosts = await db.collection('Post')
      .countDocuments({ createdAt: { $gte: oneDayAgo } });
    const recentComments = await db.collection('Comment')
      .countDocuments({ createdAt: { $gte: oneDayAgo } });

    // Get user growth data (users created per day for last 7 days)
    const userGrowth = await db.collection('user').aggregate([
      {
        $match: {
          createdAt: { $gte: oneWeekAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();

    // Get activity timeline (last 10 activities)
    const recentActivities = [];
    
    // Get recent registrations
    const recentRegistrations = await db.collection('user')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    
    recentRegistrations.forEach(user => {
      recentActivities.push({
        type: 'user_registration',
        description: `New user registered: ${user.name || user.email}`,
        timestamp: user.createdAt,
        icon: 'user-plus',
        color: 'green'
      });
    });

    // Sort activities by timestamp
    recentActivities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // System health metrics
    const systemHealth = {
      database: {
        status: 'healthy',
        responseTime: 45, // Mock value
        percentage: 95
      },
      api: {
        status: 'healthy',
        responseTime: 32, // Mock value
        percentage: 98
      },
      errorRate: {
        value: 0.1,
        percentage: 99
      }
    };

    const stats = {
      users: {
        total: totalUsers,
        active: activeUsers,
        verified: verifiedUsers,
        admins: adminCount,
        activeSessions
      },
      content: {
        posts: totalPosts,
        publishedPosts,
        comments: totalComments,
        categories: totalCategories,
        recentPosts,
        recentComments
      },
      growth: {
        userGrowth: userGrowth.map(item => ({
          date: item._id,
          count: item.count
        }))
      },
      recentActivities: recentActivities.slice(0, 10),
      systemHealth
    };

    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(stats),
    };

  } catch (error: any) {
    console.error('Admin stats API error:', error);
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