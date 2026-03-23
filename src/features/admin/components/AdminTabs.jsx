export function AdminTabs({
  currentView,
  editingBlog,
  totalBlogs,
  onOpenDashboard,
  onOpenEditor,
}) {
  const tabs = [
    {
      id: "dashboard",
      label: `All Blogs (${totalBlogs})`,
      onClick: onOpenDashboard,
    },
    {
      id: "editor",
      label: editingBlog ? "Edit Blog" : "Create New",
      onClick: onOpenEditor,
    },
  ];

  return (
    <div className="border-b border-slate-200">
      <div className="flex flex-wrap gap-2">
        {tabs?.items?.map((tab) => {
          const isActive = currentView === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={tab.onClick}
              className={`rounded-t-2xl px-5 py-3 text-sm font-semibold transition ${
                isActive
                  ? "border-b-2 border-cyan-600 text-cyan-700"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
