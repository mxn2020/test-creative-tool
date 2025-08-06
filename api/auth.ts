// api/auth.ts
import { Handler } from "@netlify/functions";
import { auth } from "../src/lib/auth";

export const handler: Handler = async (event, _context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    const origin = event.headers.origin || 'http://localhost:5176' || 'http://localhost:8889';
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Cookie',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: '',
    };
  }

  try {
    console.log('🚀 Auth API called:', {
      method: event.httpMethod,
      path: event.path,
      origin: event.headers.origin,
      userAgent: event.headers['user-agent'],
    });

    const url = new globalThis.URL(event.rawUrl);
    const request = new globalThis.Request(url.toString(), {
      method: event.httpMethod,
      headers: event.headers as globalThis.HeadersInit,
      body: event.body ? event.body : undefined,
    });

    console.log('📤 Processing auth request...');
    const response = await auth.handler(request);
    
    console.log('📥 Auth response status:', response.status);
    
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    // Add CORS headers to all responses
    const origin = event.headers.origin || 'http://localhost:5176' || 'http://localhost:8889';
    const corsHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Cookie',
    };

    const responseBody = await response.text();
    
    if (response.status >= 400) {
      console.log('❌ Auth error response:', {
        status: response.status,
        body: responseBody.substring(0, 500), // Log first 500 chars
      });
    }

    return {
      statusCode: response.status,
      headers: {
        ...responseHeaders,
        ...corsHeaders,
      },
      body: responseBody,
    };
    
  } catch (error: any) {
    console.log('💥 Auth handler error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    
    const origin = event.headers.origin || 'http://localhost:5176' || 'http://localhost:8889';
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Cookie',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message,
      }),
    };
  }
};