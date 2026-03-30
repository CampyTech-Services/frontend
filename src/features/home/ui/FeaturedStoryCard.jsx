import {
  Bookmark,
  CalendarDays,
  ChevronRight,
  Eye,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatArticleDate, formatViews } from "../utils/formatters";

export function FeaturedStoryCard({ post }) {
  if (!post) {
    return null;
  }

  return (
    <article
      data-tutorial-id="featured-post"
      className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70"
    >
      <div className="relative h-[26rem] overflow-hidden sm:h-[32rem]">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white">
            Featured
          </span>
          <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white">
            {post.categoryLabel || post.category}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <h2 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl">
            {post.title}
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-medium text-white/85">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{formatArticleDate(post.publishedAt)}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{formatViews(post.views)} views</span>
            </span>
            <span>{post.readTimeMinutes} min read</span>
            <span>{post.author}</span>
          </div>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <p className="max-w-3xl text-base leading-7 text-slate-600">
          {post.excerpt}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-5 py-3 text-sm font-semibold text-cyan-800 transition hover:border-cyan-300 hover:bg-cyan-100"
          >
            <span>Read Full Story</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-cyan-200 hover:text-cyan-700"
              aria-label="Share article"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-cyan-200 hover:text-cyan-700"
              aria-label="Bookmark article"
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
