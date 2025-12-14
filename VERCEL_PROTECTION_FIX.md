# Vercel Protection Fix for API Routes

## Issue
The API routes `/api/sync/products` and `/api/sync/products/cron` are returning 401 due to Vercel's Deployment Protection feature.

## Solution
You need to disable Vercel Protection for this project to allow public API access.

### Steps:

1. Go to: https://vercel.com/itzkennedydevs-projects/grub-web/settings/deployment-protection

2. Under "Deployment Protection", choose one of these options:

   **Option A: Disable Protection (Simplest)**
   - Set "Deployment Protection" to **OFF**
   - This allows public access to all routes

   **Option B: Configure Protection Bypass for API Routes**
   - Keep protection ON
   - Add these paths to "Protection Bypass":
     - `/api/sync/products`
     - `/api/sync/products/cron`

3. Save settings

4. Test the API:
```bash
curl -X POST https://grub-hx9huo2vn-itzkennedydevs-projects.vercel.app/api/sync/products \
  -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q=" \
  -H "Content-Type: application/json" \
  -d '{"limit": 2}'
```

## Expected Response
```json
{
  "success": true,
  "recipesProcessed": 2,
  "productsUpdated": 14,
  "productsSkipped": 3,
  "cacheHits": 0,
  "errors": [],
  "timestamp": "2025-12-14T03:50:00.000Z"
}
```

## Alternative: Use Custom Domain
If you want to keep protection and use gruby.io:
1. Configure DNS for gruby.io to point to Vercel
2. Add gruby.io as custom domain in project settings
3. Protection won't apply to custom domains by default

## Cron Job Note
Vercel cron jobs bypass deployment protection automatically, so the daily sync at 2 AM UTC will work even with protection enabled.
