import { ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatArticleDate } from "../utils/formatters";

export function RelatedStoriesPanel({ posts }) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="rounded-[1.75rem] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70">
      <h2 className="text-xl font-black text-slate-950">More Stories</h2>
      <div className="mt-5 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-slate-200 p-4 transition hover:border-cyan-200 hover:bg-slate-50"
          >
            <div className="flex gap-4">
              <img
                src={post.image}
                alt={post.title}
                className="h-20 w-20 rounded-2xl object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">
                  {post.categoryLabel || post.category}
                </p>
                <h3 className="mt-2 text-sm font-bold leading-6 text-slate-950 transition group-hover:text-cyan-700">
                  {post.title}
                </h3>
                <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    <span>{formatArticleDate(post.publishedAt)}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-slate-700" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
