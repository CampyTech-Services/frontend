export function EmptyStatePanel({
  activeCategory,
  searchTerm,
  activeFilters,
  onResetFilters,
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_40%)]" />
      <p className="relative text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
        No Stories Found
      </p>
      <h2 className="relative mt-4 text-3xl font-black text-slate-950">
        Nothing fits this newsroom mix yet
      </h2>
      <p className="relative mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
        We could not find any stories in {activeCategory?.name ?? "this section"}
        {searchTerm.trim() ? ` for "${searchTerm.trim()}"` : ""}. Try widening
        the date window, switching categories, or clearing the current filters.
      </p>
      {activeFilters.length > 0 && (
        <div className="relative mt-6 flex flex-wrap justify-center gap-2">
          {activeFilters.map((filter) => (
            <span
              key={filter.id}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600"
            >
              {filter.label}
            </span>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={onResetFilters}
        className="relative mt-8 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
      >
        Reset filters
      </button>
    </div>
  );
}
