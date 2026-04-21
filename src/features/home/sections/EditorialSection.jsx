import { CategoryListPanel } from "../ui/CategoryListPanel";
import { EmptyStatePanel } from "../ui/EmptyStatePanel";
import { FeaturedStoryCard } from "../ui/FeaturedStoryCard";
import { NewsletterPanel } from "../ui/NewsletterPanel";
import { SocialLinksPanel } from "../ui/SocialLinksPanel";
import { StoryListItem } from "../ui/StoryListItem";
import { TrendingStoriesPanel } from "../ui/TrendingStoriesPanel";

export function EditorialSection({
  featuredPost,
  posts,
  trendingPosts,
  categories,
  onCategoryChange,
}) {
  const sidebarCategories = categories.filter(
    (category) => category.id !== "all",
  );
  const hasStories = Boolean(featuredPost || posts.length);

  return (
    <section id="latest-stories" className="px-4 py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-700">
              Latest Coverage
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Campus updates, admission news, and scholarship alerts in one feed
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Browse the full newsroom here, then use the search modal above any
            time you want a faster path to a specific story or filtered result
            set.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.7fr)_22rem]">
          <div>
            {hasStories ? (
              <>
                <FeaturedStoryCard post={featuredPost} />
                <div className="mt-8 space-y-6">
                  {posts.map((post, index) => (
                    <StoryListItem key={post.id} post={post} index={index} />
                  ))}
                </div>
              </>
            ) : (
              <EmptyStatePanel
                activeCategory={{ name: "the newsroom" }}
                searchTerm=""
                activeFilters={[]}
                onResetFilters={() => {}}
              />
            )}
          </div>

          <aside
            id="browse-categories"
            className="space-y-6 xl:sticky xl:top-[118px] xl:self-start"
          >
            <TrendingStoriesPanel posts={trendingPosts} />
            <CategoryListPanel
              categories={sidebarCategories}
              onCategoryChange={onCategoryChange}
            />
            <NewsletterPanel categories={sidebarCategories} />
            <SocialLinksPanel />
          </aside>
        </div>
      </div>
    </section>
  );
}
