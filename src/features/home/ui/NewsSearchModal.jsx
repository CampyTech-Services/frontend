import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Eye,
  Filter,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { HighlightedText } from "./HighlightedText";
import { formatArticleDate, formatViews } from "../utils/formatters";

const searchSuggestions = [
  "Admission list",
  "Scholarships",
  "JAMB update",
  "NYSC mobilization",
];

const categoryToneClasses = {
  slate: {
    active:
      "border-slate-950 bg-slate-950 text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)]",
    idle:
      "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50",
  },
  blue: {
    active:
      "border-blue-600 bg-blue-600 text-white shadow-[0_18px_44px_rgba(37,99,235,0.22)]",
    idle:
      "border-blue-200 bg-blue-50/80 text-blue-700 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-100",
  },
  cyan: {
    active:
      "border-cyan-600 bg-cyan-600 text-white shadow-[0_18px_44px_rgba(8,145,178,0.22)]",
    idle:
      "border-cyan-200 bg-cyan-50/80 text-cyan-700 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-100",
  },
  emerald: {
    active:
      "border-emerald-600 bg-emerald-600 text-white shadow-[0_18px_44px_rgba(5,150,105,0.22)]",
    idle:
      "border-emerald-200 bg-emerald-50/80 text-emerald-700 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-100",
  },
  amber: {
    active:
      "border-amber-500 bg-amber-500 text-white shadow-[0_18px_44px_rgba(245,158,11,0.22)]",
    idle:
      "border-amber-200 bg-amber-50/80 text-amber-700 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-100",
  },
  rose: {
    active:
      "border-rose-600 bg-rose-600 text-white shadow-[0_18px_44px_rgba(225,29,72,0.22)]",
    idle:
      "border-rose-200 bg-rose-50/80 text-rose-700 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-100",
  },
  indigo: {
    active:
      "border-indigo-600 bg-indigo-600 text-white shadow-[0_18px_44px_rgba(79,70,229,0.22)]",
    idle:
      "border-indigo-200 bg-indigo-50/80 text-indigo-700 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-100",
  },
  orange: {
    active:
      "border-orange-500 bg-orange-500 text-white shadow-[0_18px_44px_rgba(249,115,22,0.22)]",
    idle:
      "border-orange-200 bg-orange-50/80 text-orange-700 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-100",
  },
};

const activeFilterToneClasses = {
  slate: "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200",
  blue: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  amber: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
  rose: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
  indigo: "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
  orange: "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100",
};

function PillButton({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? "border-slate-950 bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)]"
          : "border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function FilterGroup({ label, children }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/70 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function SearchResultCard({ post, query, onOpen, featured = false }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      onClick={onOpen}
      className={`group block overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-[0_22px_60px_rgba(8,145,178,0.12)] ${
        featured ? "shadow-[0_24px_70px_rgba(15,23,42,0.1)]" : "shadow-sm"
      }`}
    >
      <div className={featured ? "lg:flex" : ""}>
        <div
          className={`relative overflow-hidden ${
            featured ? "h-64 lg:h-auto lg:w-[20rem]" : "h-48"
          }`}
        >
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute left-4 top-4 rounded-full bg-slate-950 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white">
            {featured ? "Top Match" : post.categoryLabel || post.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              <span>{post.categoryLabel || post.category}</span>
              <span>{post.author}</span>
            </div>
            <h3
              className={`mt-3 font-black leading-tight text-slate-950 transition group-hover:text-cyan-700 ${
                featured ? "text-3xl" : "text-xl"
              }`}
            >
              <HighlightedText text={post.title} query={query} />
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              <HighlightedText text={post.excerpt} query={query} />
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{formatArticleDate(post.publishedAt)}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{formatViews(post.views)} views</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                <span>{post.readTimeMinutes} min read</span>
              </span>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition group-hover:bg-cyan-100">
              <span>Open full story</span>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function EmptySearchState({ hasActiveFilters, onResetFilters }) {
  return (
    <div className="flex min-h-[24rem] items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
      <div className="max-w-xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">
          No matching stories
        </p>
        <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
          Nothing matches this search yet
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          Try a broader keyword, switch categories, or clear the active filters
          to reopen the full newsroom.
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}

export function NewsSearchModal({
  isOpen,
  searchTerm,
  activeCategory,
  activeFilters,
  activeFilterCount,
  resultCount,
  results,
  isPending,
  categories,
  selectedCategory,
  selectedPeriod,
  selectedReadTime,
  sortBy,
  hasActiveFilters,
  periodOptions,
  readTimeOptions,
  sortOptions,
  selectedPeriodOption,
  selectedReadTimeOption,
  selectedSortOption,
  onClose,
  onSearchChange,
  onCategoryChange,
  onPeriodChange,
  onReadTimeChange,
  onSortChange,
  onSearchSuggestionSelect,
  onClearSearch,
  onClearFilter,
  onResetFilters,
}) {
  const inputRef = useRef(null);
  const featuredResult = results[0] ?? null;
  const secondaryResults = featuredResult ? results.slice(1) : results;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[90] p-4 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-md" />

      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_100%)] shadow-[0_40px_120px_rgba(15,23,42,0.35)] animate-fade-up">
        <div className="relative border-b border-slate-200/80 bg-white/90 px-5 py-5 backdrop-blur-xl sm:px-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_26%)]" />

          <div className="relative flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white">
                  <Sparkles className="h-4 w-4" />
                  <span>Search Results Modal</span>
                </div>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
                  Search, filter, and open the full story in one flow
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                  Click any result card to jump straight into the article detail
                  page.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
                aria-label="Close search modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <label className="block flex-1">
                <div className="flex items-center gap-3 rounded-[1.5rem] border border-white/80 bg-white px-4 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition focus-within:ring-cyan-300">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <Search className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
                      Search The Newsroom
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchTerm}
                      onChange={onSearchChange}
                      placeholder='Search "admission list", "scholarship", or "JAMB update"'
                      className="mt-1 w-full border-none bg-transparent p-0 text-base text-slate-900 outline-none placeholder:text-slate-400 sm:text-lg"
                    />
                  </div>
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={onClearSearch}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                  {resultCount} {resultCount === 1 ? "story" : "stories"}
                </span>
                <span className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                  {activeCategory?.name ?? "All News"}
                </span>
                {isPending && (
                  <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                    Updating results...
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                Quick starts
              </span>
              {searchSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => onSearchSuggestionSelect(suggestion)}
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <aside className="min-h-0 overflow-y-auto border-b border-slate-200 bg-white/75 p-5 backdrop-blur-xl lg:border-b-0 lg:border-r sm:p-6">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              <Filter className="h-4 w-4" />
              <span>Search Controls</span>
            </div>

            <div className="mt-5 space-y-4">
              <FilterGroup label="Categories">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  const tone =
                    categoryToneClasses[category.tone] ?? categoryToneClasses.slate;
                  const countClassName = isActive
                    ? "bg-white/20 text-current"
                    : "bg-white/80 text-slate-500";

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => onCategoryChange(category.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                        isActive ? tone.active : tone.idle
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category.name}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${countClassName}`}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </FilterGroup>

              <FilterGroup label="Freshness">
                {periodOptions.map((option) => (
                  <PillButton
                    key={option.id}
                    active={selectedPeriod === option.id}
                    label={option.label}
                    onClick={() => onPeriodChange(option.id)}
                  />
                ))}
              </FilterGroup>

              <FilterGroup label="Read Length">
                {readTimeOptions.map((option) => (
                  <PillButton
                    key={option.id}
                    active={selectedReadTime === option.id}
                    label={option.label}
                    onClick={() => onReadTimeChange(option.id)}
                  />
                ))}
              </FilterGroup>

              <FilterGroup label="Sort Order">
                {sortOptions.map((option) => (
                  <PillButton
                    key={option.id}
                    active={sortBy === option.id}
                    label={option.label}
                    onClick={() => onSortChange(option.id)}
                  />
                ))}
              </FilterGroup>
            </div>
          </aside>

          <div className="min-h-0 overflow-y-auto p-5 sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Search Snapshot
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  {resultCount === 1
                    ? "1 result ready to open"
                    : `${resultCount} results ready to open`}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {selectedSortOption.label} / {selectedPeriodOption.label} /{" "}
                  {selectedReadTimeOption.label}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    hasActiveFilters
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {hasActiveFilters
                    ? `${activeFilterCount} active filters`
                    : "Default search view"}
                </span>
                <button
                  type="button"
                  onClick={onResetFilters}
                  disabled={!hasActiveFilters}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Reset filters
                </button>
              </div>
            </div>

            {activeFilters.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => onClearFilter(filter.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      activeFilterToneClasses[filter.tone] ??
                      activeFilterToneClasses.slate
                    }`}
                  >
                    <span>{filter.label}</span>
                    <X className="h-3.5 w-3.5" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 space-y-5">
              {featuredResult ? (
                <>
                  <SearchResultCard
                    post={featuredResult}
                    query={searchTerm}
                    onOpen={onClose}
                    featured
                  />
                  {secondaryResults.length > 0 && (
                    <div className="grid gap-5 xl:grid-cols-2">
                      {secondaryResults.map((post) => (
                        <SearchResultCard
                          key={post.id}
                          post={post}
                          query={searchTerm}
                          onOpen={onClose}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <EmptySearchState
                  hasActiveFilters={hasActiveFilters}
                  onResetFilters={onResetFilters}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
