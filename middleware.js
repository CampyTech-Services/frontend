export async function middleware(req) {
  const ua = req.headers.get('user-agent')?.toLowerCase() || '';
  
  const isBot = [
    'whatsapp', 'facebookexternalhit', 'twitterbot',
    'linkedinbot', 'telegrambot', 'googlebot', 'slackbot'
  ].some(bot => ua.includes(bot));

  if (!isBot) return;

  const url = new URL(req.url);
  const pathname = url.pathname;

  if (!pathname.startsWith('/blog/')) return;

  const slug = pathname.replace('/blog/', '');

  try {
    const res = await fetch(`https://api.campytech.com/blog/${slug}`);
    const post = await res.json();

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${post.title} | CampyTech</title>
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.excerpt || post.summary || ''}" />
  <meta property="og:image" content="${post.image || post.thumbnail || 'https://campytech.com/og-default.jpg'}" />
  <meta property="og:url" content="https://campytech.com${pathname}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="CampyTech" />
</head>
<body></body>
</html>`;

    return new Response(html, {
      headers: { 'content-type': 'text/html' },
    });
  } catch {
    return;
  }
}

export const config = {
  matcher: ['/blog/:path*'],
};