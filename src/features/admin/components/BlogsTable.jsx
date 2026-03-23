import { Edit2, Plus, RefreshCw, Trash2 } from "lucide-react";
import { formatDate } from "../utils/adminHelpers";

function statusClassName(status) {
  if (status === "PUBLISHED") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "DRAFT") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-100 text-slate-700";
}

export function BlogsTable({
  blogs,
  dashboardLoading,
  onRefresh,
  onCreate,
  onEdit,
  onDelete,
}) {
  return (
    <section className="rounded-[1.75rem] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">All Blog Posts</h2>
          <p className="mt-1 text-sm text-slate-500">
            Review, edit, or remove published and draft stories.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onRefresh}
            disabled={dashboardLoading}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" />
            <span>{dashboardLoading ? "Refreshing..." : "Refresh"}</span>
          </button>
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Blog Post</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-600">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {!blogs.length ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-16 text-center text-sm text-slate-500"
                >
                  {dashboardLoading
                    ? "Loading blog posts..."
                    : "No blogs yet. Create your first blog post."}
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="align-top hover:bg-slate-50/70">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      {blog.featuredImage ? (
                        <img
                          src={blog.featuredImage}
                          alt={blog.title}
                          className="h-14 w-14 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-2xl bg-slate-100" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-950">
                          {blog.title}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-500">
                          {blog.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                      {blog.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClassName(
                        blog.status,
                      )}`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500">
                    {formatDate(blog.createdAt)}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(blog)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-blue-700 transition hover:bg-blue-50"
                        aria-label={`Edit ${blog.title}`}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(blog.id)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-red-700 transition hover:bg-red-50"
                        aria-label={`Delete ${blog.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
