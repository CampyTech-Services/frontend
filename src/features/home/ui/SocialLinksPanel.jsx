import { socialLinks } from "../data/socialLinks";

export function SocialLinksPanel() {
  return (
    <section className="rounded-[1.75rem] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70">
      <h2 className="text-xl font-black text-slate-950">Follow Us</h2>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {socialLinks.map((link) => (
          <button
            key={link.id}
            type="button"
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${link.className}`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </section>
  );
}
