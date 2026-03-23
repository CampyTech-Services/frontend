export const ADMIN_TOKEN_KEY = "adminToken";

export const BLOG_STATUSES = [
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
];

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
