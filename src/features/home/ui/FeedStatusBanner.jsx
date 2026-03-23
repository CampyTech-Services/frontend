import { LoaderCircle, TriangleAlert } from "lucide-react";

export function FeedStatusBanner({ loading, error, usingFallbackData }) {
  if (loading) {
    return (
      <div className="mx-auto mt-6 flex max-w-7xl items-center gap-3 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-800">
        <LoaderCircle className="h-4 w-4 animate-spin" />
        <span>Loading latest stories from the backend...</span>
      </div>
    );
  }

  if (error && usingFallbackData) {
    return (
      <div className="mx-auto mt-6 flex max-w-7xl items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
        <TriangleAlert className="h-4 w-4" />
        <span>Live blog feed unavailable. Showing fallback staging stories.</span>
      </div>
    );
  }

  return null;
}
