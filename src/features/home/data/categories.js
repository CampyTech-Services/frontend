import {
  Award,
  BadgeCheck,
  BellRing,
  BookOpenCheck,
  Building2,
  FileText,
  Landmark,
  TrendingUp,
} from "lucide-react";

const CATEGORY_META = [
  { id: "all", name: "All News", icon: TrendingUp, tone: "slate" },
  { id: "admission", name: "Admission", icon: BookOpenCheck, tone: "blue" },
  { id: "scholarships", name: "Scholarships", icon: Award, tone: "cyan" },
  { id: "jamb", name: "JAMB", icon: BellRing, tone: "emerald" },
  { id: "university", name: "University", icon: Landmark, tone: "amber" },
  { id: "polytechnic", name: "Polytechnic", icon: Building2, tone: "rose" },
  { id: "nysc", name: "NYSC", icon: BadgeCheck, tone: "indigo" },
  { id: "waec", name: "WAEC", icon: FileText, tone: "orange" },
];

const FALLBACK_CATEGORIES = [TrendingUp, BookOpenCheck, Award, Landmark, FileText];
const FALLBACK_TONES = ["slate", "blue", "cyan", "emerald", "amber"];

function formatCategoryName(categoryId) {
  const upperCaseCategories = new Set(["jamb", "waec", "nysc"]);

  if (upperCaseCategories.has(categoryId)) {
    return categoryId.toUpperCase();
  }

  return categoryId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const blogCategories = CATEGORY_META;

export function buildBlogCategories(posts) {
  const allCategory = CATEGORY_META[0];
  const postCategoryIds = Array.from(
    new Set(posts.map((post) => post.category).filter(Boolean)),
  );

  if (!postCategoryIds.length) {
    return CATEGORY_META;
  }

  const dynamicCategories = postCategoryIds.map((categoryId, index) => {
    const knownCategory = CATEGORY_META.find(
      (category) => category.id === categoryId,
    );

    if (knownCategory) {
      return knownCategory;
    }

    return {
      id: categoryId,
      name: formatCategoryName(categoryId),
      icon: FALLBACK_CATEGORIES[index % FALLBACK_CATEGORIES.length],
      tone: FALLBACK_TONES[index % FALLBACK_TONES.length],
    };
  });

  return [allCategory, ...dynamicCategories];
}
