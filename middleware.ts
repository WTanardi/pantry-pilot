import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Redirect unauthenticated users to the login page
  if (!session && (path === '/dashboard/user' || path === '/dashboard/admin')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Prevent authenticated users from accessing the login, register, and landing page
  if (
    session &&
    (path === '/' ||
      path === '/login' ||
      path === '/register' ||
      path === '/about')
  ) {
    if (session.isAdmin) {
      return NextResponse.redirect(new URL('/dashboard/admin', req.url))
    } else {
      return NextResponse.redirect(new URL('/dashboard/user', req.url))
    }
  }

  // Prevent authenticated users from accessing dashboards other than their own
  if (session && session.isAdmin && path === '/dashboard/user') {
    return NextResponse.redirect(new URL('/dashboard/admin', req.url))
  } else if (session && !session.isAdmin && path === '/dashboard/admin') {
    return NextResponse.redirect(new URL('/dashboard/user', req.url))
  }

  const origin = req.headers.get('origin')

  const res = NextResponse.next()
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  )
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.headers.set('Access-Control-Max-Age', '86400')

  return NextResponse.next()
}
