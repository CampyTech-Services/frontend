import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { AdminPage } from "@/features/admin";
import { BlogDetailPage, HomePage, NotFoundPage } from "@/features/home";

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
        path: "blog/:slug",
        element: <BlogDetailPage />,
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
