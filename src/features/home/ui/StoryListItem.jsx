import { Bookmark, CalendarDays, Eye, Share2 } from "lucide-react";
import { formatArticleDate, formatViews } from "../utils/formatters";

export function StoryListItem({ post }) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(14,116,144,0.12)]">
      <div className="md:flex">
        <div className="relative h-56 overflow-hidden md:h-auto md:w-72 lg:w-80">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute left-4 top-4 rounded-full bg-cyan-600 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white">
            {post.categoryLabel || post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <h3 className="text-2xl font-black leading-tight text-slate-950 transition group-hover:text-cyan-700">
              {post.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              {post.excerpt}
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
                <span>{formatViews(post.views)}</span>
              </span>
              <span>{post.readTimeMinutes} min read</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-full px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-50"
              >
                Read Story
              </button>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-cyan-200 hover:text-cyan-700"
                aria-label="Share article"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-cyan-200 hover:text-cyan-700"
                aria-label="Bookmark article"
              >
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
