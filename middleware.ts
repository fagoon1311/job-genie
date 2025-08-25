import { clerkMiddleware } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

import { NextRequest, NextResponse } from 'next/server';

const isProtectedRoute = (path: string) => {
  return [
    '/resume',
    '/dashboard',
    '/jobs',
    '/ai-cover-letter',
    '/onboarding',
  ].some((protectedPath) => path.startsWith(protectedPath));
};

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, redirectToSignIn } = await auth();
  const currentPath = req.nextUrl.pathname;

  console.log("🔍 Current Path:", currentPath);

  // 🔒 Redirect unauthenticated users from protected routes
  if (!userId && isProtectedRoute(currentPath)) {
    console.log("Not logged in, redirecting to sign-in");
    return redirectToSignIn();
  }

  // If authenticated, check live user metadata from Clerk
  if (userId) {
    try {
      const user = await clerkClient.users.getUser(userId);
      const isOnboarded = user.publicMetadata?.onboarded === true;

      //  If not onboarded, redirect to /onboarding
      if (!isOnboarded && currentPath !== "/onboarding" && !currentPath.startsWith("/api")) {
        console.log("🚧 User not onboarded, redirecting...");
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }

      // If onboarded but on /onboarding, redirect to /dashboard
      if (isOnboarded && currentPath === "/onboarding") {
        console.log(" Already onboarded, redirecting to dashboard");
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (err) {
      console.error("❗ Failed to fetch user from Clerk:", err);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
