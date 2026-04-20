import { ArrowUpRight, Filter, Search, Sparkles, X } from "lucide-react";

const searchSuggestions = [
  "Admission list",
  "Scholarships",
  "JAMB update",
  "NYSC mobilization",
];

const previewToneClasses = {
  slate: "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200",
  blue: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100",
  emerald:
    "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  amber: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
  rose: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
  indigo: "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
  orange: "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100",
};

function StatCard({ label, value, detail }) {
  return (
    <div className="animate-fade-up rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
    </div>
  );
}

export function SearchAndFilterSection({
  searchTerm,
  activeCategory,
  activeFilters,
  activeFilterCount,
  resultCount,
  isPending,
  hasActiveFilters,
  selectedPeriodOption,
  selectedReadTimeOption,
  selectedSortOption,
  onOpenSearch,
  onSearchSuggestionSelect,
  onClearSearch,
  onClearFilter,
  onResetFilters,
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ecfeff_0%,#f8fafc_42%,#ffffff_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute left-[-3rem] top-10 h-36 w-36 rounded-full bg-cyan-300/25 blur-3xl" />
        <div className="animate-float-delay absolute right-[-2rem] top-8 h-44 w-44 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="animate-float-slow absolute bottom-8 left-1/3 h-28 w-28 rounded-full bg-amber-200/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
          <section
            data-tutorial-id="search-bar"
            className="animate-fade-up relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.09)] backdrop-blur-xl sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.12),transparent_32%)]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white">
                <Sparkles className="h-4 w-4" />
                <span>News Finder</span>
              </div>

              <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Open a dedicated search modal for fast, focused story discovery
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Search for admission updates, scholarships, JAMB notices, and
                campus stories inside a modal with filters and direct links to
                each full article.
              </p>

              <button
                type="button"
                onClick={onOpenSearch}
                className="mt-6 flex w-full items-center gap-3 rounded-[1.6rem] border border-white/80 bg-white/90 px-4 py-4 text-left shadow-[0_18px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:ring-cyan-300"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                  <Search className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
                    Open Search Modal
                  </span>
                  <p className="mt-1 truncate text-base text-slate-900 sm:text-lg">
                    {searchTerm ? searchTerm : " "}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
                  <span>{isPending ? "Updating" : "Search"}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>

              <div className="mt-5 flex flex-wrap items-center gap-2">
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
          </section>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <StatCard
              label="Search Matches"
              value={`${resultCount}`}
              detail={
                resultCount === 1
                  ? "One story is ready in the search modal"
                  : `${resultCount} stories are ready in the search modal`
              }
            />
            <StatCard
              label="Current Lens"
              value={activeCategory?.name ?? "All News"}
              detail={
                hasActiveFilters
                  ? `${activeFilterCount} active refinements shaping results`
                  : "No filters applied yet"
              }
            />
            <StatCard
              label="Search Stack"
              value={selectedSortOption.label}
              detail={`${selectedPeriodOption.label} / ${selectedReadTimeOption.label}`}
            />
          </div>
        </div>

        <section
          data-tutorial-id="category-filter"
          className="animate-fade-up mt-6 rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                <Filter className="h-4 w-4" />
                <span>Filter Preview</span>
              </div>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                Manage filters inside the modal and open articles from there
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                The homepage stays clean while search, sorting, and category
                exploration happen in a focused overlay.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenSearch}
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
              >
                Open search modal
              </button>
              <button
                type="button"
                onClick={onResetFilters}
                disabled={!hasActiveFilters}
                className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
              >
                Reset filters
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {searchTerm ? (
              <button
                type="button"
                onClick={onClearSearch}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-100"
              >
                <span>Search: {searchTerm}</span>
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                No search text yet
              </span>
            )}

            {hasActiveFilters ? (
              activeFilters
                .filter((filter) => filter.id !== "search")
                .map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => onClearFilter(filter.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      previewToneClasses[filter.tone] ??
                      previewToneClasses.slate
                    }`}
                  >
                    <span>{filter.label}</span>
                    <X className="h-3.5 w-3.5" />
                  </button>
                ))
            ) : (
              <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                Filters become active after you refine results in the modal
              </span>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
