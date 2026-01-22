import { createBrowserRouter } from "react-router-dom"
import App from "../App"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <NotFound />,
    // children: [
    //   {
    //     index: true,
    //     element: <Home />,
    //   },
    //   {
    //     path: "about",
    //     element: <About />,
    //   },
    //   {
    //     path: "blog/:postId",
    //     element: <BlogPost />,
    //   },
    //   {
    //     path: "user/:userId/:section?",
    //     element: <UserProfile />,
    //   },
    // ],
  },
])
