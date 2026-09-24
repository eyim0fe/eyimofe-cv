import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"
import { Variant7ForestJotter } from "./variants/variant-7-forest-jotter"

/**
 * =========================================================================
 * ROUTING CONFIGURATION
 * =========================================================================
 * NOTE FOR EYIMOFE:
 * - Your portfolio is mounted at `/work`.
 * - Currently, the root route (`/`) redirects automatically to `/work`.
 * - When you are ready to build your personal homepage at `/`, replace the
 *   `<Navigate to="/work" replace />` below with your homepage component!
 * =========================================================================
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        // Redirect root "/" to "/work"
        element: <Navigate to="/work" replace />
      },
      {
        path: "work",
        // Portfolio mounted at "/work"
        element: <Variant7ForestJotter />
      },
      {
        path: "*",
        // Fallback: any other page redirects to "/work"
        element: <Navigate to="/work" replace />
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
