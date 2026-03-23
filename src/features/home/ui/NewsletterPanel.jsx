import { BellRing } from "lucide-react";

export function NewsletterPanel() {
  return (
    <section className="overflow-hidden rounded-[1.75rem] bg-[linear-gradient(160deg,_#0891b2_0%,_#1d4ed8_100%)] p-6 text-white shadow-[0_20px_50px_rgba(8,145,178,0.26)]">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
          <BellRing className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-2xl font-black">Stay Updated</h2>
        <p className="mt-3 text-sm leading-6 text-cyan-50">
          Get admission news, scholarships, and exam updates in your inbox
          without missing deadlines.
        </p>
      </div>

      <form className="mt-6 space-y-3" onSubmit={(event) => event.preventDefault()}>
        <input
          type="email"
          placeholder="Your email address"
          className="w-full rounded-2xl border border-white/20 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-white/25"
        />
        <button
          type="submit"
          className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
        >
          Subscribe Now
        </button>
      </form>

      <p className="mt-4 text-center text-xs font-medium text-cyan-100">
        Join 50,000+ students already subscribed
      </p>
    </section>
  );
}
