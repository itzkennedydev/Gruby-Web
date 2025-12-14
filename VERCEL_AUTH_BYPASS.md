# Vercel Authentication Bypass for API Routes

## Problem
- Vercel Authentication is enabled (can't be fully disabled on your plan)
- Cron jobs can't pass the authentication page
- API routes returning 401 Unauthorized

## ✅ Solution: Update Middleware to Allow Public API Routes

The middleware is already configured, but Vercel Authentication might be overriding it. Here are 3 solutions:

---

## Option 1: Use Custom Domain for API (RECOMMENDED)

**Setup:**
1. Your custom domain `gruby.io` bypasses authentication automatically
2. Update `vercel.json` to use custom domain for cron

```json
{
  "crons": [
    {
      "path": "/api/sync/products/cron",
      "schedule": "0 2 * * *"
    }
  ]
}
```

**Test:**
```bash
# This should work without authentication
curl https://gruby.io/api/sync/products/cron \
  -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q="
```

---

## Option 2: Add Deployment Protection Bypass for Specific Paths

**In Vercel Dashboard:**
1. Go to: Project Settings → Deployment Protection
2. Click "Manage Protection Bypass for Automation"
3. Add bypass rule: `/api/sync/*`

This allows API routes to bypass authentication while keeping the rest protected.

---

## Option 3: Use Environment Variable to Bypass (For Testing)

Add a bypass token to your cron endpoint:

**Update `src/app/api/sync/products/cron/route.ts`:**

```typescript
export async function GET(request: NextRequest) {
  try {
    // Check for Vercel bypass token
    const bypassCookie = request.cookies.get('__vercel_protection_bypass');
    const bypassToken = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    
    // Verify this is coming from Vercel Cron (uses special header)
    const cronHeader = request.headers.get('x-vercel-cron');
    
    // Also allow manual triggers with Bearer token for testing
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || process.env.SYNC_API_SECRET;
    
    // Accept Vercel cron, bypass token, OR valid Bearer token
    const isVercelCron = cronHeader === '1' || cronHeader === 'true';
    const hasBypass = bypassCookie?.value === bypassToken;
    const isAuthorized = authHeader === \`Bearer \${cronSecret}\`;
    
    if (!isVercelCron && !hasBypass && !isAuthorized) {
      console.log('Cron auth failed:', { 
        cronHeader, 
        hasBypass,
        hasAuth: !!authHeader 
      });
      return NextResponse.json(
        { error: 'Unauthorized - Not from Vercel Cron or missing valid token' },
        { status: 401 }
      );
    }
    
    // ... rest of code
  } catch (error: any) {
    // ... error handling
  }
}
```

---

## Option 4: Move to Production Domain Only

**Vercel Authentication typically only applies to preview deployments, not production.**

Check if your production URL (custom domain) works:
```bash
curl https://gruby.io/api/sync/products \
  -X POST \
  -H "Authorization: Bearer voV3zO0aiN0BQUu70nnYcyO0Z6tMvHyFCshLvPvyi2Q=" \
  -H "Content-Type: application/json" \
  -d '{"limit": 2}'
```

If this works, your cron job should work fine because **Vercel Cron always hits production**.

---

## Quick Test

**Test if production domain bypasses auth:**
```bash
# Test production domain
curl https://gruby.io/api/sync/products/cron

# Test preview domain  
curl https://grub-100o2ha6y-itzkennedydevs-projects.vercel.app/api/sync/products/cron
```

If `gruby.io` works but the preview domain doesn't, you're all set! Cron jobs use production domains.

---

## Recommended Action

**Try Option 4 first (test production domain)** - this is the most likely solution since Vercel Cron always runs against production deployments, which typically bypass authentication.

If that doesn't work, use **Option 2** (add bypass rule in dashboard).
