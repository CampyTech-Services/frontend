import { useState } from "react";
import { BreakingNewsSection } from "../sections/BreakingNewsSection";
import { EditorialSection } from "../sections/EditorialSection";
import { SearchAndFilterSection } from "../sections/SearchAndFilterSection";
import { useBlogFilters } from "../hooks/useBlogFilters";
import { useHomeFeedData } from "../hooks/useHomeFeedData";
import { useHomeTutorial } from "../hooks/useHomeTutorial";
import { FeedStatusBanner } from "../ui/FeedStatusBanner";
import { HomeTutorialOverlay } from "../ui/HomeTutorialOverlay";
import { NewsSearchModal } from "../ui/NewsSearchModal";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { getNewsletterPreferences } from "@/shared/utils/newsletterPreferences";

export function HomePage() {
  useDocumentTitle("CampyTech Gist | Education News and Opportunities");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const savedNewsletterPreferences = useState(() =>
    getNewsletterPreferences(),
  )[0];
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
    selectedPeriod,
    selectedReadTime,
    sortBy,
    activeCategory,
    activeFilters,
    activeFilterCount,
    categoryOptions,
    feedCategoryOptions,
    featuredPost,
    listPosts,
    searchResults,
    breakingPosts,
    trendingPosts,
    resultCount,
    isPending,
    hasActiveFilters,
    handleCategoryChange,
    handlePeriodChange,
    handleReadTimeChange,
    handleSortChange,
    handleSearchChange,
    applySearchTerm,
    clearFilter,
    clearSearch,
    resetFilters,
    periodOptions,
    readTimeOptions,
    sortOptions,
    selectedPeriodOption,
    selectedReadTimeOption,
    selectedSortOption,
  } = useBlogFilters({
    posts,
    categories,
    initialCategory: savedNewsletterPreferences.categoryId,
    initialSchool: savedNewsletterPreferences.school,
  });

  function openSearchModal() {
    setIsSearchModalOpen(true);
  }

  function closeSearchModal() {
    setIsSearchModalOpen(false);
  }

  function handleSearchSuggestionSelect(value) {
    applySearchTerm(value);
    openSearchModal();
  }

  function handleCategorySearch(categoryId) {
    handleCategoryChange(categoryId);
    openSearchModal();
  }

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
        activeFilters={activeFilters}
        activeFilterCount={activeFilterCount}
        resultCount={resultCount}
        isPending={isPending}
        hasActiveFilters={hasActiveFilters}
        selectedPeriodOption={selectedPeriodOption}
        selectedReadTimeOption={selectedReadTimeOption}
        selectedSortOption={selectedSortOption}
        onOpenSearch={openSearchModal}
        onSearchSuggestionSelect={handleSearchSuggestionSelect}
        onClearSearch={clearSearch}
        onClearFilter={clearFilter}
        onResetFilters={resetFilters}
      />
      <NewsSearchModal
        isOpen={isSearchModalOpen}
        searchTerm={searchTerm}
        activeCategory={activeCategory}
        activeFilters={activeFilters}
        activeFilterCount={activeFilterCount}
        resultCount={resultCount}
        results={searchResults}
        isPending={isPending}
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        selectedPeriod={selectedPeriod}
        selectedReadTime={selectedReadTime}
        sortBy={sortBy}
        hasActiveFilters={hasActiveFilters}
        periodOptions={periodOptions}
        readTimeOptions={readTimeOptions}
        sortOptions={sortOptions}
        selectedPeriodOption={selectedPeriodOption}
        selectedReadTimeOption={selectedReadTimeOption}
        selectedSortOption={selectedSortOption}
        onClose={closeSearchModal}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onPeriodChange={handlePeriodChange}
        onReadTimeChange={handleReadTimeChange}
        onSortChange={handleSortChange}
        onSearchSuggestionSelect={applySearchTerm}
        onClearSearch={clearSearch}
        onClearFilter={clearFilter}
        onResetFilters={resetFilters}
      />
      <EditorialSection
        featuredPost={featuredPost}
        posts={listPosts}
        trendingPosts={trendingPosts}
        categories={feedCategoryOptions}
        onCategoryChange={handleCategorySearch}
      />
    </>
  );
}
