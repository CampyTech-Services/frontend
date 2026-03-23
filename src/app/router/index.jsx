import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { AdminPage } from "@/features/admin";
import { HomePage } from "@/features/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);
