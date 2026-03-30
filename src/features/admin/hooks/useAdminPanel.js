import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  ADMIN_TOKEN_KEY,
  ADMIN_VIEWS,
  EMPTY_BLOG_FORM,
  EMPTY_CATEGORY_FORM,
  EMPTY_LOGIN_FORM,
  EMPTY_TAG_FORM,
} from "../constants";
import {
  deleteAdminBlog,
  deleteAdminCategory,
  deleteAdminTag,
  getAdminBlogs,
  getAdminCategories,
  getAdminTags,
  isAdminImageUploadConfigured,
  loginAdmin,
  saveAdminBlog,
  saveAdminCategory,
  saveAdminTag,
  uploadAdminImage,
} from "../services/adminApi";
import {
  buildBlogPayload,
  buildCategoryPayload,
  buildSlug,
  buildTagPayload,
  createEmptyCollectionState,
  formatEditorContent,
  getBlogTagIds,
  sortByLatest,
} from "../utils/adminHelpers";

function getErrorMessage(error, fallbackMessage) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      fallbackMessage
    );
  }

  return error instanceof Error ? error.message : fallbackMessage;
}

export function useAdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [currentView, setCurrentView] = useState(ADMIN_VIEWS.LOGIN);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState(EMPTY_LOGIN_FORM);
  const [blogForm, setBlogForm] = useState(EMPTY_BLOG_FORM);
  const [categoryForm, setCategoryForm] = useState(EMPTY_CATEGORY_FORM);
  const [tagForm, setTagForm] = useState(EMPTY_TAG_FORM);
  const [blogs, setBlogs] = useState(createEmptyCollectionState);
  const [categories, setCategories] = useState(createEmptyCollectionState);
  const [tags, setTags] = useState(createEmptyCollectionState);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingTag, setEditingTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const canUploadImages = isAdminImageUploadConfigured();

  useEffect(() => {
    const storedToken = window.localStorage.getItem(ADMIN_TOKEN_KEY);

    if (!storedToken) {
      setBootstrapping(false);
      return;
    }

    const restoreSession = async () => {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
      setCurrentView(ADMIN_VIEWS.DASHBOARD);

      try {
        await loadDashboardData(storedToken);
      } catch (restoreError) {
        window.localStorage.removeItem(ADMIN_TOKEN_KEY);
        setAuthToken(null);
        setIsLoggedIn(false);
        setCurrentView(ADMIN_VIEWS.LOGIN);
        setError(
          getErrorMessage(
            restoreError,
            "Your session expired. Please log in again.",
          ),
        );
      } finally {
        setBootstrapping(false);
      }
    };

    restoreSession();
  }, []);

  useEffect(() => {
    if (!blogForm.title || editingBlog) {
      return;
    }

    setBlogForm((previousForm) => ({
      ...previousForm,
      slug: buildSlug(previousForm.title),
    }));
  }, [blogForm.title, editingBlog]);

  useEffect(() => {
    if (!categoryForm.name || editingCategory) {
      return;
    }

    setCategoryForm((previousForm) => ({
      ...previousForm,
      slug: buildSlug(previousForm.name),
    }));
  }, [categoryForm.name, editingCategory]);

  useEffect(() => {
    if (!tagForm.name || editingTag) {
      return;
    }

    setTagForm((previousForm) => ({
      ...previousForm,
      slug: buildSlug(previousForm.name),
    }));
  }, [tagForm.name, editingTag]);

  async function loadDashboardData(tokenOverride = authToken) {
    if (!tokenOverride) {
      return;
    }

    setDashboardLoading(true);

    try {
      const [blogData, categoryData, tagData] = await Promise.all([
        getAdminBlogs(tokenOverride),
        getAdminCategories(tokenOverride),
        getAdminTags(tokenOverride),
      ]);

      setBlogs(blogData);
      setCategories(categoryData);
      setTags(tagData);
    } finally {
      setDashboardLoading(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await loginAdmin(loginData);
      const accessToken = data.access_token || data.accessToken;

      if (!accessToken) {
        throw new Error("Login response did not include an access token.");
      }

      window.localStorage.setItem(ADMIN_TOKEN_KEY, accessToken);
      setAuthToken(accessToken);
      setIsLoggedIn(true);
      setCurrentView(ADMIN_VIEWS.DASHBOARD);
      setLoginData(EMPTY_LOGIN_FORM);
      setSuccess("Login successful.");
      await loadDashboardData(accessToken);
    } catch (loginError) {
      setError(
        getErrorMessage(
          loginError,
          "Login failed. Please check your credentials.",
        ),
      );
    } finally {
      setLoading(false);
      setBootstrapping(false);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
    setAuthToken(null);
    setIsLoggedIn(false);
    setCurrentView(ADMIN_VIEWS.LOGIN);
    setLoginData(EMPTY_LOGIN_FORM);
    setBlogForm(EMPTY_BLOG_FORM);
    setCategoryForm(EMPTY_CATEGORY_FORM);
    setTagForm(EMPTY_TAG_FORM);
    setBlogs(createEmptyCollectionState());
    setCategories(createEmptyCollectionState());
    setTags(createEmptyCollectionState());
    setEditingBlog(null);
    setEditingCategory(null);
    setEditingTag(null);
    setError("");
    setSuccess("");
  }

  async function handleSaveBlog(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = buildBlogPayload(blogForm);
      await saveAdminBlog(authToken, payload, editingBlog?.id);

      setSuccess(
        editingBlog
          ? "Blog updated successfully."
          : "Blog created successfully.",
      );
      resetForm();
      setCurrentView(ADMIN_VIEWS.DASHBOARD);
      await loadDashboardData();
    } catch (saveError) {
      setError(getErrorMessage(saveError, "Failed to save blog."));
    } finally {
      setLoading(false);
    }
  }

  async function handleBlogImageUpload(file) {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Please choose an image smaller than 5MB.");
      return;
    }

    setUploadingImage(true);
    setError("");
    setSuccess("");

    try {
      const imageUrl = await uploadAdminImage(file);

      setBlogForm((previousForm) => ({
        ...previousForm,
        featuredImage: imageUrl,
      }));
      setSuccess("Image uploaded successfully.");
    } catch (uploadError) {
      setError(getErrorMessage(uploadError, "Failed to upload image."));
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleDeleteBlog(blogId) {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await deleteAdminBlog(authToken, blogId);
      setSuccess("Blog deleted successfully.");
      await loadDashboardData();
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, "Failed to delete blog."));
    }
  }

  function handleEditBlog(blog) {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title || "",
      slug: blog.slug || "",
      featuredImage: blog.featuredImage || "",
      content: formatEditorContent(blog.content),
      excerpt: blog.excerpt || "",
      categoryId: blog.categoryId ? String(blog.categoryId) : "",
      status: blog.status || "DRAFT",
      tags: getBlogTagIds(blog),
    });
    setCurrentView(ADMIN_VIEWS.EDITOR);
    setError("");
    setSuccess("");
  }

  function resetForm() {
    setBlogForm(EMPTY_BLOG_FORM);
    setEditingBlog(null);
  }

  function openCreateView() {
    resetForm();
    setCurrentView(ADMIN_VIEWS.EDITOR);
  }

  async function handleSaveCategory(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = buildCategoryPayload(categoryForm);
      await saveAdminCategory(authToken, payload, editingCategory?.id);
      setSuccess(
        editingCategory
          ? "Category updated successfully."
          : "Category created successfully.",
      );
      resetCategoryForm();
      setCurrentView(ADMIN_VIEWS.CATEGORIES);
      await loadDashboardData();
    } catch (saveError) {
      setError(getErrorMessage(saveError, "Failed to save category."));
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteCategory(categoryId) {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await deleteAdminCategory(authToken, categoryId);

      if (editingCategory?.id === categoryId) {
        resetCategoryForm();
      }

      setSuccess("Category deleted successfully.");
      await loadDashboardData();
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, "Failed to delete category."));
    }
  }

  function handleEditCategory(category) {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name || "",
      slug: category.slug || "",
      description: category.description || "",
    });
    setCurrentView(ADMIN_VIEWS.CATEGORIES);
    setError("");
    setSuccess("");
  }

  function resetCategoryForm() {
    setCategoryForm(EMPTY_CATEGORY_FORM);
    setEditingCategory(null);
  }

  async function handleSaveTag(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = buildTagPayload(tagForm);
      await saveAdminTag(authToken, payload, editingTag?.id);
      setSuccess(
        editingTag ? "Tag updated successfully." : "Tag created successfully.",
      );
      resetTagForm();
      setCurrentView(ADMIN_VIEWS.TAGS);
      await loadDashboardData();
    } catch (saveError) {
      setError(getErrorMessage(saveError, "Failed to save tag."));
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTag(tagId) {
    if (!window.confirm("Are you sure you want to delete this tag?")) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await deleteAdminTag(authToken, tagId);

      if (editingTag?.id === tagId) {
        resetTagForm();
      }

      setSuccess("Tag deleted successfully.");
      await loadDashboardData();
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, "Failed to delete tag."));
    }
  }

  function handleEditTag(tag) {
    setEditingTag(tag);
    setTagForm({
      name: tag.name || "",
      slug: tag.slug || "",
    });
    setCurrentView(ADMIN_VIEWS.TAGS);
    setError("");
    setSuccess("");
  }

  function resetTagForm() {
    setTagForm(EMPTY_TAG_FORM);
    setEditingTag(null);
  }

  const blogItems = useMemo(() => sortByLatest(blogs.items), [blogs.items]);
  const latestPublishedBlog = useMemo(
    () =>
      blogItems.find((blog) => blog.status === "PUBLISHED") || null,
    [blogItems],
  );

  const stats = useMemo(
    () => [
      {
        id: "total",
        label: "Total Blogs",
        value: blogs.total || blogItems.length,
        tone: "cyan",
      },
      {
        id: "published",
        label: "Published",
        value: blogItems.filter((blog) => blog.status === "PUBLISHED").length,
        tone: "green",
      },
      {
        id: "drafts",
        label: "Drafts",
        value: blogItems.filter((blog) => blog.status === "DRAFT").length,
        tone: "amber",
      },
      {
        id: "categories",
        label: "Categories",
        value: categories.total || categories.items.length,
        tone: "slate",
      },
      {
        id: "tags",
        label: "Tags",
        value: tags.total || tags.items.length,
        tone: "violet",
      },
    ],
    [blogItems, blogs.total, categories.total, categories.items.length, tags],
  );

  return {
    isLoggedIn,
    authToken,
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
    setCurrentView,
    setShowPassword,
    setLoginData,
    setBlogForm,
    setCategoryForm,
    setTagForm,
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
    refreshDashboard: loadDashboardData,
  };
}
