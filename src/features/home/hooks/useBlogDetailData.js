import { useEffect, useState } from "react";
import { blogPosts as fallbackPosts } from "../data/blogPosts";
import { getBlogPostBySlug, getHomepageBlogs } from "../services/homeApi";
import { normalizeHomePosts } from "../utils/postNormalizer";

function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to load this story right now.";
}

export function useBlogDetailData(slug) {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usingFallbackData, setUsingFallbackData] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadBlogDetail() {
      setLoading(true);
      setError("");

      try {
        const [detailPost, homepagePosts] = await Promise.all([
          getBlogPostBySlug(slug),
          getHomepageBlogs().catch(() => []),
        ]);

        if (!isMounted) {
          return;
        }

        setPost(detailPost);
        setRelatedPosts(
          homepagePosts.filter((item) => item.slug !== detailPost.slug).slice(0, 4),
        );
        setUsingFallbackData(false);
      } catch (detailError) {
        if (!isMounted) {
          return;
        }

        const normalizedFallbackPosts = normalizeHomePosts(fallbackPosts);
        const fallbackPost =
          normalizedFallbackPosts.find((item) => item.slug === slug) ?? null;

        setPost(fallbackPost);
        setRelatedPosts(
          normalizedFallbackPosts
            .filter((item) => item.slug !== slug)
            .slice(0, 4),
        );
        setUsingFallbackData(Boolean(fallbackPost));
        setError(getErrorMessage(detailError));
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadBlogDetail();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return {
    post,
    relatedPosts,
    loading,
    error,
    usingFallbackData,
  };
}
