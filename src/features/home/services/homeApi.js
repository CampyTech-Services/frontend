import { apiClient } from "@/shared/utils/client";
import {
  extractCollectionFromResponse,
  normalizeHomePosts,
} from "../utils/postNormalizer";

const endpointCandidates = [
  import.meta.env.VITE_PUBLIC_BLOG_ENDPOINT,
  "/api/blog/published",
  "/api/blog",
  "/api/blog/all",
  "/api/blogs",
].filter(Boolean);

export async function getHomepageBlogs() {
  let lastError = null;

  for (const endpoint of endpointCandidates) {
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

  throw lastError ?? new Error("Unable to load homepage blogs from the backend.");
}
