import { Filter, Search } from "lucide-react";

const toneClasses = {
  slate: {
    active: "bg-slate-950 text-white shadow-lg",
    idle: "bg-slate-100 text-slate-700 hover:bg-slate-200",
  },
  blue: {
    active: "bg-blue-600 text-white shadow-lg",
    idle: "bg-blue-50 text-blue-700 hover:bg-blue-100",
  },
  cyan: {
    active: "bg-cyan-600 text-white shadow-lg",
    idle: "bg-cyan-50 text-cyan-700 hover:bg-cyan-100",
  },
  emerald: {
    active: "bg-emerald-600 text-white shadow-lg",
    idle: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  },
  amber: {
    active: "bg-amber-500 text-white shadow-lg",
    idle: "bg-amber-50 text-amber-700 hover:bg-amber-100",
  },
  rose: {
    active: "bg-rose-600 text-white shadow-lg",
    idle: "bg-rose-50 text-rose-700 hover:bg-rose-100",
  },
  indigo: {
    active: "bg-indigo-600 text-white shadow-lg",
    idle: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
  },
  orange: {
    active: "bg-orange-500 text-white shadow-lg",
    idle: "bg-orange-50 text-orange-700 hover:bg-orange-100",
  },
};

export function SearchAndFilterSection({
  searchTerm,
  activeCategory,
  resultCount,
  isPending,
  categories,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}) {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={onSearchChange}
                placeholder="Search admission updates, scholarships, school news..."
                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-12 py-3.5 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-700">
                {resultCount} {resultCount === 1 ? "story" : "stories"}
              </span>
              <span className="rounded-full bg-cyan-50 px-4 py-2 font-semibold text-cyan-700">
                {activeCategory?.name}
              </span>
              {isPending && (
                <span className="text-sm font-medium text-slate-500">
                  Updating feed...
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-[73px] z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl sm:top-[89px]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="scrollbar-hide flex items-center gap-3 overflow-x-auto pb-1">
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-500">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </div>

            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              const tone = toneClasses[category.tone] ?? toneClasses.slate;
              const countClassName = isActive
                ? "bg-white/20 text-current"
                : "bg-white/80 text-slate-500";

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategoryChange(category.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
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
          </div>
        </div>
      </section>
    </>
  );
}
