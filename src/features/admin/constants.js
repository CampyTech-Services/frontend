export const ADMIN_TOKEN_KEY = "adminToken";
export const ADMIN_COLLECTION_LIMIT = 200;

export const BLOG_STATUSES = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

export const BLOG_STATUS_FILTERS = [
  { value: "ALL", label: "All Posts" },
  { value: "PUBLISHED", label: "Published" },
  { value: "DRAFT", label: "Drafts" },
  { value: "ARCHIVED", label: "Archived" },
];

export const ADMIN_VIEWS = {
  LOGIN: "login",
  DASHBOARD: "dashboard",
  EDITOR: "editor",
  CATEGORIES: "categories",
  TAGS: "tags",
};

export const EMPTY_LOGIN_FORM = {
  email: "",
  password: "",
};

export const EMPTY_BLOG_FORM = {
  title: "",
  slug: "",
  featuredImage: "",
  content: "",
  excerpt: "",
  categoryId: "",
  status: "DRAFT",
  tags: [],
};

export const EMPTY_CATEGORY_FORM = {
  name: "",
  slug: "",
  description: "",
};

export const EMPTY_TAG_FORM = {
  name: "",
  slug: "",
};

export const EMPTY_COLLECTION = {
  items: [],
  total: 0,
  page: 1,
  limit: 0,
};
