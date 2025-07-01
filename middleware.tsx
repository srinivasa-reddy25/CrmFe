import { NextRequest, NextResponse } from 'next/server';


const protectedRoutes: string[] = [
    '/',
    '/dashboard',
    '/contacts',
    '/activities',
    '/tags',
    '/chat',
    '/profile'
];

const authRoutes: string[] = [
    '/auth/login',
    '/auth/register'
];


export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );
    const isAuthRoute = authRoutes.includes(pathname);

    const isLoggedIn = request.cookies.get('auth')?.value;

    if (isProtected && !isLoggedIn && !isAuthRoute) {
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthRoute && isLoggedIn) {
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();


}

export const config = {
    matcher: [
        '/',
        '/dashboard/:path*',
        '/contacts/:path*',
        '/activities/:path*',
        '/tags/:path*',
        '/chat/:path*',
        '/profile/:path*',
        '/auth/login',
        '/auth/register'
    ],
};


