import { auth } from '@/lib/auth';

export default auth((req) => {
  if (!req.auth?.user.isAdmin && req.nextUrl.pathname.startsWith('/admin')) {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
