import { useDeferredValue, useMemo, useState, useTransition } from "react";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const PERIOD_OPTIONS = [
  { id: "all", label: "Any date" },
  { id: "fresh", label: "Fresh 7d", days: 7 },
  { id: "recent", label: "Recent 30d", days: 30 },
  { id: "quarter", label: "This quarter", days: 90 },
  { id: "breaking", label: "Breaking only" },
];

const READ_TIME_OPTIONS = [
  { id: "any", label: "Any length" },
  { id: "quick", label: "Quick reads", max: 3 },
  { id: "standard", label: "4-6 min", min: 4, max: 6 },
  { id: "deep", label: "7+ min", min: 7 },
];

const SORT_OPTIONS = [
  { id: "latest", label: "Latest first" },
  { id: "popular", label: "Most viewed" },
  { id: "shortest", label: "Quickest read" },
];

function createLocalDate(value) {
  if (!value) {
    return new Date(0);
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? new Date(0) : parsedDate;
}

function matchesSearch(post, query) {
  if (!query) {
    return true;
  }

  const searchableContent = [
    post.title,
    post.excerpt,
    post.author,
    post.category,
    post.categoryLabel,
    post.contentText,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableContent.includes(query);
}

function matchesPeriod(post, periodId, referenceDate) {
  if (periodId === "all") {
    return true;
  }

  if (periodId === "breaking") {
    return Boolean(post.breaking);
  }

  const option = PERIOD_OPTIONS.find((item) => item.id === periodId);

  if (!option?.days) {
    return true;
  }

  const postTimestamp = createLocalDate(post.publishedAt).getTime();
  const earliestTimestamp = referenceDate.getTime() - option.days * DAY_IN_MS;

  return postTimestamp >= earliestTimestamp;
}

function matchesReadTime(post, readTimeId) {
  if (readTimeId === "any") {
    return true;
  }

  const option = READ_TIME_OPTIONS.find((item) => item.id === readTimeId);

  if (!option) {
    return true;
  }

  const minutes = Number(post.readTimeMinutes) || 0;
  const minMatches = option.min ? minutes >= option.min : true;
  const maxMatches = option.max ? minutes <= option.max : true;

  return minMatches && maxMatches;
}

function compareByPublishedDate(left, right) {
  return (
    createLocalDate(right.publishedAt).getTime() -
    createLocalDate(left.publishedAt).getTime()
  );
}

function sortPosts(posts, sortBy) {
  const sortablePosts = [...posts];

  sortablePosts.sort((left, right) => {
    if (sortBy === "popular") {
      const byViews = right.views - left.views;
      return byViews || compareByPublishedDate(left, right);
    }

    if (sortBy === "shortest") {
      const byReadTime = left.readTimeMinutes - right.readTimeMinutes;
      return byReadTime || compareByPublishedDate(left, right);
    }

    return compareByPublishedDate(left, right);
  });

  return sortablePosts;
}

function buildReferenceDate(posts) {
  if (!posts.length) {
    return new Date();
  }

  const latestTimestamp = Math.max(
    ...posts.map((post) => createLocalDate(post.publishedAt).getTime()),
  );

  return Number.isFinite(latestTimestamp)
    ? new Date(latestTimestamp)
    : new Date();
}

export function useBlogFilters({ posts, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedReadTime, setSelectedReadTime] = useState("any");
  const [sortBy, setSortBy] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const deferredSearchTerm = useDeferredValue(normalizedSearchTerm);
  const referenceDate = useMemo(() => buildReferenceDate(posts), [posts]);

  const baseFilteredPosts = useMemo(() => {
    return posts.filter((post) => {
      return (
        matchesSearch(post, deferredSearchTerm) &&
        matchesPeriod(post, selectedPeriod, referenceDate) &&
        matchesReadTime(post, selectedReadTime)
      );
    });
  }, [deferredSearchTerm, posts, referenceDate, selectedPeriod, selectedReadTime]);

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      count:
        category.id === "all"
          ? baseFilteredPosts.length
          : baseFilteredPosts.filter((post) => post.category === category.id).length,
    }));
  }, [baseFilteredPosts, categories]);

  const filteredPosts = useMemo(() => {
    const categoryMatches = baseFilteredPosts.filter((post) => {
      return selectedCategory === "all" || post.category === selectedCategory;
    });

    return sortPosts(categoryMatches, sortBy);
  }, [baseFilteredPosts, selectedCategory, sortBy]);

  const latestPosts = useMemo(() => sortPosts(posts, "latest"), [posts]);

  const feedCategoryOptions = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      count:
        category.id === "all"
          ? posts.length
          : posts.filter((post) => post.category === category.id).length,
    }));
  }, [categories, posts]);

  const selectedSortOption =
    SORT_OPTIONS.find((option) => option.id === sortBy) ?? SORT_OPTIONS[0];
  const selectedPeriodOption =
    PERIOD_OPTIONS.find((option) => option.id === selectedPeriod) ??
    PERIOD_OPTIONS[0];
  const selectedReadTimeOption =
    READ_TIME_OPTIONS.find((option) => option.id === selectedReadTime) ??
    READ_TIME_OPTIONS[0];

  const activeCategory =
    categoryOptions.find((category) => category.id === selectedCategory) ??
    categoryOptions[0] ??
    categories[0];

  const hasRefinedView =
    Boolean(normalizedSearchTerm) ||
    selectedCategory !== "all" ||
    selectedPeriod !== "all" ||
    selectedReadTime !== "any" ||
    sortBy !== "latest";

  const featuredPost = useMemo(() => {
    if (!latestPosts.length) {
      return null;
    }

    return latestPosts.find((post) => post.featured) ?? latestPosts[0];
  }, [latestPosts]);

  const listPosts = useMemo(() => {
    if (!featuredPost) {
      return latestPosts;
    }

    return latestPosts.filter((post) => post.id !== featuredPost.id);
  }, [featuredPost, latestPosts]);

  const breakingPosts = useMemo(
    () => sortPosts(posts.filter((post) => post.breaking), "latest").slice(0, 6),
    [posts],
  );

  const trendingPosts = useMemo(() => {
    return sortPosts(posts, "popular").slice(0, 5);
  }, [posts]);

  const activeFilters = useMemo(() => {
    const filters = [];

    if (normalizedSearchTerm) {
      filters.push({
        id: "search",
        label: `Search: ${searchTerm.trim()}`,
        tone: "cyan",
      });
    }

    if (selectedCategory !== "all" && activeCategory) {
      filters.push({
        id: "category",
        label: activeCategory.name,
        tone: activeCategory.tone ?? "slate",
      });
    }

    if (selectedPeriod !== "all") {
      filters.push({
        id: "period",
        label: selectedPeriodOption.label,
        tone: "amber",
      });
    }

    if (selectedReadTime !== "any") {
      filters.push({
        id: "read-time",
        label: selectedReadTimeOption.label,
        tone: "indigo",
      });
    }

    if (sortBy !== "latest") {
      filters.push({
        id: "sort",
        label: selectedSortOption.label,
        tone: "slate",
      });
    }

    return filters;
  }, [
    activeCategory,
    normalizedSearchTerm,
    searchTerm,
    selectedCategory,
    selectedPeriod,
    selectedPeriodOption.label,
    selectedReadTime,
    selectedReadTimeOption.label,
    selectedSortOption.label,
    sortBy,
  ]);

  function updateWithTransition(setter, value) {
    startTransition(() => setter(value));
  }

  function clearFilter(filterId) {
    if (filterId === "search") {
      setSearchTerm("");
      return;
    }

    if (filterId === "category") {
      updateWithTransition(setSelectedCategory, "all");
      return;
    }

    if (filterId === "period") {
      updateWithTransition(setSelectedPeriod, "all");
      return;
    }

    if (filterId === "read-time") {
      updateWithTransition(setSelectedReadTime, "any");
      return;
    }

    if (filterId === "sort") {
      updateWithTransition(setSortBy, "latest");
    }
  }

  return {
    searchTerm,
    selectedCategory,
    selectedPeriod,
    selectedReadTime,
    sortBy,
    activeCategory,
    activeFilters,
    activeFilterCount: activeFilters.length,
    categoryOptions,
    feedCategoryOptions,
    featuredPost,
    listPosts,
    searchResults: filteredPosts,
    breakingPosts,
    trendingPosts,
    periodOptions: PERIOD_OPTIONS,
    readTimeOptions: READ_TIME_OPTIONS,
    sortOptions: SORT_OPTIONS,
    selectedPeriodOption,
    selectedReadTimeOption,
    selectedSortOption,
    resultCount: filteredPosts.length,
    hasActiveFilters: hasRefinedView,
    isPending: isPending || normalizedSearchTerm !== deferredSearchTerm,
    handleCategoryChange: (categoryId) =>
      updateWithTransition(setSelectedCategory, categoryId),
    handlePeriodChange: (periodId) =>
      updateWithTransition(setSelectedPeriod, periodId),
    handleReadTimeChange: (readTimeId) =>
      updateWithTransition(setSelectedReadTime, readTimeId),
    handleSortChange: (nextSort) => updateWithTransition(setSortBy, nextSort),
    handleSearchChange: (event) => setSearchTerm(event.target.value),
    applySearchTerm: (value) => setSearchTerm(value),
    clearFilter,
    clearSearch: () => setSearchTerm(""),
    resetFilters: () => {
      startTransition(() => {
        setSelectedCategory("all");
        setSelectedPeriod("all");
        setSelectedReadTime("any");
        setSortBy("latest");
      });
      setSearchTerm("");
    },
  };
}
