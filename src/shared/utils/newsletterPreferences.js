const NEWSLETTER_PREFERENCES_KEY = "campytech-newsletter-preferences";

const DEFAULT_PREFERENCES = {
  email: "",
  categoryId: "all",
  school: "",
};

export function getNewsletterPreferences() {
  if (typeof window === "undefined") {
    return DEFAULT_PREFERENCES;
  }

  try {
    const saved = window.localStorage.getItem(NEWSLETTER_PREFERENCES_KEY);
    if (!saved) {
      return DEFAULT_PREFERENCES;
    }

    const parsed = JSON.parse(saved);
    return {
      email: parsed.email ?? "",
      categoryId: parsed.categoryId ?? "all",
      school: parsed.school ?? "",
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function saveNewsletterPreferences(preferences) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    email: String(preferences.email || "").trim(),
    categoryId: String(preferences.categoryId || "all").trim() || "all",
    school: String(preferences.school || "").trim(),
    savedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(
    NEWSLETTER_PREFERENCES_KEY,
    JSON.stringify(payload),
  );
}
