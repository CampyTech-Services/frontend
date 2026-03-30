import axios from "axios";
import { apiClient } from "@/shared/utils/client";
import { ADMIN_COLLECTION_LIMIT } from "../constants";
import { normalizeAdminCollection } from "../utils/adminHelpers";

const defaultCollectionParams = {
  page: 1,
  limit: ADMIN_COLLECTION_LIMIT,
};

function withToken(token, config = {}) {
  return {
    ...config,
    headers: {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function loginAdmin(credentials) {
  const response = await apiClient.post("/auth/admin/login", credentials);
  return response.data;
}

export async function getAdminBlogs(token) {
  const response = await apiClient.get(
    "/admin/blog/all",
    withToken(token, { params: defaultCollectionParams }),
  );
  return normalizeAdminCollection(response.data);
}

export async function getAdminCategories(token) {
  const response = await apiClient.get(
    "/admin/category/all",
    withToken(token, { params: defaultCollectionParams }),
  );
  return normalizeAdminCollection(response.data);
}

export async function getAdminTags(token) {
  const response = await apiClient.get(
    "/admin/tag/all",
    withToken(token, { params: defaultCollectionParams }),
  );
  return normalizeAdminCollection(response.data);
}

export async function saveAdminBlog(token, payload, blogId) {
  if (blogId) {
    const response = await apiClient.put(
      `/admin/blog/${blogId}`,
      payload,
      withToken(token),
    );

    return response.data;
  }

  const response = await apiClient.post(
    "/admin/blog",
    payload,
    withToken(token),
  );
  return response.data;
}

export async function deleteAdminBlog(token, blogId) {
  const response = await apiClient.delete(
    `/admin/blog/${blogId}`,
    withToken(token),
  );

  return response.data;
}

export async function saveAdminCategory(token, payload, categoryId) {
  if (categoryId) {
    const response = await apiClient.put(
      `/admin/category/${categoryId}`,
      payload,
      withToken(token),
    );

    return response.data;
  }

  const response = await apiClient.post(
    "/admin/category",
    payload,
    withToken(token),
  );

  return response.data;
}

export async function deleteAdminCategory(token, categoryId) {
  const response = await apiClient.delete(
    `/admin/category/${categoryId}`,
    withToken(token),
  );

  return response.data;
}

export async function saveAdminTag(token, payload, tagId) {
  if (tagId) {
    const response = await apiClient.put(
      `/admin/tag/${tagId}`,
      payload,
      withToken(token),
    );

    return response.data;
  }

  const response = await apiClient.post("/admin/tag", payload, withToken(token));
  return response.data;
}

export async function deleteAdminTag(token, tagId) {
  const response = await apiClient.delete(
    `/admin/tag/${tagId}`,
    withToken(token),
  );

  return response.data;
}

export function isAdminImageUploadConfigured() {
  return Boolean(import.meta.env.VITE_IMGBB_API_KEY);
}

export async function uploadAdminImage(file) {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Image uploads are not configured. Add VITE_IMGBB_API_KEY to enable direct uploads.",
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  const imageUrl =
    response.data?.data?.url || response.data?.data?.display_url || "";

  if (!imageUrl) {
    throw new Error("Image upload completed, but no public URL was returned.");
  }

  return imageUrl;
}
