import { next } from "@vercel/edge";

const BOTS = [
  "whatsapp",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "telegrambot",
  "googlebot",
  "bingbot",
  "slackbot",
  "applebot",
  "duckduckbot",
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

    const firstBlock = post.content?.blocks?.find(
      (b) =>
        b.type === "paragraph" &&
        b.data?.text &&
        !b.data.text.startsWith("#") &&
        b.data.text.length > 30,
    );
    const description =
      firstBlock?.data?.text?.replace(/<[^>]*>/g, "").slice(0, 160) || "";

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${post.title} | CampyTech</title>
  <meta name="description" content="${description}" />
  <meta name="keywords" content="${post.tags?.map((t) => t.name).join(", ") || ""}" />
  <link rel="canonical" href="https://campytech.com/blog/${slug}" />

  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${post.featuredImage || "https://campytech.com/og-default.jpg"}" />
  <meta property="og:url" content="https://campytech.com/blog/${slug}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="CampyTech" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${post.title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${post.featuredImage || "https://campytech.com/og-default.jpg"}" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${post.title}",
    "image": "${post.featuredImage || ""}",
    "datePublished": "${post.publishedAt}",
    "dateModified": "${post.updatedAt}",
    "author": {
      "@type": "Person",
      "name": "${post.author?.displayName || "CampyTech"}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CampyTech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://campytech.com/logo.png"
      }
    }
  }
  </script>
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
