import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  ChevronRight,
  Eye,
  LoaderCircle,
  Share2,
  TriangleAlert,
  User2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { useBlogDetailData } from "../hooks/useBlogDetailData";
import { BlogArticleContent } from "../ui/BlogArticleContent";
import { NewsletterPanel } from "../ui/NewsletterPanel";
import { RelatedStoriesPanel } from "../ui/RelatedStoriesPanel";
import { SocialLinksPanel } from "../ui/SocialLinksPanel";
import { formatArticleDate, formatViews } from "../utils/formatters";

function BlogDetailLoadingState() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex min-h-[50vh] items-center justify-center rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="text-center">
          <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-cyan-600" />
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading story details...
          </p>
        </div>
      </div>
    </div>
  );
}

function BlogDetailErrorState({ message }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
        <TriangleAlert className="mx-auto h-10 w-10 text-amber-600" />
        <h1 className="mt-4 text-3xl font-black text-slate-950">
          Story unavailable
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          {message || "We could not load this story right now."}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to homepage</span>
        </Link>
      </div>
    </div>
  );
}

export function BlogDetailPage() {
  const { slug = "" } = useParams();
  const { post, relatedPosts, loading, error, usingFallbackData } =
    useBlogDetailData(slug);

  useDocumentTitle(
    post ? `${post.title} | CampyTech Gist` : "Story | CampyTech Gist",
  );

  if (loading) {
    return <BlogDetailLoadingState />;
  }

  if (!post) {
    return <BlogDetailErrorState message={error} />;
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to homepage</span>
          </Link>

          {usingFallbackData && (
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">
              <TriangleAlert className="h-4 w-4" />
              <span>
                Showing fallback story data while the live endpoint is
                unavailable.
              </span>
            </div>
          )}
        </div>

        <section className="overflow-hidden rounded-[2.5rem] bg-[linear-gradient(140deg,_#082f49_0%,_#0f172a_38%,_#1d4ed8_100%)] text-white shadow-[0_30px_100px_rgba(15,23,42,0.24)]">
          <div className="grid gap-0 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
                  {post.categoryLabel || post.category}
                </span>
                {post.featured && (
                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
                    Featured Story
                  </span>
                )}
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
                {post.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                {post.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5 text-sm font-medium text-slate-200">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatArticleDate(post.publishedAt)}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{formatViews(post.views)} views</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <User2 className="h-4 w-4" />
                  <span>{post.author}</span>
                </span>
                <span>{post.readTimeMinutes} min read</span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share Story</span>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <Bookmark className="h-4 w-4" />
                  <span>Save for Later</span>
                </button>
              </div>
            </div>

            <div className="relative min-h-[18rem] sm:min-h-[24rem] xl:min-h-full">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent xl:bg-gradient-to-l xl:from-transparent xl:via-transparent xl:to-slate-950/15" />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1.5fr)_24rem]">
          <article className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
              <span>Home</span>
              <ChevronRight className="h-4 w-4" />
              <span>{post.categoryLabel || post.category}</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-slate-900">Story</span>
            </div>

            <div className="mt-8">
              <BlogArticleContent blocks={post.contentBlocks} />
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
                Need Help Next?
              </p>
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                Turn information into action
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                After reading the update, students can return to the homepage,
                explore related stories, or use CampyTech Gist for guidance on
                applications and scholarship planning.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-5 py-3 text-sm font-semibold text-cyan-800 transition hover:border-cyan-300 hover:bg-cyan-100"
                >
                  <span>Explore more stories</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  <span>Back to top</span>
                </a>
              </div>
            </div>
          </article>

          <aside className="space-y-6 xl:sticky xl:top-[112px] xl:self-start">
            <section className="rounded-[1.75rem] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
                Story Snapshot
              </p>
              <dl className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-sm font-medium text-slate-500">
                    Category
                  </dt>
                  <dd className="text-sm font-semibold text-slate-950">
                    {post.categoryLabel || post.category}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-sm font-medium text-slate-500">
                    Published
                  </dt>
                  <dd className="text-sm font-semibold text-slate-950">
                    {formatArticleDate(post.publishedAt)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-sm font-medium text-slate-500">Author</dt>
                  <dd className="text-sm font-semibold text-slate-950">
                    {post.author}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-sm font-medium text-slate-500">
                    Reading time
                  </dt>
                  <dd className="text-sm font-semibold text-slate-950">
                    {post.readTimeMinutes} min
                  </dd>
                </div>
              </dl>
            </section>

            <RelatedStoriesPanel posts={relatedPosts} />
            <NewsletterPanel />
            <SocialLinksPanel />
          </aside>
        </section>
      </div>
    </div>
  );
}
