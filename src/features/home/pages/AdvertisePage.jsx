import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

export function AdvertisePage() {
  useDocumentTitle("CampyTech Gist | Advertise");

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">
            Advertise with us
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Reach tens of thousands of Nigerian students across campus news.
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            CampyTech Gist offers advertising space for education providers,
            scholarship programs, and student-focused services.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Contact Sales
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              About the brand
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
