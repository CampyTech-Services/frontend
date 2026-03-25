import { BreakingNewsSection } from "../sections/BreakingNewsSection";
import { EditorialSection } from "../sections/EditorialSection";
import { SearchAndFilterSection } from "../sections/SearchAndFilterSection";
import { useBlogFilters } from "../hooks/useBlogFilters";
import { useHomeFeedData } from "../hooks/useHomeFeedData";
import { useHomeTutorial } from "../hooks/useHomeTutorial";
import { FeedStatusBanner } from "../ui/FeedStatusBanner";
import { HomeTutorialOverlay } from "../ui/HomeTutorialOverlay";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

export function HomePage() {
  useDocumentTitle("CampyTech Gist | Education News and Opportunities");
  const { posts, categories, loading, error, usingFallbackData } =
    useHomeFeedData();
  const {
    showTutorial,
    tutorialStep,
    tutorialSteps,
    setTutorialStep,
    nextStep,
    previousStep,
    completeTutorial,
    restartTutorial,
  } = useHomeTutorial({
    ready: !loading,
  });

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
      <HomeTutorialOverlay
        showTutorial={showTutorial}
        tutorialStep={tutorialStep}
        tutorialSteps={tutorialSteps}
        onSetStep={setTutorialStep}
        onNext={nextStep}
        onPrevious={previousStep}
        onSkip={completeTutorial}
        onRestart={restartTutorial}
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
