import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  ADMIN_TOKEN_KEY,
  EMPTY_BLOG_FORM,
  EMPTY_LOGIN_FORM,
} from "../constants";
import {
  deleteAdminBlog,
  getAdminBlogs,
  getAdminCategories,
  getAdminTags,
  loginAdmin,
  saveAdminBlog,
} from "../services/adminApi";
import {
  buildBlogPayload,
  buildSlug,
  formatEditorContent,
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
  const [currentView, setCurrentView] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState(EMPTY_LOGIN_FORM);
  const [blogForm, setBlogForm] = useState(EMPTY_BLOG_FORM);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState({});
  const [tags, setTags] = useState({});
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const storedToken = window.localStorage.getItem(ADMIN_TOKEN_KEY);

    if (!storedToken) {
      setBootstrapping(false);
      return;
    }

    const restoreSession = async () => {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
      setCurrentView("dashboard");

      try {
        await loadDashboardData(storedToken);
      } catch (restoreError) {
        window.localStorage.removeItem(ADMIN_TOKEN_KEY);
        setAuthToken(null);
        setIsLoggedIn(false);
        setCurrentView("login");
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
      setCurrentView("dashboard");
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
    setCurrentView("login");
    setLoginData(EMPTY_LOGIN_FORM);
    setBlogForm(EMPTY_BLOG_FORM);
    setBlogs([]);
    setCategories({ total: 0, items: [] });
    setTags([]);
    setEditingBlog(null);
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
      setCurrentView("dashboard");
      await loadDashboardData();
    } catch (saveError) {
      setError(getErrorMessage(saveError, "Failed to save blog."));
    } finally {
      setLoading(false);
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
      tags: blog.tags?.map((tag) => String(tag.id)) || [],
    });
    setCurrentView("editor");
    setError("");
    setSuccess("");
  }

  function resetForm() {
    setBlogForm(EMPTY_BLOG_FORM);
    setEditingBlog(null);
  }

  function openCreateView() {
    resetForm();
    setCurrentView("editor");
  }

  const stats = useMemo(
    () => [
      {
        id: "total",
        label: "Total Blogs",
        value: blogs.total,
        tone: "cyan",
      },
      {
        id: "published",
        label: "Published",
        value: blogs.items?.filter((blog) => blog.status === "PUBLISHED")
          ?.length,
        tone: "green",
      },
      {
        id: "drafts",
        label: "Drafts",
        value: blogs.items?.filter((blog) => blog.status === "DRAFT")?.length,
        tone: "amber",
      },
      {
        id: "categories",
        label: "Categories",
        value: categories.total || categories.length,
        tone: "slate",
      },
    ],
    [blogs, categories],
  );

  return {
    isLoggedIn,
    authToken,
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
    setCurrentView,
    setShowPassword,
    setLoginData,
    setBlogForm,
    setError,
    setSuccess,
    handleLogin,
    handleLogout,
    handleSaveBlog,
    handleDeleteBlog,
    handleEditBlog,
    openCreateView,
    resetForm,
    refreshDashboard: loadDashboardData,
  };
}
