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
        console.log('Hmmm.. here?');
        continue;
      }

      return normalizeBlogDetail(item);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Unable to load blog details from the backend.");
}
