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

function extractSingle(data) {
  if (!data) {
    return { found: false, item: null };
  }

  if (Array.isArray(data)) {
    return { found: data.length > 0, item: data[0] ?? null };
  }

  const candidates = [data?.data, data?.item, data?.blog, data?.result];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    if (Array.isArray(candidate)) {
      return { found: candidate.length > 0, item: candidate[0] ?? null };
    }

    if (typeof candidate === "object") {
      return { found: true, item: candidate };
    }
  }

  if (typeof data === "object") {
    return { found: true, item: data };
  }

  return { found: false, item: null };
}

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function parseContentString(content) {
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    return null;
  }

  if (
    (trimmedContent.startsWith("{") && trimmedContent.endsWith("}")) ||
    (trimmedContent.startsWith("[") && trimmedContent.endsWith("]"))
  ) {
    try {
      return JSON.parse(trimmedContent);
    } catch {
      return null;
    }
  }

  return null;
}

function createParagraphBlocksFromText(text) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => stripHtml(paragraph))
    .filter(Boolean)
    .map((paragraph, index) => ({
      id: `paragraph-${index}`,
      type: "paragraph",
      text: paragraph,
    }));
}

function normalizeContentBlocks(content, fallbackText = "") {
  if (!content) {
    return createParagraphBlocksFromText(fallbackText);
  }

  if (typeof content === "string") {
    const parsedContent = parseContentString(content);

    if (parsedContent) {
      return normalizeContentBlocks(parsedContent, fallbackText);
    }

    return createParagraphBlocksFromText(content || fallbackText);
  }

  if (Array.isArray(content)) {
    return content.flatMap((block, index) =>
      normalizeContentBlocks({ blocks: [block] }, `${fallbackText}-${index}`),
    );
  }

  if (Array.isArray(content?.blocks)) {
    return content.blocks
      .map((block, index) => {
        const blockType = block?.type || "paragraph";
        const blockData = block?.data || block || {};

        if (blockType === "header") {
          return {
            id: block?.id || `header-${index}`,
            type: "header",
            level: blockData.level || 2,
            text: stripHtml(blockData.text || ""),
          };
        }

        if (blockType === "list") {
          return {
            id: block?.id || `list-${index}`,
            type: "list",
            style: blockData.style || "unordered",
            items: (blockData.items || [])
              .map((item) => stripHtml(typeof item === "string" ? item : ""))
              .filter(Boolean),
          };
        }

        if (blockType === "quote") {
          return {
            id: block?.id || `quote-${index}`,
            type: "quote",
            text: stripHtml(blockData.text || ""),
            caption: stripHtml(blockData.caption || ""),
          };
        }

        return {
          id: block?.id || `paragraph-${index}`,
          type: "paragraph",
          text: stripHtml(blockData.text || block.text || ""),
        };
      })
      .filter((block) => {
        if (block.type === "list") {
          return block.items.length > 0;
        }

        return Boolean(block.text);
      });
  }

  return createParagraphBlocksFromText(fallbackText);
}

function blocksToText(blocks) {
  return blocks
    .flatMap((block) => {
      if (block.type === "list") {
        return block.items;
      }

      return [block.text];
    })
    .filter(Boolean)
    .join(" ");
}

function extractContentText(content, fallbackText = "") {
  if (!content) {
    return stripHtml(fallbackText);
  }

  if (typeof content === "string") {
    const parsedContent = parseContentString(content);

    if (parsedContent) {
      return extractContentText(parsedContent, fallbackText);
    }

    return stripHtml(content);
  }

  if (Array.isArray(content?.blocks)) {
    return blocksToText(normalizeContentBlocks(content, fallbackText));
  }

  return stripHtml(fallbackText);
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

function normalizePost(post, index) {
  const rawExcerpt = post.excerpt || "";
  const contentBlocks = normalizeContentBlocks(post.content, rawExcerpt);
  const contentText = extractContentText(post.content, rawExcerpt);
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
    contentBlocks,
    contentText,
  };
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

  return sortedPosts.map((post, index) => normalizePost(post, index));
}

export function normalizeBlogDetail(post) {
  return normalizePost(post, 0);
}

export function extractCollectionFromResponse(data) {
  return extractCollection(data);
}

export function extractSingleFromResponse(data) {
  return extractSingle(data);
}
