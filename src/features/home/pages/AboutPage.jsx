import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

export function AboutPage() {
  useDocumentTitle("CampyTech Gist | About Us");

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">
            About CampyTech Gist
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            We help students stay informed, prepare smarter, and take the next
            step with confidence.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            CampyTech Gist is Nigeria&apos;s trusted campus news hub. We deliver
            timely updates on admission, scholarship opportunities, exam
            guidance, and student life so learners can navigate education with
            clarity and confidence.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          <article className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
              Our Mission
            </p>
            <p className="mt-4 text-base leading-7 text-slate-200">
              To empower campus communities with verified news, admission
              guidance, and scholarship access so every student can make the
              best education decision.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-700">
              Our Promise
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              We publish campus news with clarity, share practical student
              support, and keep the site easy to use on mobile or desktop.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-700">
              Your Campus News Partner
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              From JAMB updates to scholarship announcements, we keep students
              informed with the latest campus stories and resource links.
            </p>
          </article>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-700">
                Ready to connect?
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                Reach out to the team or explore our services further.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Contact Us
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
