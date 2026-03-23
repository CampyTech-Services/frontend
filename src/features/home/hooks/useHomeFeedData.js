import { useEffect, useState } from "react";
import { blogPosts as fallbackPosts } from "../data/blogPosts";
import { buildBlogCategories } from "../data/categories";
import { getHomepageBlogs } from "../services/homeApi";

function getErrorMessage(error) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to load latest stories from the backend.";
}

export function useHomeFeedData() {
  const [posts, setPosts] = useState(fallbackPosts);
  const [categories, setCategories] = useState(buildBlogCategories(fallbackPosts));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usingFallbackData, setUsingFallbackData] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      setLoading(true);
      setError("");

      try {
        const livePosts = await getHomepageBlogs();

        if (!isMounted) {
          return;
        }

        setPosts(livePosts);
        setCategories(buildBlogCategories(livePosts));
        setUsingFallbackData(false);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setPosts(fallbackPosts);
        setCategories(buildBlogCategories(fallbackPosts));
        setUsingFallbackData(true);
        setError(getErrorMessage(loadError));
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    posts,
    categories,
    loading,
    error,
    usingFallbackData,
  };
}
