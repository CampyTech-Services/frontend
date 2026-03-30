import {
  ArrowLeft,
  Compass,
  Home,
  Newspaper,
  RouteOff,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";

const recoveryRoutes = [
  {
    title: "Homepage",
    description: "Return to the main newsroom and featured coverage.",
    to: "/",
    icon: Home,
    accent: "from-cyan-500 to-blue-600",
  },
  {
    title: "Latest Stories",
    description: "Jump straight to the latest editorial feed.",
    to: "/#latest-stories",
    icon: Newspaper,
    accent: "from-slate-900 to-slate-700",
  },
  {
    title: "Browse Categories",
    description: "Explore admission, scholarship, and campus updates.",
    to: "/#browse-categories",
    icon: Compass,
    accent: "from-amber-500 to-orange-500",
  },
];

export function NotFoundPage() {
  useDocumentTitle("Page Not Found | CampyTech Gist");
  const location = useLocation();
  const navigate = useNavigate();

  function handleBackNavigation() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  return (
    <section className="relative overflow-hidden px-4 py-10 sm:py-12 lg:py-16">
      <div className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(8,145,178,0.14),_transparent_58%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-100/80 bg-[linear-gradient(135deg,_#ffffff_0%,_#ecfeff_34%,_#eff6ff_100%)] shadow-[0_30px_120px_rgba(15,23,42,0.12)]">
          <div className="absolute -left-16 top-16 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl" />

          <div className="grid gap-10 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14 lg:py-14">
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-700 backdrop-blur-sm">
                <RouteOff className="h-4 w-4" />
                <span>Newsroom Detour</span>
              </div>

              <p className="mt-8 text-[5rem] font-black leading-none tracking-[-0.08em] text-slate-950 sm:text-[7rem]">
                404
              </p>
              <h1 className="mt-4 max-w-2xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                This page missed the publication desk.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
                The link may be outdated, the path may be incorrect, or the
                story may have moved. Use one of the routes below to get back
                to the live CampyTech Gist experience.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
                >
                  <Home className="h-4 w-4" />
                  <span>Go to Homepage</span>
                </Link>

                <button
                  type="button"
                  onClick={handleBackNavigation}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Go Back</span>
                </button>
              </div>

              <div className="mt-10 max-w-2xl rounded-[1.75rem] border border-slate-200 bg-white/80 p-5 backdrop-blur-sm">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Requested Path
                </p>
                <code className="mt-3 block overflow-x-auto rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-cyan-200">
                  {location.pathname}
                </code>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  If you expected a blog article here, verify the slug or check
                  whether the story is still published.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_25px_80px_rgba(15,23,42,0.18)] sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300">
                  Quick Recovery
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-tight">
                  Useful routes back into the site
                </h2>

                <div className="mt-6 space-y-4">
                  {recoveryRoutes.map((route) => {
                    const Icon = route.icon;

                    return (
                      <Link
                        key={route.title}
                        to={route.to}
                        className="group block rounded-[1.5rem] border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${route.accent} text-white shadow-lg`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-lg font-black text-white">
                              {route.title}
                            </p>
                            <p className="mt-2 text-sm leading-7 text-slate-300">
                              {route.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-cyan-500/20 bg-cyan-500/10 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">
                    Editorial Tip
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    Broken article links usually point to an invalid slug, an
                    unpublished post, or a moved route. Start from the homepage
                    and open the story again from the feed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
