# Gruby Product Sync API - Deployment Guide

## ✅ What's Been Completed

### 1. Security Enhancements
- **Environment Variables**: Migrated from `serviceAccountKey.json` to secure environment variables
- **Required Variables** (add to Vercel):
  ```
  FIREBASE_PROJECT_ID=gruby-9af37
  FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@gruby-9af37.iam.gserviceaccount.com
  FIREBASE_PRIVATE_KEY="[see .env.local]"
  SYNC_API_SECRET=voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q=
  DEFAULT_STORE_LOCATION_ID=01400943
  NEXT_PUBLIC_KROGER_CLIENT_ID=gruby-bbc94mcp
  KROGER_CLIENT_SECRET=BGzjxxeOmggxu6gE0qOczAZo7nFwexCsfSTaAmxF
  ```

### 2. Rate Limiting
- **In-Memory Rate Limiter**: 10 requests per minute per client
- **Headers**: Returns `X-RateLimit-Remaining` and `X-RateLimit-Reset`
- **File**: `/src/lib/rate-limiter.ts`

### 3. Intelligent Caching
- **Cache Duration**: 24 hours
- **Storage**: Firestore collection `productCache`
- **Cache Key**: `{ingredientName}_{locationId}`
- **File**: `/src/lib/product-sync-utils.ts`

### 4. Confidence Scoring
- **Algorithm**:
  - Exact match: 1.0
  - Contains match: 0.9
  - Partial word match: up to 0.8
- **Smart Updates**: Only updates if new confidence > existing + 0.1 (10% improvement)
- **Age Check**: Always updates if data is older than 7 days

### 5. Vercel Cron Job
- **Schedule**: Daily at 2 AM (UTC)
- **Configuration**: `vercel.json`
- **Endpoint**: `/api/sync/products/cron/route.ts`
- **Batch Size**: 100 recipes per day

## 📦 Deployment Steps

### Step 1: Push to Git
```bash
cd /Users/kennedymaombi/dev/grubWeb
git add .
git commit -m "Add secure product sync API with rate limiting, caching, and confidence scoring"
git push origin main
```

### Step 2: Deploy to Vercel
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy
cd /Users/kennedymaombi/dev/grubWeb
vercel --prod
```

### Step 3: Add Environment Variables in Vercel Dashboard
1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add all variables from section 1 above
3. **Important**: For `FIREBASE_PRIVATE_KEY`, paste the full value including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

### Step 4: Enable Vercel Cron
1. Go to your project settings in Vercel
2. Navigate to "Cron Jobs"
3. Verify that `/api/sync/products/cron` is scheduled for "0 2 * * *"

### Step 5: Test Production API
```bash
# Test sync endpoint
curl -X POST https://your-domain.vercel.app/api/sync/products \
  -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q=" \
  -H "Content-Type: application/json" \
  -d '{"limit": 5}'

# Check sync history
curl -X GET https://your-domain.vercel.app/api/sync/products \
  -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q="
```

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Successfully synced 100 recipes",
  "recipesProcessed": 100,
  "productsUpdated": 750,
  "productsSkipped": 120,
  "cacheHits": 234,
  "errors": [],
  "timestamp": "2025-12-14T03:30:46.493Z"
}
```

### Key Metrics
- **productsUpdated**: Number of ingredients updated with new Kroger data
- **productsSkipped**: Ingredients skipped due to high existing confidence
- **cacheHits**: API calls saved by using cached products

## 🔐 Security Notes

1. **API Secret**: Never commit `SYNC_API_SECRET` to git. Store in Vercel environment variables.
2. **Firebase Key**: The private key contains newlines. In Vercel, paste it directly with quotes.
3. **Rate Limiting**: In production, consider using Redis (Upstash) for distributed rate limiting.

## 🚀 Performance Optimizations

### Current Performance
- **2 recipes**: ~20 seconds
- **10 recipes**: ~2 minutes
- **100 recipes**: ~20 minutes (cron job limit: 10 seconds for Hobby plan)

### Recommendations
1. **Upgrade to Pro Plan**: Longer cron execution time (5 minutes)
2. **Batch Processing**: Process 20 recipes per cron run, 5x daily
3. **Background Jobs**: Use Vercel Queue or external job processor (e.g., Inngest, Trigger.dev)

## 📝 CLI Commands

### Manual Sync (for testing)
```bash
# Sync specific recipes
curl -X POST http://localhost:3005/api/sync/products \
  -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q=" \
  -H "Content-Type: application/json" \
  -d '{"recipeIds": ["recipe1", "recipe2"]}'

# Force update (skip confidence checks)
curl -X POST http://localhost:3005/api/sync/products \
  -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q=" \
  -H "Content-Type: application/json" \
  -d '{"limit": 10, "force": true}'

# Custom location
curl -X POST http://localhost:3005/api/sync/products \
  -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q=" \
  -H "Content-Type: application/json" \
  -d '{"limit": 5, "locationId": "01500943"}'
```

## 📂 File Structure
```
grubWeb/
├── src/
│   ├── lib/
│   │   ├── firebase-admin.ts (✅ Using env vars)
│   │   ├── kroger-api.ts (✅ Existing)
│   │   ├── rate-limiter.ts (✅ New)
│   │   └── product-sync-utils.ts (✅ New)
│   └── app/
│       └── api/
│           └── sync/
│               └── products/
│                   ├── route.ts (✅ Enhanced)
│                   └── cron/
│                       └── route.ts (✅ New)
├── vercel.json (✅ New)
└── .env.local (⚠️ DO NOT COMMIT)
```

## 🔄 Next Steps

### High Priority
1. **Deploy to Production** (see steps above)
2. **Monitor First Sync**: Check Firestore console for updated ingredients
3. **Verify Cron Job**: Wait for 2 AM UTC, check logs in Vercel dashboard

### Future Enhancements
1. **Redis Cache**: Replace in-memory cache with Redis for multi-instance support
2. **Webhook Notifications**: Send Slack/Discord alerts on sync completion
3. **Analytics Dashboard**: Track sync performance, cache hit rates, confidence scores
4. **Retry Logic**: Automatically retry failed syncs with exponential backoff

## 🐛 Troubleshooting

### Issue: "Cannot find module"
- **Solution**: Restart dev server after adding new files

### Issue: "Unauthorized" in production
- **Solution**: Verify `SYNC_API_SECRET` is set in Vercel environment variables

### Issue: Cron job not running
- **Solution**: Ensure `vercel.json` is in project root and redeployed

### Issue: Firebase "Permission Denied"
- **Solution**: Check service account has Firestore read/write permissions

## 📞 Support
- **Logs**: Check Vercel dashboard → Project → Logs
- **Firebase**: https://console.firebase.google.com/project/gruby-9af37
- **Kroger API**: https://developer.kroger.com/
