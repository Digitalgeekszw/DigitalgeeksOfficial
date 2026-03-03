import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const adminSession = request.cookies.get('admin_session');

  // If trying to access admin pages (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!adminSession || adminSession.value !== 'authenticated') {
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  // If trying to access admin API (except login)
  if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/login') {
    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
