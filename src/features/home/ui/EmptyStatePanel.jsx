export function EmptyStatePanel({ activeCategory, onResetFilters }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
        No Stories Found
      </p>
      <h2 className="mt-4 text-3xl font-black text-slate-950">
        Nothing matches the current filter
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
        The current selection for {activeCategory?.name ?? "this section"} did
        not return any results. Clear the filter and search term to restore the
        full newsroom feed.
      </p>
      <button
        type="button"
        onClick={onResetFilters}
        className="mt-8 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
      >
        Reset filters
      </button>
    </div>
  );
}
