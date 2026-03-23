import { apiClient } from "@/shared/utils/client";

function withToken(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function getCollection(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }
  if (Object.keys(data)?.length >= 1) {
    return data;
  }

  return [];
}

export async function loginAdmin(credentials) {
  const response = await apiClient.post("/auth/admin/login", credentials);
  return response.data;
}

export async function getAdminBlogs(token) {
  const response = await apiClient.get("/admin/blog/all", withToken(token));
  return getCollection(response.data);
}

export async function getAdminCategories(token) {
  const response = await apiClient.get("/admin/category/all", withToken(token));
  console.log("category data ===> ", response.data);
  return getCollection(response.data);
}

export async function getAdminTags(token) {
  const response = await apiClient.get("/admin/tag/all", withToken(token));
  return getCollection(response.data);
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
