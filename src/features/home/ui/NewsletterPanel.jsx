import { BellRing } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getNewsletterPreferences,
  saveNewsletterPreferences,
} from "@/shared/utils/newsletterPreferences";

export function NewsletterPanel({ categories = [] }) {
  const [email, setEmail] = useState("");
  const [preferredCategory, setPreferredCategory] = useState("all");
  const [school, setSchool] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  useEffect(() => {
    const preferences = getNewsletterPreferences();
    if (preferences.email) {
      setEmail(preferences.email);
      setStatusMessage(
        "Your newsletter preference is saved. You can update your email, school, or category anytime.",
      );
      setStatusType("success");
    }

    setPreferredCategory(preferences.categoryId || "all");
    setSchool(preferences.school || "");
  }, []);

  const categoryOptions = useMemo(
    () => [{ id: "all", name: "Any category" }, ...categories],
    [categories],
  );

  const selectedCategoryLabel = useMemo(() => {
    const selected = categoryOptions.find(
      (option) => option.id === preferredCategory,
    );

    return selected?.name ?? "Any category";
  }, [categoryOptions, preferredCategory]);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedSchool = school.trim();

    if (!trimmedEmail) {
      setStatusMessage("Please provide a valid email address.");
      setStatusType("error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setStatusMessage("Please enter a valid email address.");
      setStatusType("error");
      return;
    }

    saveNewsletterPreferences({
      email: trimmedEmail,
      categoryId: preferredCategory,
      school: trimmedSchool,
    });

    const preferenceText =
      preferredCategory !== "all"
        ? `${selectedCategoryLabel} updates`
        : trimmedSchool
          ? `school updates for "${trimmedSchool}"`
          : "general campus news";

    setStatusMessage(
      `Subscription saved — we will send you ${preferenceText}.`,
    );
    setStatusType("success");
  }

  return (
    <section
      data-tutorial-id="newsletter"
      className="group relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(160deg,_#0891b2_0%,_#1d4ed8_100%)] p-6 text-white shadow-[0_20px_50px_rgba(8,145,178,0.26)] transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(8,145,178,0.35)]"
    >
      <div className="text-center">
        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 shadow-[0_0_0_0_rgba(255,255,255,0.35)] transition duration-700 ease-in-out motion-safe:animate-pulse">
          <BellRing className="h-7 w-7 text-white" />
        </div>
        <h2 className="mt-4 text-2xl font-black">Stay Updated</h2>
        <p className="mt-3 text-sm leading-6 text-cyan-50">
          Get admission news, scholarships, and exam updates in your inbox.
        </p>
      </div>

      <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          className="w-full rounded-2xl border border-white/20 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-white/25"
        />

        <label className="sr-only" htmlFor="newsletter-category">
          Preferred category
        </label>
        <select
          id="newsletter-category"
          value={preferredCategory}
          onChange={(event) => setPreferredCategory(event.target.value)}
          className="w-full rounded-2xl border border-white/20 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-4 focus:ring-white/25"
        >
          {categoryOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="newsletter-school">
          School name (optional)
        </label>
        <input
          id="newsletter-school"
          type="text"
          value={school}
          onChange={(event) => setSchool(event.target.value)}
          placeholder="School name (optional)"
          className="w-full rounded-2xl border border-white/20 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-white/25"
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
        >
          Subscribe Now
        </button>
      </form>

      {statusMessage ? (
        <p
          role="status"
          aria-live="polite"
          className={`mt-4 text-center text-sm font-medium transition-colors duration-300 ${
            statusType === "error" ? "text-rose-200" : "text-cyan-100"
          }`}
        >
          {statusMessage}
        </p>
      ) : null}

      <p className="mt-4 text-center text-xs font-medium text-cyan-100">
        Choose a category or school and we’ll keep your updates focused.
      </p>
    </section>
  );
}
