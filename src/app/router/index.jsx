import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { AdminPage } from "@/features/admin";
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
    element: <AdminPage />,
  },
]);
