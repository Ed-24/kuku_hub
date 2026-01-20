#!/usr/bin/env node

/**
 * Firebase Test Account Creator
 * Run: node scripts/create-test-account.js
 * 
 * Creates demo test accounts for KukuHub app testing
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Note: You need to download your Firebase service account key and set GOOGLE_APPLICATION_CREDENTIALS
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS 
  ? require(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  : null;

if (!serviceAccount) {
  console.log(`
❌ GOOGLE_APPLICATION_CREDENTIALS not set!

To create test accounts, you need to:
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Save it as firebase-key.json in your project root
4. Run: GOOGLE_APPLICATION_CREDENTIALS=./firebase-key.json node scripts/create-test-account.js
  `);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'young4chick'
});

const db = admin.firestore();
const auth = admin.auth();

async function createTestAccounts() {
  try {
    console.log('Creating test accounts...\n');

    // Test Buyer Account
    const buyerEmail = 'buyer.test@kukuhub.com';
    const buyerPassword = 'TestPassword123!';
    
    try {
      const buyerUser = await auth.createUser({
        email: buyerEmail,
        password: buyerPassword,
        displayName: 'Test Buyer'
      });

      await db.collection('users').doc(buyerUser.uid).set({
        uid: buyerUser.uid,
        email: buyerEmail,
        displayName: 'Test Buyer',
        userType: 'buyer',
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          phone: '+256700000000',
          address: '123 Test Street',
          city: 'Kampala',
          country: 'Uganda',
          profileImage: '',
          bio: 'Test buyer account'
        },
        isVerified: true
      });

      console.log('Buyer account created:');
      console.log(`   Email: ${buyerEmail}`);
      console.log(`   Password: ${buyerPassword}`);
      console.log(`   Role: Buyer\n`);
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        console.log('Buyer account already exists:');
        console.log(`   Email: ${buyerEmail}`);
        console.log(`   Password: ${buyerPassword}`);
        console.log(`   Role: Buyer\n`);
      } else {
        throw error;
      }
    }

    // Test Supplier Account
    const supplierEmail = 'supplier.test@kukuhub.com';
    const supplierPassword = 'TestPassword123!';

    try {
      const supplierUser = await auth.createUser({
        email: supplierEmail,
        password: supplierPassword,
        displayName: 'Test Supplier'
      });

      await db.collection('users').doc(supplierUser.uid).set({
        uid: supplierUser.uid,
        email: supplierEmail,
        displayName: 'Test Supplier',
        userType: 'supplier',
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          phone: '+256700000001',
          address: '456 Farm Road',
          city: 'Jinja',
          country: 'Uganda',
          profileImage: '',
          bio: 'Test supplier account'
        },
        isVerified: true
      });

      console.log('Supplier account created:');
      console.log(`   Email: ${supplierEmail}`);
      console.log(`   Password: ${supplierPassword}`);
      console.log(`   Role: Supplier\n`);
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        console.log('Supplier account already exists:');
        console.log(`   Email: ${supplierEmail}`);
        console.log(`   Password: ${supplierPassword}`);
        console.log(`   Role: Supplier\n`);
      } else {
        throw error;
      }
    }

    console.log('🎉 Test accounts ready! Use the credentials above to sign in.\n');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test accounts:', error.message);
    process.exit(1);
  }
}

createTestAccounts();
