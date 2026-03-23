import {
  Archive,
  CalendarDays,
  CheckCircle2,
  FolderOpen,
  Image,
  Save,
  Tag,
  X,
} from "lucide-react";
import { BLOG_STATUSES } from "../constants";

const statusTone = {
  DRAFT: "bg-amber-100 text-amber-700",
  PUBLISHED: "bg-emerald-100 text-emerald-700",
  ARCHIVED: "bg-slate-200 text-slate-700",
};

const statusIcon = {
  DRAFT: CalendarDays,
  PUBLISHED: CheckCircle2,
  ARCHIVED: Archive,
};

export function BlogEditor({
  blogForm,
  categories,
  tags,
  editingBlog,
  loading,
  onFieldChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form
      className="grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_23rem]"
      onSubmit={onSubmit}
    >
      <section className="rounded-[1.75rem] bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-950">
            {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            Fill in the story details below and choose whether to keep it in
            draft, publish it immediately, or archive it.
          </p>
        </div>

        <div className="space-y-6">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Blog Title
            </span>
            <input
              type="text"
              required
              value={blogForm.title}
              onChange={(event) => onFieldChange("title", event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              placeholder="Enter blog title..."
            />
          </label>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Slug
              </span>
              <input
                type="text"
                required
                value={blogForm.slug}
                onChange={(event) => onFieldChange("slug", event.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="blog-url-slug"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Featured Image URL
              </span>
              <input
                type="url"
                required
                value={blogForm.featuredImage}
                onChange={(event) =>
                  onFieldChange("featuredImage", event.target.value)
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="https://example.com/image.jpg"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Excerpt
            </span>
            <textarea
              rows="4"
              value={blogForm.excerpt}
              onChange={(event) => onFieldChange("excerpt", event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              placeholder="A short summary of the blog post..."
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Content
            </span>
            <textarea
              required
              rows="16"
              value={blogForm.content}
              onChange={(event) => onFieldChange("content", event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              placeholder="Write plain text paragraphs or paste JSON rich content..."
            />
            <p className="mt-2 text-xs text-slate-500">
              Plain text is converted into paragraph blocks. Valid JSON is sent
              as-is.
            </p>
          </label>
        </div>
      </section>

      <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
        <section className="rounded-[1.75rem] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70">
          <h3 className="text-lg font-black text-slate-950">
            Publishing Controls
          </h3>

          <div className="mt-5 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Category
              </span>
              <div className="relative">
                <FolderOpen className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <select
                  required
                  value={blogForm.categoryId}
                  onChange={(event) =>
                    onFieldChange("categoryId", event.target.value)
                  }
                  className="w-full appearance-none rounded-2xl border border-slate-300 bg-slate-50 px-11 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                >
                  <option value="">Select a category</option>
                  {categories?.items?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </span>
              <select
                value={blogForm.status}
                onChange={(event) =>
                  onFieldChange("status", event.target.value)
                }
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              >
                {BLOG_STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Current Status
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                {(() => {
                  const StatusIcon = statusIcon[blogForm.status];
                  return <StatusIcon className="h-4 w-4" />;
                })()}
                <span
                  className={`rounded-full px-2 py-1 text-xs ${statusTone[blogForm.status]}`}
                >
                  {blogForm.status}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-cyan-600" />
            <h3 className="text-lg font-black text-slate-950">Tags</h3>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {tags?.items?.map((tag) => {
              const checked = blogForm.tags.includes(String(tag.id));

              return (
                <label
                  key={tag.id}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    checked
                      ? "border-cyan-200 bg-cyan-50 text-cyan-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => {
                      const nextTags = event.target.checked
                        ? [...blogForm.tags, String(tag.id)]
                        : blogForm.tags.filter(
                            (selectedTagId) => selectedTagId !== String(tag.id),
                          );

                      onFieldChange("tags", nextTags);
                    }}
                    className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>{tag.name}</span>
                </label>
              );
            })}
          </div>
        </section>

        <section className="rounded-[1.75rem] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70">
          <div className="flex items-center gap-2">
            <Image className="h-5 w-5 text-cyan-600" />
            <h3 className="text-lg font-black text-slate-950">Image Preview</h3>
          </div>
          <div className="mt-5 overflow-hidden rounded-[1.5rem] bg-slate-100">
            {blogForm.featuredImage ? (
              <img
                src={blogForm.featuredImage}
                alt="Featured preview"
                className="h-56 w-full object-cover"
              />
            ) : (
              <div className="flex h-56 items-center justify-center text-sm font-medium text-slate-400">
                Add an image URL to preview it here
              </div>
            )}
          </div>
        </section>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            <span>
              {loading
                ? "Saving..."
                : editingBlog
                  ? "Update Blog"
                  : "Create Blog"}
            </span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
        </div>
      </aside>
    </form>
  );
}
