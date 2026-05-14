import { useState } from "react";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { submitFeatureFeedback } from "../services/homeApi";

const emptyFeedbackForm = {
  name: "",
  email: "",
  title: "",
  category: "",
  message: "",
  useCase: "",
};

export function ContactPage() {
  useDocumentTitle("CampyTech Gist | Contact");
  const [feedbackForm, setFeedbackForm] = useState(emptyFeedbackForm);
  const [feedbackStatus, setFeedbackStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  async function handleFeedbackSubmit(event) {
    event.preventDefault();
    setFeedbackStatus({ loading: true, error: "", success: "" });

    try {
      await submitFeatureFeedback({
        name: feedbackForm.name.trim(),
        email: feedbackForm.email.trim() || undefined,
        title: feedbackForm.title.trim(),
        category: feedbackForm.category.trim() || undefined,
        message: feedbackForm.message.trim(),
        useCase: feedbackForm.useCase.trim() || undefined,
      });
      setFeedbackForm(emptyFeedbackForm);
      setFeedbackStatus({
        loading: false,
        error: "",
        success: "Thanks. Your request has been sent to the team.",
      });
    } catch (error) {
      setFeedbackStatus({
        loading: false,
        error:
          error?.response?.data?.message ||
          "We could not submit your request right now.",
        success: "",
      });
    }
  }

  function updateFeedbackField(field, value) {
    setFeedbackForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">
            Contact CampyTech Gist
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            We&apos;re here to help with admissions, news tips, and partnership
            inquiries.
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            Send us a message if you want to report a story, ask about our
            services, or explore advertising opportunities.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
              General enquiries
            </p>
            <p className="mt-5 text-base leading-7 text-slate-200">
              campytechltd@gmail.com
            </p>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              Expect quick replies for admissions, scholarship, and student news
              help.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-700">
              Phone & location
            </p>
            <p className="mt-5 text-base leading-7 text-slate-700">
              +234 904 992 9850
            </p>
            <p className="mt-6 text-sm leading-7 text-slate-500">
              Abuja, Nigeria — providing student news coverage across the
              country.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">
            Product feedback
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
            Tell us what you want CampyTech to build next.
          </h2>

          <form onSubmit={handleFeedbackSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Name
                </span>
                <input
                  type="text"
                  required
                  value={feedbackForm.name}
                  onChange={(event) => updateFeedbackField("name", event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </span>
                <input
                  type="email"
                  value={feedbackForm.email}
                  onChange={(event) => updateFeedbackField("email", event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Feature title
                </span>
                <input
                  type="text"
                  required
                  value={feedbackForm.title}
                  onChange={(event) => updateFeedbackField("title", event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Category
                </span>
                <input
                  type="text"
                  value={feedbackForm.category}
                  onChange={(event) => updateFeedbackField("category", event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Request
              </span>
              <textarea
                rows="4"
                required
                value={feedbackForm.message}
                onChange={(event) => updateFeedbackField("message", event.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Student use case
              </span>
              <textarea
                rows="3"
                value={feedbackForm.useCase}
                onChange={(event) => updateFeedbackField("useCase", event.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
            </label>

            {feedbackStatus.error ? (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {feedbackStatus.error}
              </p>
            ) : null}

            {feedbackStatus.success ? (
              <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                {feedbackStatus.success}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={feedbackStatus.loading}
              className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-60 sm:w-auto"
            >
              {feedbackStatus.loading ? "Sending..." : "Send Feature Request"}
            </button>
          </form>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Need something more specific?
          </h2>
          <div className="mt-6 space-y-6 text-sm leading-7 text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">Press and media</p>
              <p>campytechltd@gmail.com</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                Advertising and partnerships
              </p>
              <p>campytechltd@gmail.com</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                Editorial submissions
              </p>
              <p>campytechltd@gmail.com</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
