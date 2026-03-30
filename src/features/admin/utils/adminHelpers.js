import { EMPTY_COLLECTION } from "../constants";
import {
  formatEditorContent,
  normalizeContentInput,
} from "@/shared/utils/blogContent";

export { formatEditorContent, normalizeContentInput };

export function buildSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function createEmptyCollectionState() {
  return {
    ...EMPTY_COLLECTION,
    items: [],
  };
}

export function normalizeAdminCollection(data) {
  if (Array.isArray(data)) {
    return {
      items: data,
      total: data.length,
      page: 1,
      limit: data.length,
    };
  }

  const collectionCandidates = [
    data?.items,
    data?.data,
    data?.results,
    data?.blogs,
    data?.categories,
    data?.tags,
  ];

  for (const candidate of collectionCandidates) {
    if (!Array.isArray(candidate)) {
      continue;
    }

    return {
      items: candidate,
      total: Number(data?.total ?? candidate.length) || candidate.length,
      page: Number(data?.page ?? 1) || 1,
      limit: Number(data?.limit ?? candidate.length) || candidate.length,
    };
  }

  return createEmptyCollectionState();
}

export function getBlogTagIds(blog) {
  if (Array.isArray(blog?.tagIds)) {
    return blog.tagIds.map((tagId) => String(tagId));
  }

  if (Array.isArray(blog?.tags)) {
    return blog.tags
      .map((tag) => tag?.id)
      .filter(Boolean)
      .map((tagId) => String(tagId));
  }

  return [];
}

export function buildBlogPayload(blogForm) {
  const excerpt = blogForm.excerpt.trim();

  return {
    title: blogForm.title.trim(),
    slug: buildSlug(blogForm.slug || blogForm.title),
    featuredImage: blogForm.featuredImage.trim(),
    content: normalizeContentInput(blogForm.content),
    excerpt: excerpt || undefined,
    categoryId: String(blogForm.categoryId).trim(),
    status: blogForm.status,
    tagIds: blogForm.tags.map((tagId) => String(tagId)),
  };
}

export function buildCategoryPayload(categoryForm) {
  const description = categoryForm.description.trim();

  return {
    name: categoryForm.name.trim(),
    slug: buildSlug(categoryForm.slug || categoryForm.name),
    description: description || undefined,
  };
}

export function buildTagPayload(tagForm) {
  return {
    name: tagForm.name.trim(),
    slug: buildSlug(tagForm.slug || tagForm.name),
  };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function matchesAllowedIp(ipAddress, allowedPatterns) {
  if (!ipAddress) {
    return false;
  }

  return allowedPatterns.some((pattern) => {
    const normalizedPattern = pattern.trim();

    if (!normalizedPattern) {
      return false;
    }

    if (!normalizedPattern.includes("*")) {
      return normalizedPattern === ipAddress;
    }

    const expression = new RegExp(
      `^${escapeRegExp(normalizedPattern).replace(/\\\*/g, ".*")}$`,
    );

    return expression.test(ipAddress);
  });
}

export function parseAllowedIpList(value) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatRelativeDate(value) {
  if (!value) {
    return "Unknown date";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function sortByLatest(items, primaryField = "updatedAt") {
  return [...items].sort((firstItem, secondItem) => {
    const firstValue = new Date(
      firstItem?.[primaryField] || firstItem?.createdAt || 0,
    ).getTime();
    const secondValue = new Date(
      secondItem?.[primaryField] || secondItem?.createdAt || 0,
    ).getTime();

    return secondValue - firstValue;
  });
}

export function resolveCategoryName(blog, categoryMap) {
  return (
    blog?.category?.name ||
    categoryMap.get(String(blog?.categoryId || "")) ||
    "Uncategorized"
  );
}

export function countBlogsForCategory(blogs, categoryId) {
  return blogs.filter((blog) => String(blog.categoryId) === String(categoryId))
    .length;
}

export function countPublishedBlogsForCategory(blogs, categoryId) {
  return blogs.filter(
    (blog) =>
      String(blog.categoryId) === String(categoryId) &&
      blog.status === "PUBLISHED",
  ).length;
}

export function countBlogsForTag(blogs, tagId) {
  return blogs.filter((blog) => getBlogTagIds(blog).includes(String(tagId)))
    .length;
}

export function countPublishedBlogsForTag(blogs, tagId) {
  return blogs.filter(
    (blog) =>
      blog.status === "PUBLISHED" &&
      getBlogTagIds(blog).includes(String(tagId)),
  ).length;
}
