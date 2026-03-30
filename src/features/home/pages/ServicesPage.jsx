import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  MessageSquare,
  Plane,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { services } from "../data/services";

const serviceIcons = {
  graduation: GraduationCap,
  award: Award,
  briefcase: Briefcase,
  plane: Plane,
  book: BookOpen,
  file: FileText,
  shield: ShieldCheck,
};

const deliverySteps = [
  {
    title: "Choose a service",
    description:
      "Pick the support track that matches the student's current goal.",
  },
  {
    title: "Share your details",
    description:
      "Provide the documents or background information we need to start.",
  },
  {
    title: "Get guided support",
    description:
      "Receive structured help, feedback, and next actions from the team.",
  },
];

function ServiceCard({ service }) {
  const Icon = serviceIcons[service.icon] || Sparkles;

  return (
    <article className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${service.gradient} p-6 text-white`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.18),_transparent_35%)]" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white/15 backdrop-blur">
            <Icon className="h-7 w-7" />
          </div>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white/90">
            Service
          </span>
        </div>
        <h2 className="relative mt-6 text-2xl font-black tracking-tight">
          {service.title}
        </h2>
        <p className="relative mt-3 text-sm leading-7 text-white/85">
          {service.description}
        </p>
      </div>

      <div className="p-6">
        <div className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Starting Price
            </p>
            <p className="mt-2 text-lg font-black text-slate-950">
              {service.price}
            </p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Typical Timeline
            </p>
            <p className="mt-2 text-lg font-black text-slate-950">
              {service.duration}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">
            What Is Included
          </p>
          <ul className="mt-4 space-y-3">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm leading-6 text-slate-600"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#consultation-desk"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
          >
            <span>Book This Service</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/#latest-stories"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <span>Read Related Updates</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServicesPage() {
  useDocumentTitle("CampyTech Gist | Student Services and Consultation");

  const totalFeatures = services.reduce(
    (total, service) => total + service.features.length,
    0,
  );

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl overflow-hidden rounded-[2.75rem] bg-[linear-gradient(135deg,_#082f49_0%,_#0f172a_38%,_#0f766e_100%)] text-white shadow-[0_36px_120px_rgba(15,23,42,0.26)]">
        <div className="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.32),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.2),_transparent_28%)]" />
          <div className="relative grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_26rem] xl:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-100">
                <Sparkles className="h-4 w-4" />
                <span>CampyTech Services</span>
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Guidance, applications, and student support packaged into one
                smart service desk.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                From educational consultancy and scholarship support to NIN,
                CAC, certification, travel, and study-abroad processing, every
                service on this page is rendered from one data source so the
                catalog grows automatically when you add a new offer.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#services-catalog"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#consultation-desk"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <span>Book Consultation</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-100">
                  Live Catalog
                </p>
                <p className="mt-3 text-4xl font-black">{services.length}</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  active service tracks available to students right now.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-100">
                  Support Points
                </p>
                <p className="mt-3 text-4xl font-black">{totalFeatures}</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  service features mapped directly from the data layer.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-100">
                  Best Fit
                </p>
                <p className="mt-3 text-xl font-black">
                  Students, professionals, and business support
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  built for education, identity, registration, and travel needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services-catalog"
        className="mx-auto mt-10 max-w-7xl space-y-8"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-700">
              Service Catalog
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Every service below is driven by mapped data
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Add another object to the services dataset and this page expands on
            its own, including the hero count, service cards, and consultation
            flow.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70 sm:p-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-cyan-600" />
            <h2 className="text-2xl font-black text-slate-950">
              How the service desk works
            </h2>
          </div>
          <div className="mt-6 space-y-5">
            {deliverySteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-black text-slate-950">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] bg-[linear-gradient(145deg,_#ecfeff_0%,_#eff6ff_50%,_#f8fafc_100%)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] ring-1 ring-cyan-100 sm:p-8">
            <div className="flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-cyan-700" />
              <h2 className="text-2xl font-black text-slate-950">
                Service Snapshot
              </h2>
            </div>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-600" />
                <span>
                  Services now cover educational consultancy, scholarship
                  support, legal registration, identity documents, and travel or
                  study-abroad help.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-600" />
                <span>
                  Pricing and timelines stay visible on every card so visitors
                  can compare quickly.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-600" />
                <span>
                  The services route is fully dynamic, so new service objects in
                  the dataset automatically render here without extra page code.
                </span>
              </li>
            </ul>
          </section>

          <section
            id="consultation-desk"
            className="rounded-[2rem] bg-[linear-gradient(135deg,_#0891b2_0%,_#1d4ed8_100%)] p-6 text-white shadow-[0_24px_70px_rgba(8,145,178,0.24)] sm:p-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
              <MessageSquare className="h-7 w-7" />
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight">
              Need a more direct conversation?
            </h2>
            <p className="mt-3 text-sm leading-7 text-cyan-50 sm:text-base">
              Book a consultation and let the team point you to the right
              service, the right documents, and the right next step for school,
              business, certification, or travel support.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:hello@campytechgist.com"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
              >
                <span>Send an Inquiry</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <span>Back to Newsroom</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
