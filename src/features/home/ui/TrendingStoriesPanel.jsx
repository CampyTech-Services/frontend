import { Eye, TrendingUp } from "lucide-react";
import { formatViews } from "../utils/formatters";

export function TrendingStoriesPanel({ posts }) {
  return (
    <section className="rounded-[1.75rem] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-cyan-600" />
        <h2 className="text-xl font-black text-slate-950">Trending Now</h2>
      </div>
      <div className="mt-6 space-y-5">
        {posts.map((post, index) => (
          <article key={post.id} className="flex gap-4">
            <span className="text-3xl font-black leading-none text-cyan-600/35">
              {(index + 1).toString().padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold leading-6 text-slate-900">
                {post.title}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <Eye className="h-3.5 w-3.5" />
                <span>{formatViews(post.views)} views</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
