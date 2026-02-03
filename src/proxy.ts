import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get('authToken')?.value;

    const isCheckoutRoute =
        pathname.startsWith('/booking') &&
        pathname.endsWith('/checkout')

    const isMyBookingsRoute =
        pathname.startsWith('/my-bookings');

    const isProtectedRoute =
        isCheckoutRoute || isMyBookingsRoute;

    if (!token && isProtectedRoute) {
        const loginUrl = new URL('/auth/login', request.url);

        loginUrl.searchParams.set('redirect', pathname);
        loginUrl.searchParams.set('message', 'auth-required');

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/booking/:path*/checkout','/my-bookings/:path*']
};
