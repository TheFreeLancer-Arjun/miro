import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Create a route matcher to identify public routes (sign-in pages).
// The matcher checks if the route starts with "/sign-in" to allow unauthenticated access to those pages.
const isPublicRoute = createRouteMatcher(["/sign-in(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // If the requested route is not public (i.e., it doesn't match "/sign-in"), protect it by ensuring the user is authenticated.
  // `auth.protect()` will enforce authentication and redirect users to the sign-in page if they are not authenticated.
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

// Export the configuration for the middleware matcher to control which routes are protected or ignored.
// This matcher defines which routes should be protected and which can be accessed without authentication.
// It skips Next.js internals (like _next) and static files (e.g., images, CSS, JS), but applies the middleware to API routes.
export const config = {
  matcher: [
    // This pattern excludes Next.js internal routes (e.g., _next) and static assets (e.g., images, styles, and font files).
    // It will match all routes that do not match these exceptions.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // This ensures that the middleware always runs for API routes, such as those in /api or /trpc.
    "/(api|trpc)(.*)",
  ],
};
