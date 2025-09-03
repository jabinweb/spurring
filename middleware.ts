import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"

// Note: We're not directly exporting auth as middleware anymore 
// to have more control over the authentication process in Edge Runtime

export async function middleware(request: NextRequest) {
  const session = await auth()
  
  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/about',
    '/blog',
    '/careers',
    '/contact',
    '/projects',
    '/services',
  ]
  
  const url = request.nextUrl.clone()
  const path = url.pathname
  
  // Skip auth check for public paths
  const isPublic = publicPaths.some(p => path === p || path.startsWith(`${p}/`))
  
  // Skip auth check for API routes, static files, etc.
  if (
    isPublic ||
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.includes('/favicon.ico') ||
    path.includes('.svg') ||
    path.includes('.png') ||
    path.includes('.jpg')
  ) {
    return NextResponse.next()
  }
  
  // Admin area requires authentication
  if (path.startsWith('/admin')) {
    if (!session?.user) {
      // Redirect to login
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    
    // TODO: Add admin check once roles are implemented
    
    // Authenticated admin user - proceed
    return NextResponse.next()
  }
  
  // Protected routes
  if (!session?.user) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  
  // User is authenticated - proceed
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
