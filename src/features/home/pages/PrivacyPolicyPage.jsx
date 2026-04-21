import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

export function PrivacyPolicyPage() {
  useDocumentTitle("CampyTech Gist | Privacy Policy");

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-700">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            How we collect, use, and protect your information.
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            CampyTech Gist takes privacy seriously. This page explains what data
            we collect, how we use it, and how we keep your information secure.
          </p>
        </section>

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Information we collect
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            We may collect information when you request updates, contact us, or
            use features on our site. We do not sell your personal data to third
            parties.
          </p>
        </section>

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Your rights
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            You can request access to your information and ask us to update or
            remove it. We keep your data only for as long as needed to support
            our services.
          </p>
        </section>
      </div>
    </div>
  );
}
