import { blogPosts as fallbackPosts } from "../data/blogPosts";

function buildSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractCollection(data) {
  if (Array.isArray(data)) {
    return { found: true, items: data };
  }

  const candidates = [data?.data, data?.items, data?.blogs, data?.results];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return { found: true, items: candidate };
    }
  }

  return { found: false, items: [] };
}

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function extractContentText(content) {
  if (!content) {
    return "";
  }

  if (typeof content === "string") {
    return stripHtml(content);
  }

  if (Array.isArray(content?.blocks)) {
    return content.blocks
      .map((block) => block?.data?.text || block?.text || "")
      .filter(Boolean)
      .join(" ");
  }

  return "";
}

function formatExcerpt(post, contentText) {
  if (post.excerpt) {
    return post.excerpt;
  }

  if (!contentText) {
    return "Read the latest update from CampyTech Gist.";
  }

  return `${contentText.slice(0, 180).trim()}${contentText.length > 180 ? "..." : ""}`;
}

function getReadTimeMinutes(text, providedValue) {
  if (typeof providedValue === "number" && providedValue > 0) {
    return providedValue;
  }

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(wordCount / 180));
}

function toDateString(value) {
  if (!value) {
    return new Date().toISOString().slice(0, 10);
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }

  return date.toISOString().slice(0, 10);
}

function getCategoryName(post) {
  return (
    post.category?.name ||
    post.categoryName ||
    post.category?.title ||
    post.category ||
    "News"
  );
}

function getCategoryId(post) {
  return (
    post.category?.slug ||
    post.categorySlug ||
    buildSlug(getCategoryName(post)) ||
    "news"
  );
}

function getAuthorName(post) {
  return (
    post.author?.name ||
    post.authorName ||
    post.user?.fullName ||
    post.user?.name ||
    post.author ||
    "CampyTech Desk"
  );
}

function getViews(post) {
  const value = post.views ?? post.viewCount ?? post.totalViews ?? 0;
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function getFallbackImage(index) {
  return fallbackPosts[index % fallbackPosts.length]?.image || "";
}

export function normalizeHomePosts(posts) {
  const publishedPosts = posts.filter(
    (post) => !post.status || post.status === "PUBLISHED",
  );

  const sortedPosts = [...publishedPosts].sort((left, right) => {
    const leftDate = new Date(left.publishedAt || left.createdAt || 0).getTime();
    const rightDate = new Date(
      right.publishedAt || right.createdAt || 0,
    ).getTime();

    return rightDate - leftDate;
  });

  return sortedPosts.map((post, index) => {
    const contentText = extractContentText(post.content);
    const categoryLabel = getCategoryName(post);

    return {
      id: post.id || `${buildSlug(post.title || `story-${index}`)}-${index}`,
      slug: post.slug || buildSlug(post.title || `story-${index}`),
      title: post.title || "Untitled story",
      excerpt: formatExcerpt(post, contentText),
      category: getCategoryId(post),
      categoryLabel,
      author: getAuthorName(post),
      publishedAt: toDateString(post.publishedAt || post.createdAt),
      readTimeMinutes: getReadTimeMinutes(contentText, post.readTimeMinutes),
      views: getViews(post),
      image: post.featuredImage || post.image || getFallbackImage(index),
      featured: Boolean(post.featured) || index === 0,
      breaking: Boolean(post.breaking) || index < 2,
    };
  });
}

export function extractCollectionFromResponse(data) {
  return extractCollection(data);
}
