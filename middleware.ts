import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/resume(.*)',
  '/dashboard(.*)',
  '/jobs(.*)',
  '/ai-cover-letter(.*)',
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const {userId, redirectToSignIn} = await auth();
  if(!userId && isProtectedRoute(req)){
    return redirectToSignIn()
  }

  return NextResponse.next();
} );

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};