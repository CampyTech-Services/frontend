export function buildSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function coerceIdValue(value) {
  if (value === "" || value === null || value === undefined) {
    return value;
  }

  return /^\d+$/.test(String(value)) ? Number(value) : value;
}

export function formatEditorContent(content) {
  if (!content) {
    return "";
  }

  if (typeof content === "string") {
    return content;
  }

  return JSON.stringify(content, null, 2);
}

export function normalizeContentInput(value) {
  if (typeof value !== "string") {
    return value;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return { blocks: [] };
  }

  try {
    return JSON.parse(trimmedValue);
  } catch {
    const blocks = trimmedValue
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => ({
        type: "paragraph",
        data: { text: paragraph },
      }));

    return { blocks };
  }
}

export function buildBlogPayload(blogForm) {
  return {
    title: blogForm.title.trim(),
    slug: buildSlug(blogForm.slug || blogForm.title),
    featuredImage: blogForm.featuredImage.trim(),
    content: normalizeContentInput(blogForm.content),
    excerpt: blogForm.excerpt.trim(),
    categoryId: coerceIdValue(blogForm.categoryId),
    status: blogForm.status,
    tags: blogForm.tags.map((tagId) => ({ id: coerceIdValue(tagId) })),
  };
}

export function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
