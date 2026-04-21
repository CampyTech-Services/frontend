import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

export function TermsPage() {
  useDocumentTitle("CampyTech Gist | Terms of Service");

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">
            Terms of Service
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Rules and expectations for using CampyTech Gist.
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            These terms explain how you may use the site, publish content, and
            access our resources. By using CampyTech Gist, you agree to follow
            these terms.
          </p>
        </section>

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            User responsibilities
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Use the site respectfully, do not submit harmful content, and follow
            the publication policies that support a safe campus news
            environment.
          </p>
        </section>

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Content scope
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Content on CampyTech Gist is for educational and informational
            purposes. We are not responsible for third-party links or external
            services.
          </p>
        </section>
      </div>
    </div>
  );
}
