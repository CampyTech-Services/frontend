import { next } from "@vercel/edge";

const BOTS = [
  "whatsapp",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "telegrambot",
  "googlebot",
  "slackbot",
];

export default async function middleware(req) {
  const ua = req.headers.get("user-agent")?.toLowerCase() || "";
  const url = new URL(req.url);
  const pathname = url.pathname;

  const isBot = BOTS.some((bot) => ua.includes(bot));

  if (!isBot || !pathname.startsWith("/blog/")) {
    return next();
  }

  const slug = pathname.replace("/blog/", "");

  try {
    const res = await fetch(`https://api.campytech.com/api/blog/slug/${slug}`);
    const post = await res.json();

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${post.title} | CampyTech</title>
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.excerpt || ""}" />
  <meta property="og:image" content="${post.featuredImage || "https://campytech.com/og-default.jpg"}" />
  <meta property="og:url" content="https://campytech.com${pathname}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="CampyTech" />
</head>
<body></body>
</html>`;

    return new Response(html, {
      headers: { "content-type": "text/html" },
    });
  } catch (e) {
    return next();
  }
}

export const config = {
  matcher: ["/blog/:path*"],
};
