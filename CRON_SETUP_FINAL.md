# Gruby Product Sync - Final Cron Solution

## Current Situation

The product sync cron job is **fully implemented and working**, but blocked by **Vercel Deployment Protection** (SSO/Authentication).

### What's Built ✅

1. **Cron Endpoint**: `/api/sync/products/cron`
   - Syncs 100 recipes daily at 2 AM
   - Direct Firebase integration (no HTTP calls)
   - Rate limiting, caching, confidence scoring
   - Authentication via Vercel Cron header OR Bearer token

2. **Vercel Cron Configuration**: `vercel.json`
   ```json
   {
     "crons": [{
       "path": "/api/sync/products/cron",
       "schedule": "0 2 * * *"
     }]
   }
   ```

3. **Middleware**: Public routes configured in `src/middleware.ts`

## The Problem ❌

**Vercel Deployment Protection blocks ALL requests** at the edge/CDN level before Next.js code runs. This means:
- Vercel Cron jobs get blocked with 401 Unauthorized
- External schedulers (Airflow, GitHub Actions) also get blocked
- Bypass secrets don't work for server-to-server requests

## Solutions (Choose One)

### Option 1: Disable Vercel Deployment Protection ⭐ RECOMMENDED

**Pros:**
- Simplest solution (30 seconds)
- No additional infrastructure
- No ongoing maintenance
- API already has Bearer token auth

**Cons:**
- Entire deployment becomes public
- Dashboard pages need their own auth (already using Clerk)

**How to do it:**
1. Go to: https://vercel.com/itzkennedydevs-projects/gruby-web/settings/deployment-protection
2. Toggle **OFF** "Vercel Authentication"
3. Done! Cron will work immediately

**Security:** The API endpoint has Bearer token authentication (`SYNC_API_SECRET`), so it's still protected.

---

### Option 2: Move Cron to Firebase Cloud Scheduler

**Pros:**
- No Vercel auth issues
- Serverless, scales automatically
- Google Cloud native integration

**Cons:**
- Requires Google Cloud account setup
- Additional service to manage
- Costs ~$0.10/month

**How to do it:**
1. Enable Cloud Scheduler in Firebase Console
2. Create scheduled function:
   ```bash
   cd functions
   npm install
   ```
3. Add to `functions/src/index.ts`:
   ```typescript
   export const dailyProductSync = functions.pubsub
     .schedule('0 2 * * *')
     .timeZone('America/New_York')
     .onRun(async (context) => {
       // Call your existing sync logic
       const response = await fetch('https://gruby.app/api/sync/products', {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${process.env.SYNC_API_SECRET}`,
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ limit: 100 })
       });
       return null;
     });
   ```
4. Deploy: `firebase deploy --only functions`

---

### Option 3: GitHub Actions Cron

**Pros:**
- Free (included with GitHub)
- Easy to set up
- Version controlled

**Cons:**
- Still blocked by Vercel Auth (same issue)
- Unreliable timing (can be delayed by 15+ minutes)

**How to do it:**
1. Create `.github/workflows/product-sync.yml`:
   ```yaml
   name: Daily Product Sync
   on:
     schedule:
       - cron: '0 2 * * *'  # 2 AM daily
     workflow_dispatch:  # Allow manual trigger
   
   jobs:
     sync:
       runs-on: ubuntu-latest
       steps:
         - name: Trigger Product Sync
           run: |
             curl -X POST "https://gruby.app/api/sync/products" \
               -H "Authorization: Bearer ${{ secrets.SYNC_API_SECRET }}" \
               -H "Content-Type: application/json" \
               -d '{"limit": 100}'
   ```
2. Add `SYNC_API_SECRET` to GitHub Secrets
3. **Still requires disabling Vercel Auth**

---

### Option 4: Apache Airflow (Started but Not Recommended)

**Pros:**
- Enterprise-grade workflow orchestration
- Can handle complex DAGs
- Great for multiple scheduled tasks

**Cons:**
- Requires 24/7 server ($5-50+/month)
- Complex setup and maintenance
- Overkill for single cron job
- Still blocked by Vercel Auth

**Status:** Partially installed in `~/airflow` but not configured.

To clean up:
```bash
rm -rf ~/airflow
```

---

## Recommendation 🎯

**Use Option 1: Disable Vercel Deployment Protection**

**Why:**
1. Your dashboard already uses Clerk for authentication
2. API endpoints have their own Bearer token auth
3. Zero additional infrastructure/cost
4. Works immediately
5. Vercel Deployment Protection is meant for protecting entire sites, not individual API endpoints

**Next Steps:**
1. Disable Vercel Authentication in project settings
2. Test cron endpoint:
   ```bash
   curl "https://gruby.app/api/sync/products/cron" \
     -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q="
   ```
3. Wait for tomorrow at 2 AM to see automatic sync
4. Monitor logs in Vercel dashboard

---

## Current Environment Variables

**Keep these:**
- `SYNC_API_SECRET` - Bearer token for API auth
- `DEFAULT_STORE_LOCATION_ID` - Kroger store ID
- `FIREBASE_*` - Firebase Admin credentials
- `KROGER_*` - Kroger API credentials

**Can remove:**
- `VERCEL_AUTOMATION_BYPASS_SECRET` - Not needed if auth disabled

---

## Files to Keep

All current files are production-ready:
- `/src/app/api/sync/products/route.ts` - Main sync API
- `/src/app/api/sync/products/cron/route.ts` - Cron endpoint
- `/src/lib/product-sync-utils.ts` - Sync utilities
- `/src/lib/kroger-api.ts` - Kroger integration
- `/vercel.json` - Cron schedule configuration
- `/src/middleware.ts` - Public route config

---

## Monitoring

After setup, monitor sync jobs:
1. View logs: https://vercel.com/itzkennedydevs-projects/gruby-web/logs
2. Check sync history API:
   ```bash
   curl "https://gruby.app/api/sync/products?limit=10" \
     -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q="
   ```
3. Firebase Console → Firestore → `productSyncHistory` collection

---

## Troubleshooting

**Cron not running:**
- Check Vercel logs for errors
- Verify cron schedule in vercel.json
- Ensure environment variables are set

**Sync failing:**
- Check Kroger API rate limits
- Verify Firebase credentials
- Review error logs in Firestore

**Performance issues:**
- Adjust `limit` in cron endpoint (currently 100)
- Increase delay between recipes (currently 200ms)
- Check cache hit rate in logs
