import { useDeferredValue, useMemo, useState, useTransition } from "react";

function matchesSearch(post, query) {
  if (!query) {
    return true;
  }

  const searchableContent =
    `${post.title} ${post.excerpt} ${post.author} ${post.category} ${post.categoryLabel || ""}`.toLowerCase();
  return searchableContent.includes(query);
}

export function useBlogFilters({ posts, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredSearchTerm = useDeferredValue(searchTerm.trim().toLowerCase());

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      count:
        category.id === "all"
          ? posts.length
          : posts.filter((post) => post.category === category.id).length,
    }));
  }, [categories, posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatches =
        selectedCategory === "all" || post.category === selectedCategory;

      return categoryMatches && matchesSearch(post, deferredSearchTerm);
    });
  }, [deferredSearchTerm, posts, selectedCategory]);

  const featuredPost = useMemo(() => {
    if (!filteredPosts.length) {
      return null;
    }

    return filteredPosts.find((post) => post.featured) ?? filteredPosts[0];
  }, [filteredPosts]);

  const listPosts = useMemo(() => {
    if (!featuredPost) {
      return filteredPosts;
    }

    return filteredPosts.filter((post) => post.id !== featuredPost.id);
  }, [featuredPost, filteredPosts]);

  const breakingPosts = useMemo(
    () => posts.filter((post) => post.breaking),
    [posts],
  );

  const trendingPosts = useMemo(() => {
    return [...posts].sort((left, right) => right.views - left.views).slice(0, 5);
  }, [posts]);

  const activeCategory =
    categoryOptions.find((category) => category.id === selectedCategory) ??
    categoryOptions[0];

  return {
    searchTerm,
    selectedCategory,
    activeCategory,
    categoryOptions,
    featuredPost,
    listPosts,
    breakingPosts,
    trendingPosts,
    resultCount: filteredPosts.length,
    isPending,
    handleCategoryChange: (categoryId) =>
      startTransition(() => setSelectedCategory(categoryId)),
    handleSearchChange: (event) => setSearchTerm(event.target.value),
    resetFilters: () => {
      startTransition(() => setSelectedCategory("all"));
      setSearchTerm("");
    },
  };
}
