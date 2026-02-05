import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get('authToken')?.value;
    const role = request.cookies.get('role')?.value;

    const isCheckoutRoute =
        pathname.startsWith('/booking') &&
        pathname.endsWith('/checkout')

    const isMyBookingsRoute =
        pathname.startsWith('/my-bookings');

    const isAdminRoute =
        pathname.startsWith('/admin');

    const isProtectedRoute =
        isCheckoutRoute || isMyBookingsRoute || isAdminRoute;

    if (!token && isProtectedRoute) {
        const loginUrl = new URL('/auth/login', request.url);

        loginUrl.searchParams.set('redirect', pathname);
        loginUrl.searchParams.set('message', 'auth-required');

        return NextResponse.redirect(loginUrl);
    }

    if (isAdminRoute && role !== 'admin') {
        const loginUrl = new URL('/', request.url);
        loginUrl.searchParams.set('message', 'admin-required');

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/booking/:path*/checkout','/my-bookings/:path*','/admin/:path*'],
};
