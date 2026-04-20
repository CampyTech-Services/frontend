import { Link } from "react-router-dom";
import logo from "@/assets/logo2.jpeg";
import { footerColumns } from "@/shared/config/siteNavigation";

function FooterLink({ item }) {
  if (item.to) {
    return (
      <Link
        to={item.to}
        className="text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      className="text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      {item.label}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer
      id="footer"
      className="mt-12 border-t border-slate-200 bg-slate-950 px-4 py-12 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.85fr_0.85fr_0.85fr]">
          <div>
            <img
              src={logo}
              alt="CampyTech Gist Logo"
              className="h-12 w-auto rounded-md bg-white/90 p-1"
            />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Nigeria&apos;s trusted source for campus news, admission updates,
              scholarship opportunities, and student guidance.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink item={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} CampyTech Gist. All rights
            reserved. Nigeria&apos;s premier education newsroom.
          </p>
        </div>
      </div>
    </footer>
  );
}
