// scripts/test-api-direct.ts
// Test the API logic directly
// Run with: npx tsx scripts/test-api-direct.ts

import { MongoClient } from 'mongodb';

async function testApiLogic() {
  const mongoUri = "mongodb://localhost:27017/geenius-template";
  const client = new MongoClient(mongoUri);
  const userId = '688dbe1a5673c320639c89fa';

  try {
    await client.connect();
    const db = client.db();
    
    console.log('Testing API logic for userId:', userId);
    
    // Find user preferences - exact same query as API
    const userPref = await db.collection('UserPreference').findOne({ userId });
    
    console.log('\nQuery result:');
    console.log('Found:', Boolean(userPref));
    if (userPref) {
      console.log('Role:', userPref.role);
      console.log('Full document:', userPref);
    }
    
    // Test with different query approaches
    console.log('\n\nTesting different queries:');
    
    // Query 1: Exact string match
    const q1 = await db.collection('UserPreference').findOne({ userId: userId });
    console.log('1. String match found:', Boolean(q1), q1?.role);
    
    // Query 2: Count documents
    const count = await db.collection('UserPreference').countDocuments({ userId });
    console.log('2. Count with userId:', count);
    
    // Query 3: Find all and filter
    const all = await db.collection('UserPreference').find({}).toArray();
    console.log('3. Total documents:', all.length);
    const matching = all.filter(p => p.userId === userId);
    console.log('   Matching userId:', matching.length);
    if (matching.length > 0) {
      console.log('   Matching role:', matching[0].role);
    }
    
  } catch (error: any) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

testApiLogic();