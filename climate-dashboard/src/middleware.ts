import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from '@/utils/auth';

export type Role = 'admin' | 'operator';

interface RouteConfig {
  roles?: Role[];
  requireAuth?: boolean;
}

const publicRoutes = ['/api/auth/login', '/api/auth/register', '/api/debug'];

const routePermissions: Record<string, RouteConfig> = {
  '/api/admin': {
    roles: ['admin'],
    requireAuth: true,
  },
  '/api/users': {
    roles: ['admin', 'operator'],
    requireAuth: true,
  },
  '/api/stations': {
    roles: ['admin', 'operator'],
    requireAuth: true,
  },
  '/api/readings': {
    roles: ['admin', 'operator'],
    requireAuth: true,
  },
  '/api/alerts': {
    roles: ['admin', 'operator'],
    requireAuth: true,
  },
};

function matchesRoute(pathname: string, route: string): boolean {
  // Treat permissions as prefix-based on path segments:
  // - '/api/users' matches '/api/users' and '/api/users/123'
  if (pathname === route) return true;
  if (pathname.startsWith(route + '/')) return true;
  return false;
}

function getRouteConfig(pathname: string): RouteConfig | null {
  for (const [route, config] of Object.entries(routePermissions)) {
    if (matchesRoute(pathname, route)) {
      return config;
    }
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log(`🔍 Middleware: Processing ${pathname}`);
  
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    console.log(`✅ Public route: ${pathname}`);
    return NextResponse.next();
  }

  // Least privilege: everything under /api is protected unless explicitly public.
  const routeConfig = getRouteConfig(pathname) ?? { requireAuth: true };

  if (routeConfig.requireAuth) {
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);
    
    if (!token) {
      console.log(`❌ No token provided for: ${pathname}`);
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    try {
      const decoded = await verifyToken(token);
      console.log(`✅ Token verified for user: ${decoded.username} (${decoded.role})`);
      
      if (routeConfig.roles && !routeConfig.roles.includes(decoded.role)) {
        console.log(`❌ Access denied for ${decoded.role} on: ${pathname}`);
        return NextResponse.json(
          { success: false, message: 'Access denied' },
          { status: 403 }
        );
      }

      // Forward user context to downstream API handlers via request headers.
      // (Setting response headers would not be readable from `request.headers` in route handlers.)
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      requestHeaders.set('x-user-role', decoded.role);
      requestHeaders.set('x-user-username', decoded.username);
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      
      console.log(`✅ Access granted for ${decoded.username} on: ${pathname}`);
      return response;
      
    } catch (error) {
      console.log(`❌ Invalid token for: ${pathname}`);
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
};
