import { NextResponse } from 'next/server'

export function middleware(request) {
  // Protected routes
  const protectedPaths = ['/therapy', '/progress', '/profile']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    // In a real app, you would check JWT token or session here
    // For demo, we'll just check if there's a cookie
    const hasAuth = request.cookies.get('auth_token')
    
    if (!hasAuth) {
      // Redirect to login with return URL
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/therapy/:path*', '/progress/:path*', '/profile/:path*']
}