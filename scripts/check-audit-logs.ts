// scripts/check-audit-logs.ts
import { MongoClient } from 'mongodb';

const ADMIN_USER_ID = '688dc486a823dd5e2720760b';

async function checkAuditLogs() {
  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://localhost:27017/geenius-template";
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const auditLogCollection = db.collection('AuditLog');
    
    // Check if collection exists
    const collections = await db.listCollections({ name: 'AuditLog' }).toArray();
    console.log('AuditLog collection exists:', collections.length > 0);
    
    // Count total logs
    const totalCount = await auditLogCollection.countDocuments();
    console.log(`Total audit logs: ${totalCount}`);
    
    // Count logs for admin user
    const adminCount = await auditLogCollection.countDocuments({ userId: ADMIN_USER_ID });
    console.log(`Audit logs for admin user (${ADMIN_USER_ID}): ${adminCount}`);
    
    // Get action type distribution
    const actionTypes = await auditLogCollection.aggregate([
      { $group: { _id: '$action', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();
    
    console.log('\nAction type distribution:');
    actionTypes.forEach(({ _id, count }) => {
      console.log(`  ${_id}: ${count}`);
    });
    
    // Get recent logs for admin
    console.log('\nRecent audit logs for admin user:');
    const recentLogs = await auditLogCollection
      .find({ userId: ADMIN_USER_ID })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();
    
    if (recentLogs.length === 0) {
      console.log('  No audit logs found for admin user');
    } else {
      recentLogs.forEach(log => {
        const date = log.createdAt ? new Date(log.createdAt).toLocaleString() : 'Unknown date';
        console.log(`  - ${log.action} at ${date} from ${log.ip || 'Unknown IP'}`);
      });
    }
    
  } catch (error) {
    console.error('Error checking audit logs:', error);
  } finally {
    await client.close();
  }
}

// Run the checker
checkAuditLogs().catch(console.error);