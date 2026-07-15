export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/questions/:path*', '/users/:path*', '/payments/:path*', '/schools/:path*', '/analytics/:path*', '/ai/:path*', '/settings/:path*'],
};
