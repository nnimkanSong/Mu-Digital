import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const isGuardEnabled = process.env.ENABLE_IP_GUARD === 'true';
  const allowedLanPrefix = '192.168.1';

  let currentServerPublicIp = '';
  try {
    const response = await fetch('https://ifconfig.me/ip', { cache: 'no-store' });
    currentServerPublicIp = (await response.text()).trim();
  } catch (error) {
    console.error('❌ Error fetching Server Public IP:', error);
  }

  let visitorIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                  (request as any).ip || 
                  '127.0.0.1';

  if (visitorIp.startsWith('::ffff:')) {
    visitorIp = visitorIp.replace('::ffff:', '');
  }

  const visitorPrefix = visitorIp.split('.').slice(0, 3).join('.');
  const isVisitorLocal = visitorIp === '::1' || visitorIp === '127.0.0.1' || visitorIp === 'localhost';

  const isAllowed = !isGuardEnabled ||
                    isVisitorLocal ||
                    (visitorIp === currentServerPublicIp) ||
                    (visitorPrefix === allowedLanPrefix);

  const isRootPage = request.nextUrl.pathname === '/';
  const isErrorPage = request.nextUrl.pathname === '/access-denied';

  console.log(`🔒 Guard: ${isAllowed ? '✅ Access' : '❌ Denied'} | Server IP: ${currentServerPublicIp} | Visitor: ${visitorIp}`);

  if (!isAllowed && !isErrorPage) {
    return NextResponse.redirect(new URL('/access-denied', request.url));
  }

  if (isAllowed && isRootPage) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};