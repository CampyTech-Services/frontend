import { ArrowUpRight } from "lucide-react";
import { socialLinks } from "../data/socialLinks";
import { SocialIcon } from "@/shared/icons/SocialIcon";

export function SocialLinksPanel() {
  return (
    <section className="rounded-[1.75rem] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70">
      <h2 className="text-xl font-black text-slate-950">Follow Us</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Join the platforms where new education updates reach students fastest.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group rounded-[1.5rem] border p-4 text-left transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)] ${link.surfaceClassName}`}
            aria-label={`Follow CampyTech Gist on ${link.label}`}
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70 ${link.iconClassName}`}
            >
              <SocialIcon platform={link.id} className="h-7 w-7" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-950">{link.label}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  Daily updates
                </p>
              </div>
              <ArrowUpRight className="mt-0.5 h-4 w-4 text-slate-400 transition group-hover:text-slate-700" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
