import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import {
  AboutPage,
  AdvertisePage,
  BlogDetailPage,
  ContactPage,
  HomePage,
  NotFoundPage,
  PrivacyPolicyPage,
  ServicesPage,
  TermsPage,
} from "@/features/home";

const AdminPage = lazy(() =>
  import("@/features/admin").then((module) => ({ default: module.AdminPage })),
);

function RouteLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-sm font-semibold text-white">
      Loading...
    </div>
  );
}

function LazyAdminPage() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <AdminPage />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "advertise",
        element: <AdvertisePage />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        path: "blog/:slug",
        element: <BlogDetailPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <LazyAdminPage />,
  },
]);
