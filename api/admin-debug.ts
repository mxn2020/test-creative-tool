// api/admin-debug.ts - Debug endpoint for system information
import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { checkAdminAuth } from "./admin/_auth-check";

export const handler: Handler = async (event, context) => {
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

    console.log('=== DEBUG FUNCTION START ===');
    console.log('✅ Function is executing');
    console.log('📍 Path:', event.path);
    console.log('🔧 Method:', event.httpMethod);
    
    // Test environment variables
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? '[SET]' : '[NOT_SET]',
      DATABASE_URL: process.env.DATABASE_URL ? '[SET]' : '[NOT_SET]',
      MONGODB_URI: process.env.MONGODB_URI ? '[SET]' : '[NOT_SET]',
      NETLIFY_SITE_URL: process.env.NETLIFY_SITE_URL,
    };
    
    console.log('🌍 Environment Variables:', envCheck);
    
    // Test import
    let authImportTest;
    try {
      const authModule = await import("../src/lib/auth");
      authImportTest = {
        imported: true,
        hasAuth: !!authModule.auth,
        hasHandler: !!(authModule.auth && authModule.auth.handler),
        authType: typeof authModule.auth,
      };
      console.log('📦 Auth Import Test:', authImportTest);
    } catch (importError) {
      authImportTest = {
        imported: false,
        error: importError.message,
      };
      console.error('❌ Auth Import Failed:', importError);
    }
    
    // Test database connection (if possible)
    let dbTest = { attempted: false };
    if (process.env.DATABASE_URL || process.env.MONGODB_URI) {
      try {
        // You could add a simple MongoDB connection test here
        dbTest = { attempted: true, connectionString: 'present' };
      } catch (dbError) {
        dbTest = { attempted: true, error: dbError.message };
      }
    }
    
    const response = {
      success: true,
      message: 'Debug function working',
      timestamp: new Date().toISOString(),
      environment: envCheck,
      authImport: authImportTest,
      database: dbTest,
      netlifyInfo: {
        functionName: context.functionName,
        functionVersion: context.functionVersion,
        memoryLimit: context.memoryLimitInMB,
        remainingTime: context.getRemainingTimeInMillis(),
      }
    };
    
    console.log('✅ Debug Response:', response);
    console.log('=== DEBUG FUNCTION END ===');
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(response, null, 2),
    };
    
  } catch (error) {
    console.error('💥 Debug Function Error:', error);
    console.error('Error Stack:', error.stack);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      }, null, 2),
    };
  } finally {
    await client.close();
  }
};
