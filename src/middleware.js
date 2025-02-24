import { NextResponse } from 'next/server'

export function middleware(request) {
  // Add your middleware logic here
  const authToken = request.cookies.get('authToken')
  
  // Protect routes that require authentication
  if (request.nextUrl.pathname.startsWith('/protected') && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/protected/:path*',
    '/api/:path*',
  ],
} 