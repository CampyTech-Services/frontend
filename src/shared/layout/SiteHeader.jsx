import { CalendarDays, Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo2.jpeg";
import {
  primaryNavigationItems,
  utilityLinks,
} from "@/shared/config/siteNavigation";

const navClassName =
  "text-sm font-semibold text-slate-600 transition hover:text-cyan-700";

function HeaderNavigationLink({ item, className, onClick }) {
  if (item.to) {
    return (
      <Link to={item.to} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const todayLabel = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
  }, []);

  return (
    <>
      <div className="border-b border-cyan-500/25 bg-[linear-gradient(90deg,_#0891b2_0%,_#1d4ed8_100%)] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-sm sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 font-medium text-cyan-50">
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span className="truncate">{todayLabel}</span>
          </div>
          <nav className="hidden items-center gap-5 md:flex">
            {utilityLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-medium text-cyan-50 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <header
        id="top"
        className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="shrink-0">
            <img
              src={logo}
              alt="CampyTech Gist Logo"
              className="h-12 w-auto sm:h-14"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {primaryNavigationItems.map((item) => (
              <HeaderNavigationLink
                key={item.label}
                item={item}
                className={navClassName}
              />
            ))}
            <a
              href="/services#consultation-desk"
              data-tutorial-id="consultation"
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
            >
              Book Consultation
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-3">
              {primaryNavigationItems.map((item) => (
                <HeaderNavigationLink
                  key={item.label}
                  item={item}
                  className={navClassName}
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
              <a
                href="/services#consultation-desk"
                data-tutorial-id="consultation"
                className="mt-2 rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Consultation
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
