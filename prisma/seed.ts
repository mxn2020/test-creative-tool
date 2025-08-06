import { PrismaClient } from '@prisma/client';
import { MongoClient } from 'mongodb';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Better Auth manages users, so we'll seed app data that references user IDs
async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Connect to MongoDB directly for Better Auth user creation
    const mongoUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/geenius-template';
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db();

    // Create admin user directly in Better Auth's user collection
    console.log('Creating admin user...');
    const adminId = crypto.randomUUID();
    const adminUser = {
      id: adminId,
      email: 'admin@example.com',
      name: 'Admin User',
      emailVerified: true,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('user').deleteMany({ email: adminUser.email });
    await db.collection('user').insertOne(adminUser);

    // Create regular users
    console.log('Creating regular users...');
    const userIds = [];
    const users = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
      { name: 'Bob Wilson', email: 'bob@example.com' }
    ];

    for (const userData of users) {
      const userId = crypto.randomUUID();
      userIds.push(userId);
      
      await db.collection('user').deleteMany({ email: userData.email });
      await db.collection('user').insertOne({
        id: userId,
        email: userData.email,
        name: userData.name,
        emailVerified: true,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await client.close();

    // Seed user preferences with roles
    console.log('\nCreating user preferences...');
    
    // Admin preference
    await prisma.userPreference.upsert({
      where: { userId: adminId },
      update: { role: 'admin' },
      create: {
        userId: adminId,
        role: 'admin',
        theme: 'light',
        emailNotifications: true,
        language: 'en',
        timezone: 'UTC'
      }
    });

    // Regular user preferences
    for (const userId of userIds) {
      await prisma.userPreference.upsert({
        where: { userId },
        update: {},
        create: {
          userId,
          role: 'user',
          theme: 'light',
          emailNotifications: true,
          language: 'en',
          timezone: 'UTC'
        }
      });
    }

    // Seed categories
    console.log('Creating categories...');
    const categories = await Promise.all([
      prisma.category.create({
        data: { name: 'Technology', slug: 'technology', description: 'Tech related posts' }
      }),
      prisma.category.create({
        data: { name: 'Business', slug: 'business', description: 'Business and finance' }
      }),
      prisma.category.create({
        data: { name: 'Lifestyle', slug: 'lifestyle', description: 'Lifestyle and wellness' }
      })
    ]);

    // Seed posts
    console.log('Creating posts...');
    const posts = await Promise.all([
      prisma.post.create({
        data: {
          title: 'Getting Started with React 19',
          content: 'React 19 brings exciting new features including improved server components...',
          excerpt: 'Explore the latest features in React 19',
          authorId: userIds[0],
          published: true,
          categoryId: categories[0].id,
          tags: ['react', 'javascript', 'web-development']
        }
      }),
      prisma.post.create({
        data: {
          title: 'Building Scalable SaaS Applications',
          content: 'When building a SaaS application, scalability should be a primary concern...',
          excerpt: 'Best practices for SaaS architecture',
          authorId: adminId,
          published: true,
          categoryId: categories[1].id,
          tags: ['saas', 'architecture', 'business']
        }
      }),
      prisma.post.create({
        data: {
          title: 'The Future of AI in Web Development',
          content: 'AI is revolutionizing how we build web applications...',
          excerpt: 'How AI is changing web development',
          authorId: userIds[1],
          published: true,
          categoryId: categories[0].id,
          tags: ['ai', 'web-development', 'future']
        }
      })
    ]);

    // Seed comments
    console.log('Creating comments...');
    await Promise.all([
      prisma.comment.create({
        data: {
          content: 'Great article! Really helpful for understanding React 19.',
          postId: posts[0].id,
          authorId: userIds[1]
        }
      }),
      prisma.comment.create({
        data: {
          content: 'Thanks for sharing these insights on SaaS architecture.',
          postId: posts[1].id,
          authorId: userIds[0]
        }
      })
    ]);

    // Seed app settings
    console.log('Creating app settings...');
    await prisma.appSetting.create({
      data: {
        key: 'site_name',
        value: 'Geenius Template',
        description: 'The name of the website'
      }
    });

    await prisma.appSetting.create({
      data: {
        key: 'maintenance_mode',
        value: 'false',
        description: 'Whether the site is in maintenance mode'
      }
    });

    console.log('\n✅ Database seeded successfully!');
    console.log('\nCreated:');
    console.log('- 1 admin user (admin@example.com)');
    console.log('- 3 regular users');
    console.log('- 3 categories');
    console.log('- 3 posts');
    console.log('- 2 comments');
    console.log('- 2 app settings');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed
seedDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });