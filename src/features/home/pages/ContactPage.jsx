import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

export function ContactPage() {
  useDocumentTitle("CampyTech Gist | Contact");

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
