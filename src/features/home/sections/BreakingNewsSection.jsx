import { BellRing } from "lucide-react";

export function BreakingNewsSection({ posts }) {
  if (!posts.length) {
    return null;
  }

  const tickerPosts = [...posts, ...posts];

  return (
    <section className="border-b border-red-700 bg-red-600 text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-red-600">
          <BellRing className="h-3.5 w-3.5" />
          <span>Breaking</span>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="marquee-track animate-marquee whitespace-nowrap">
            {tickerPosts.map((post, index) => (
              <span
                key={`${post.id}-${index}`}
                className="mx-8 inline-flex items-center gap-3 text-sm font-medium text-red-50"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span>{post.title}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
