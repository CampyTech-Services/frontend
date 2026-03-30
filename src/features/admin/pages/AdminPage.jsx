import { LoaderCircle } from "lucide-react";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { ADMIN_VIEWS } from "../constants";
import { useAdminAccess } from "../hooks/useAdminAccess";
import { AdminAccessGate } from "../components/AdminAccessGate";
import { AdminHeader } from "../components/AdminHeader";
import { AdminLoginView } from "../components/AdminLoginView";
import { AdminTabs } from "../components/AdminTabs";
import { AdminOverviewHero } from "../components/AdminOverviewHero";
import { BlogEditor } from "../components/BlogEditor";
import { BlogsTable } from "../components/BlogsTable";
import { CategoriesPanel } from "../components/CategoriesPanel";
import { NoticeBanner } from "../components/NoticeBanner";
import { StatsGrid } from "../components/StatsGrid";
import { TagsPanel } from "../components/TagsPanel";
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
  useDocumentTitle("CampyTech Gist | Admin");
  const {
    checkingAccess,
    hasAccess,
    detectedIp,
    whitelistEnabled,
  } = useAdminAccess();
  const {
    isLoggedIn,
    currentView,
    showPassword,
    loginData,
    blogForm,
    categoryForm,
    tagForm,
    blogs,
    blogItems,
    categories,
    tags,
    editingBlog,
    editingCategory,
    editingTag,
    loading,
    dashboardLoading,
    bootstrapping,
    uploadingImage,
    error,
    success,
    stats,
    latestPublishedBlog,
    canUploadImages,
    setShowPassword,
    setLoginData,
    setBlogForm,
    setCategoryForm,
    setTagForm,
    setCurrentView,
    setError,
    setSuccess,
    handleLogin,
    handleLogout,
    handleSaveBlog,
    handleBlogImageUpload,
    handleDeleteBlog,
    handleEditBlog,
    handleSaveCategory,
    handleDeleteCategory,
    handleEditCategory,
    handleSaveTag,
    handleDeleteTag,
    handleEditTag,
    openCreateView,
    resetForm,
    resetCategoryForm,
    resetTagForm,
    refreshDashboard,
  } = useAdminPanel();

  let content = null;

  if (bootstrapping) {
    content = <LoadingScreen />;
  } else if (!isLoggedIn) {
    content = (
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
  } else {
    content = (
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
              totals={{
                blogs: blogs.total || blogItems.length,
                categories: categories.total || categories.items.length,
                tags: tags.total || tags.items.length,
              }}
              onOpenDashboard={() => {
                setCurrentView(ADMIN_VIEWS.DASHBOARD);
                resetForm();
                resetCategoryForm();
                resetTagForm();
              }}
              onOpenEditor={openCreateView}
              onOpenCategories={() => {
                setCurrentView(ADMIN_VIEWS.CATEGORIES);
                resetCategoryForm();
              }}
              onOpenTags={() => {
                setCurrentView(ADMIN_VIEWS.TAGS);
                resetTagForm();
              }}
            />

            {currentView === ADMIN_VIEWS.DASHBOARD ? (
              <div className="space-y-6">
                <AdminOverviewHero
                  latestPublishedBlog={latestPublishedBlog}
                  categoriesTotal={categories.total || categories.items.length}
                  tagsTotal={tags.total || tags.items.length}
                  dashboardLoading={dashboardLoading}
                  onCreate={openCreateView}
                  onRefresh={refreshDashboard}
                  onOpenCategories={() => setCurrentView(ADMIN_VIEWS.CATEGORIES)}
                />
                <StatsGrid stats={stats} />
                <BlogsTable
                  blogs={blogs}
                  categories={categories}
                  dashboardLoading={dashboardLoading}
                  onRefresh={refreshDashboard}
                  onCreate={openCreateView}
                  onEdit={handleEditBlog}
                  onDelete={handleDeleteBlog}
                />
              </div>
            ) : null}

            {currentView === ADMIN_VIEWS.EDITOR ? (
              <BlogEditor
                blogForm={blogForm}
                categories={categories}
                tags={tags}
                editingBlog={editingBlog}
                loading={loading}
                uploadingImage={uploadingImage}
                canUploadImages={canUploadImages}
                onFieldChange={(field, value) =>
                  setBlogForm((previousState) => ({
                    ...previousState,
                    [field]: value,
                  }))
                }
                onImageUpload={handleBlogImageUpload}
                onSubmit={handleSaveBlog}
                onCancel={() => {
                  setCurrentView(ADMIN_VIEWS.DASHBOARD);
                  resetForm();
                }}
              />
            ) : null}

            {currentView === ADMIN_VIEWS.CATEGORIES ? (
              <CategoriesPanel
                categories={categories}
                blogs={blogItems}
                categoryForm={categoryForm}
                editingCategory={editingCategory}
                loading={loading}
                onFieldChange={(field, value) =>
                  setCategoryForm((previousState) => ({
                    ...previousState,
                    [field]: value,
                  }))
                }
                onSubmit={handleSaveCategory}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
                onReset={resetCategoryForm}
              />
            ) : null}

            {currentView === ADMIN_VIEWS.TAGS ? (
              <TagsPanel
                tags={tags}
                blogs={blogItems}
                tagForm={tagForm}
                editingTag={editingTag}
                loading={loading}
                onFieldChange={(field, value) =>
                  setTagForm((previousState) => ({
                    ...previousState,
                    [field]: value,
                  }))
                }
                onSubmit={handleSaveTag}
                onEdit={handleEditTag}
                onDelete={handleDeleteTag}
                onReset={resetTagForm}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminAccessGate
      checkingAccess={checkingAccess}
      hasAccess={hasAccess}
      whitelistEnabled={whitelistEnabled}
      detectedIp={detectedIp}
    >
      {content}
    </AdminAccessGate>
  );
}
