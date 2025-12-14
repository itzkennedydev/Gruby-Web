# Product Sync API - grubWeb

Automated background service to sync Kroger product prices to Firebase recipes.

## Overview

This API syncs real-time product pricing from Kroger API to your Firebase `recipes` collection, enabling accurate cost calculations for recipes.

## Features

- ✅ OAuth 2.0 authentication with Kroger API
- ✅ Batch product search and price updates
- ✅ Firebase Admin SDK integration
- ✅ Rate limiting (500ms between requests)
- ✅ Sync history tracking
- ✅ API key authentication
- ✅ Error handling and logging

## Setup

### 1. Prerequisites

- Firebase service account key (`serviceAccountKey.json`) in project root
- Kroger API credentials in `.env.local`
- `firebase-admin` package installed

### 2. Environment Variables

Required in `.env.local`:

```env
# Kroger API (already configured)
NEXT_PUBLIC_KROGER_CLIENT_ID=gruby-bbc94mcp  
KROGER_CLIENT_SECRET=BGzjxxeOmggxu6gE0qOczAZo7nFwexCsfSTaAmxF

# Firebase Admin SDK
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json

# API Security
SYNC_API_SECRET=voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q=

# Optional: Default Kroger store
DEFAULT_STORE_LOCATION_ID=01400943
```

### 3. Test Connection

```bash
node test-sync.cjs
```

Expected output:
```
✅ All tests passed!
✓ Successfully authenticated with Kroger API
✓ Successfully connected to Firebase
✓ Found: Kroger® Penne Rigate Pasta
```

## API Endpoints

### POST `/api/sync/products`

Syncs Kroger product prices to Firebase recipes.

**Headers:**
```
Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q=
Content-Type: application/json
```

**Body:**
```json
{
  "limit": 50,              // Max recipes to sync (optional, default: 50)
  "locationId": "01400943", // Kroger store ID (optional, uses DEFAULT_STORE_LOCATION_ID)
  "recipeIds": ["id1", "id2"] // Specific recipes (optional, syncs all if omitted)
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully synced 50 recipes",
  "recipesProcessed": 50,
  "productsUpdated": 423,
  "errors": [],
  "timestamp": "2024-12-13T21:30:00.000Z"
}
```

### GET `/api/sync/products`

Returns last 10 sync history entries.

**Headers:**
```
Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q=
```

**Response:**
```json
{
  "success": true,
  "history": [
    {
      "id": "sync_123",
      "success": true,
      "recipesProcessed": 50,
      "productsUpdated": 423,
      "timestamp": "2024-12-13T21:30:00.000Z"
    }
  ]
}
```

## Usage Examples

### Sync 10 Recipes
```bash
curl -X POST http://localhost:3000/api/sync/products \
  -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q=" \
  -H "Content-Type: application/json" \
  -d '{"limit": 10, "locationId": "01400943"}'
```

### Sync Specific Recipes
```bash
curl -X POST http://localhost:3000/api/sync/products \
  -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q=" \
  -H "Content-Type: application/json" \
  -d '{"recipeIds": ["recipe_id_1", "recipe_id_2"]}'
```

### View Sync History
```bash
curl -X GET http://localhost:3000/api/sync/products \
  -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q="
```

## Database Schema

### Before Sync
```javascript
// recipes collection
{
  id: "recipe123",
  title: "Pasta Carbonara",
  ingredients: [
    {
      name: "spaghetti",
      quantity: 1,
      unit: "lb",
      estimatedCost: 2.99
    }
  ]
}
```

### After Sync
```javascript
// recipes collection
{
  id: "recipe123",
  title: "Pasta Carbonara",
  ingredients: [
    {
      name: "spaghetti",
      quantity: 1,
      unit: "lb",
      estimatedCost: 2.99,
      // NEW FIELDS:
      krogerProductId: "0001111085033",
      krogerPrice: 1.25,
      krogerRegularPrice: 1.25,
      krogerPromoPrice: null,
      krogerImageUrl: "https://www.kroger.com/product/images/...",
      krogerSize: "16 oz",
      lastUpdated: "2024-12-13T21:30:00.000Z"
    }
  ],
  productDataLastSynced: "2024-12-13T21:30:00.000Z" // NEW FIELD
}

// NEW COLLECTION: productSyncHistory
{
  id: "sync_abc123",
  success: true,
  recipesProcessed: 10,
  productsUpdated: 85,
  errors: [],
  timestamp: "2024-12-13T21:30:00.000Z",
  createdAt: Timestamp
}
```

## File Structure

```
grubWeb/
├── src/
│   ├── app/api/sync/products/
│   │   └── route.ts              # Main sync API endpoint
│   └── lib/
│       ├── firebase-admin.ts     # Firebase Admin SDK setup
│       └── kroger-api.ts         # Kroger API client
├── serviceAccountKey.json        # Firebase credentials (DO NOT COMMIT)
├── test-sync.cjs                 # Test script
└── .env.local                    # Environment variables (DO NOT COMMIT)
```

## Automation Options

### Option 1: Manual Trigger
Run curl command whenever you need to sync prices.

### Option 2: Scheduled Task (GitHub Actions)
Create `.github/workflows/sync-products.yml`:

```yaml
name: Sync Product Prices

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:      # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Sync Products
        run: |
          curl -X POST https://your-domain.com/api/sync/products \
            -H "Authorization: Bearer ${{ secrets.SYNC_API_SECRET }}" \
            -H "Content-Type: application/json" \
            -d '{"limit": 100, "locationId": "01400943"}'
```

### Option 3: Vercel Cron (Production)
Add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/sync/products",
    "schedule": "0 0 * * *"
  }]
}
```

## Rate Limits

- **Kroger API**: Check your plan limits
- **Sync Delay**: 500ms between recipe updates
- **Recommended**: Sync in batches of 50-100 recipes

## Troubleshooting

### "Unauthorized" Error
- Check `SYNC_API_SECRET` in `.env.local`
- Ensure Authorization header is correct

### "Kroger credentials not found"
- Verify `NEXT_PUBLIC_KROGER_CLIENT_ID` and `KROGER_CLIENT_SECRET` in `.env.local`
- Run `node test-sync.cjs` to test credentials

### "Firebase connection failed"
- Check `serviceAccountKey.json` exists
- Verify `FIREBASE_SERVICE_ACCOUNT_PATH` points to correct file
- Ensure service account has Firestore permissions

### No Products Found
- Check `locationId` is valid Kroger store
- Try different ingredient search terms
- Some products may not be available at specific stores

## Security Notes

- ⚠️ Never commit `serviceAccountKey.json` or `.env.local`
- ✅ Both files are in `.gitignore`
- ✅ API requires Bearer token authentication
- ✅ Service account has minimal required permissions

## Monitoring

Check sync history in Firebase Console:
- Collection: `productSyncHistory`
- Fields: `success`, `recipesProcessed`, `productsUpdated`, `errors`, `timestamp`

## Support

For issues or questions:
1. Check logs in Firebase Console
2. Run `node test-sync.cjs` to verify setup
3. Review error messages in API response

---

**Status**: ✅ Fully configured and tested
**Last Updated**: December 13, 2024
