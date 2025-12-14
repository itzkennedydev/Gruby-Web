import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/api/sync/products(.*)',
  '/api/sync/products/cron(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // Allow public API routes without authentication
  if (isPublicRoute(req)) {
    return;
  }
  // Protect all other routes
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};