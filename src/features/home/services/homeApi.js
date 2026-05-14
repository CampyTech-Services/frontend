import { apiClient } from "@/shared/utils/client";
import {
  extractCollectionFromResponse,
  extractSingleFromResponse,
  normalizeBlogDetail,
  normalizeHomePosts,
} from "../utils/postNormalizer";

const listEndpointCandidates = [
  import.meta.env.VITE_PUBLIC_BLOG_ENDPOINT,
  "/api/blog/published",
].filter(Boolean);

const searchEndpointCandidates = [
  import.meta.env.VITE_PUBLIC_BLOG_SEARCH_ENDPOINT,
  "/api/blog/search",
].filter(Boolean);

function resolveDetailEndpoint(template, slug) {
  if (template.includes(":slug")) {
    return template.replace(":slug", slug);
  }

  if (template.includes("{slug}")) {
    return template.replace("{slug}", slug);
  }

  if (template.includes("[slug]")) {
    return template.replace("[slug]", slug);
  }

  return template.endsWith("/") ? `${template}${slug}` : `${template}/${slug}`;
}

export async function getHomepageBlogs() {
  let lastError = null;

  for (const endpoint of listEndpointCandidates) {
    try {
      const response = await apiClient.get(endpoint);
      const { found, items } = extractCollectionFromResponse(response.data);

      if (!found) {
        continue;
      }

      return normalizeHomePosts(items);
    } catch (error) {
      lastError = error;
    }
  }

  throw (
    lastError ?? new Error("Unable to load homepage blogs from the backend.")
  );
}

export async function searchHomepageBlogs(
  { query = "", categorySlug = "", categoryId = "", page = 1, limit = 50 },
  config = {},
) {
  let lastError = null;
  const params = {
    page,
    limit,
    ...(query ? { q: query } : {}),
    ...(categoryId ? { categoryId } : {}),
    ...(categorySlug && categorySlug !== "all" ? { categorySlug } : {}),
  };

  for (const endpoint of searchEndpointCandidates) {
    try {
      const response = await apiClient.get(endpoint, {
        ...config,
        params: {
          ...(config.params || {}),
          ...params,
        },
      });
      const { found, items } = extractCollectionFromResponse(response.data);

      if (!found) {
        continue;
      }

      return normalizeHomePosts(items);
    } catch (error) {
      lastError = error;

      if (config.signal?.aborted) {
        throw error;
      }
    }
  }

  throw lastError ?? new Error("Unable to search blogs from the backend.");
}

export async function getBlogPostBySlug(slug) {
  const detailEndpointCandidates = [
    import.meta.env.VITE_PUBLIC_BLOG_DETAIL_ENDPOINT,
    "/api/blog/slug/:slug",
    "/api/blog/:slug",
    "/api/blogs/:slug",
  ].filter(Boolean);

  let lastError = null;

  for (const endpointTemplate of detailEndpointCandidates) {
    try {
      const response = await apiClient.get(
        resolveDetailEndpoint(endpointTemplate, slug),
      );
      const { found, item } = extractSingleFromResponse(response.data);

      if (!found || !item) {
        continue;
      }

      return normalizeBlogDetail(item);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Unable to load blog details from the backend.");
}

export async function submitFeatureFeedback(payload) {
  const response = await apiClient.post("/feedback", payload);
  return response.data;
}

export async function getPublishedCourses() {
  const response = await apiClient.get("/courses", {
    params: {
      page: 1,
      limit: 20,
    },
  });
  const { found, items } = extractCollectionFromResponse(response.data);
  return found ? items : [];
}
