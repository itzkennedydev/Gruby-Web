/**
 * Direct test of the product sync functionality
 * Run with: node test-sync.js
 */

require('dotenv').config({ path: '.env.local' });

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Simple product search - just verify we can connect to Kroger API
async function testKrogerAPI() {
  console.log('Testing Kroger API connection...');
  
  const clientId = process.env.NEXT_PUBLIC_KROGER_CLIENT_ID || process.env.KROGER_CLIENT_ID;
  const clientSecret = process.env.KROGER_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    console.error('Kroger credentials not found in .env.local');
    console.error('Looking for: NEXT_PUBLIC_KROGER_CLIENT_ID and KROGER_CLIENT_SECRET');
    return false;
  }
  
  console.log('✓ Kroger credentials found');
  
  // Test authentication
  try {
    const authResponse = await fetch('https://api.kroger.com/v1/connect/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials&scope=product.compact',
    });
    
    const authData = await authResponse.json();
    
    if (authData.access_token) {
      console.log('✓ Successfully authenticated with Kroger API');
      return authData.access_token;
    } else {
      console.error('✗ Failed to authenticate:', authData);
      return false;
    }
  } catch (error) {
    console.error('✗ Error connecting to Kroger API:', error.message);
    return false;
  }
}

// Test Firebase connection
async function testFirebase() {
  console.log('\nTesting Firebase connection...');
  
  try {
    const snapshot = await db.collection('recipes').limit(1).get();
    
    if (snapshot.empty) {
      console.log('✗ No recipes found in Firebase');
      return false;
    }
    
    const recipe = snapshot.docs[0].data();
    console.log('✓ Successfully connected to Firebase');
    console.log(`  Found recipe: ${recipe.title}`);
    console.log(`  Ingredients: ${recipe.ingredients?.length || 0}`);
    
    return true;
  } catch (error) {
    console.error('✗ Error connecting to Firebase:', error.message);
    return false;
  }
}

// Search for a product
async function searchProduct(token, query, locationId) {
  try {
    const url = `https://api.kroger.com/v1/products?filter.term=${encodeURIComponent(query)}&filter.locationId=${locationId}&filter.limit=1`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      const product = data.data[0];
      console.log(`  ✓ Found: ${product.description}`);
      console.log(`    Product ID: ${product.productId}`);
      if (product.items && product.items[0]?.price) {
        console.log(`    Price: $${product.items[0].price.regular || product.items[0].price.promo}`);
      }
      return product;
    } else {
      console.log(`  ✗ No products found for "${query}"`);
      return null;
    }
  } catch (error) {
    console.error(`  ✗ Error searching for "${query}":`, error.message);
    return null;
  }
}

// Test product search
async function testProductSearch(token) {
  console.log('\nTesting product search...');
  
  const testIngredients = ['pasta', 'tomato sauce', 'chicken breast'];
  const locationId = '01400943'; // Columbus, OH
  
  for (const ingredient of testIngredients) {
    await searchProduct(token, ingredient, locationId);
    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
  }
  
  return true;
}

// Main test function
async function runTests() {
  console.log('=== Product Sync API Test ===\n');
  
  // Test Kroger API
  const token = await testKrogerAPI();
  if (!token) {
    console.log('\n❌ Kroger API test failed');
    process.exit(1);
  }
  
  // Test Firebase
  const firebaseOk = await testFirebase();
  if (!firebaseOk) {
    console.log('\n❌ Firebase test failed');
    process.exit(1);
  }
  
  // Test product search
  await testProductSearch(token);
  
  console.log('\n✅ All tests passed!');
  console.log('\n📝 Next steps:');
  console.log('  1. Start the Next.js dev server: npm run dev');
  console.log('  2. Test the API endpoint:');
  console.log('     curl -X POST http://localhost:3000/api/sync/products \\');
  console.log('       -H "Authorization: Bearer YOUR_API_SECRET" \\');
  console.log('       -H "Content-Type: application/json" \\');
  console.log('       -d \'{"limit": 5, "locationId": "01400943"}\'');
  
  process.exit(0);
}

runTests().catch(error => {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
});
