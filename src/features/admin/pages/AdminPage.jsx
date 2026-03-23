import { LoaderCircle } from "lucide-react";
import { AdminHeader } from "../components/AdminHeader";
import { AdminLoginView } from "../components/AdminLoginView";
import { AdminTabs } from "../components/AdminTabs";
import { BlogEditor } from "../components/BlogEditor";
import { BlogsTable } from "../components/BlogsTable";
import { NoticeBanner } from "../components/NoticeBanner";
import { StatsGrid } from "../components/StatsGrid";
import { useAdminPanel } from "../hooks/useAdminPanel";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="text-center">
        <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-cyan-400" />
        <p className="mt-4 text-sm font-medium text-slate-300">
          Restoring admin session...
        </p>
      </div>
    </div>
  );
}

export function AdminPage() {
  const {
    isLoggedIn,
    currentView,
    showPassword,
    loginData,
    blogForm,
    blogs,
    categories,
    tags,
    editingBlog,
    loading,
    dashboardLoading,
    bootstrapping,
    error,
    success,
    stats,
    setShowPassword,
    setLoginData,
    setBlogForm,
    setCurrentView,
    setError,
    setSuccess,
    handleLogin,
    handleLogout,
    handleSaveBlog,
    handleDeleteBlog,
    handleEditBlog,
    openCreateView,
    resetForm,
    refreshDashboard,
  } = useAdminPanel();

  if (bootstrapping) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return (
      <AdminLoginView
        loginData={loginData}
        showPassword={showPassword}
        loading={loading}
        error={error}
        onSubmit={handleLogin}
        onLoginChange={(field, value) =>
          setLoginData((previousState) => ({
            ...previousState,
            [field]: value,
          }))
        }
        onTogglePassword={() => setShowPassword((value) => !value)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#f1f5f9_100%)]">
      <AdminHeader onLogout={handleLogout} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {error && (
            <NoticeBanner
              tone="error"
              message={error}
              onClose={() => setError("")}
            />
          )}

          {success && (
            <NoticeBanner
              tone="success"
              message={success}
              onClose={() => setSuccess("")}
            />
          )}

          <AdminTabs
            currentView={currentView}
            editingBlog={editingBlog}
            totalBlogs={blogs.length}
            onOpenDashboard={() => {
              setCurrentView("dashboard");
              resetForm();
            }}
            onOpenEditor={openCreateView}
          />

          {currentView === "dashboard" ? (
            <div className="space-y-6">
              <StatsGrid stats={stats} />
              <BlogsTable
                blogs={blogs}
                dashboardLoading={dashboardLoading}
                onRefresh={refreshDashboard}
                onCreate={openCreateView}
                onEdit={handleEditBlog}
                onDelete={handleDeleteBlog}
              />
            </div>
          ) : (
            <BlogEditor
              blogForm={blogForm}
              categories={categories}
              tags={tags}
              editingBlog={editingBlog}
              loading={loading}
              onFieldChange={(field, value) =>
                setBlogForm((previousState) => ({
                  ...previousState,
                  [field]: value,
                }))
              }
              onSubmit={handleSaveBlog}
              onCancel={() => {
                setCurrentView("dashboard");
                resetForm();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
