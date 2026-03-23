import { BreakingNewsSection } from "../sections/BreakingNewsSection";
import { EditorialSection } from "../sections/EditorialSection";
import { SearchAndFilterSection } from "../sections/SearchAndFilterSection";
import { useBlogFilters } from "../hooks/useBlogFilters";
import { useHomeFeedData } from "../hooks/useHomeFeedData";
import { FeedStatusBanner } from "../ui/FeedStatusBanner";

export function HomePage() {
  const { posts, categories, loading, error, usingFallbackData } =
    useHomeFeedData();

  const {
    searchTerm,
    selectedCategory,
    activeCategory,
    categoryOptions,
    featuredPost,
    listPosts,
    breakingPosts,
    trendingPosts,
    resultCount,
    isPending,
    handleCategoryChange,
    handleSearchChange,
    resetFilters,
  } = useBlogFilters({
    posts,
    categories,
  });

  return (
    <>
      <BreakingNewsSection posts={breakingPosts} />
      <FeedStatusBanner
        loading={loading}
        error={error}
        usingFallbackData={usingFallbackData}
      />
      <SearchAndFilterSection
        searchTerm={searchTerm}
        activeCategory={activeCategory}
        resultCount={resultCount}
        isPending={isPending}
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      <EditorialSection
        featuredPost={featuredPost}
        posts={listPosts}
        trendingPosts={trendingPosts}
        categories={categoryOptions}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onResetFilters={resetFilters}
      />
    </>
  );
}
